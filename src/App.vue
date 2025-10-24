<script setup lang="ts">
  import { useFileDialog } from "@vueuse/core";
  import { ref, watch } from "vue";
  import type { Tags } from "exifreader";

  import { imgFileToDataUrl } from "./utils/img";
  import { getImgExif } from "./utils/img";
  import { devLog } from "./utils/log";
  import Nav from "./composables/Nav.vue";

  const fileDialog = useFileDialog({
    accept: "image/jpg,image/jpeg,image/tiff",
    multiple: false,
  });

  type Image = {
    file: File;
    open: boolean;
    exif?: Tags;
    fileDataUrl?: string;
  };
  const uploadImg = ref<Image>();
  watch(fileDialog.files, (value) => {
    if (value?.length && value.item(0)) {
      uploadImg.value = {
        file: value.item(0)!,
        open: false,
        fileDataUrl: imgFileToDataUrl(value.item(0)!),
      };
      getImgExif(value.item(0)!).then((exif) => {
        if (uploadImg.value) {
          devLog("exif", exif);
          exif.MakerNote = undefined;
          uploadImg.value.exif = exif;
        }
      });
    } else {
      uploadImg.value = undefined;
    }
  });
</script>

<template>
  <Nav />

  <div class="p-4 flex-auto flex flex-col items-center gap-4 text-xl">
    <button
      class="icon-button i-lucide:image-plus"
      @click="fileDialog.open()"
    ></button>

    <div
      v-if="uploadImg"
      class="flex flex-col items-center gap-4"
    >
      <img
        draggable="false"
        class="border border-dashed w-full max-w-[800px] max-h-[800px]"
        :src="uploadImg.fileDataUrl"
      />

      <button
        class="icon-button i-carbon:download"
        @click=""
      ></button>
    </div>
  </div>

  <!-- <Footer /> -->
</template>
