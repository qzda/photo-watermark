<script setup lang="ts">
  import { useFileDialog } from "@vueuse/core";
  import { ref, watch } from "vue";
  import type { Tags } from "exifreader";
  import { version } from "../package.json";
  import { imgFileToDataUrl } from "./utils/img";
  import { getImgExif } from "./utils/img";

  const fileDialog = useFileDialog({
    accept: "image/*",
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
    if (value?.length && value.item(0) && /\.(jpg|jpeg|tiff)$/i.test(value?.item(0)?.name!)) {
      uploadImg.value = {
        file: value.item(0)!,
        open: false,
        fileDataUrl: imgFileToDataUrl(value.item(0)!),
      };
      getImgExif(value.item(0)!).then((exif) => {
        if (uploadImg.value) {
          console.log(exif);
          exif.MakerNote = undefined;
          uploadImg.value.exif = exif;
        }
      });
    } else {
      uploadImg.value = undefined;
    }
  });

  function choiceDir() {
    fileDialog.reset();
    fileDialog.open();
  }

  // const imgClass = "max-h-70vh max-w-45% rd overflow-hidden";
</script>

<template>
  <h1 class="relative">
    <span>Photo Frame</span>
    <span class="font-400 text-sm op50 absolute bottom-2 mx-2">v{{ version }}</span>
  </h1>

  <div class="xy-center gap-2">
    <div
      @click="choiceDir"
      class="box"
    >
      <i class="i-carbon-cloud-upload" />
      <span> upload photo</span>
    </div>
  </div>

  <div
    v-if="uploadImg"
    class="box"
  >
    <!-- <div
      class=""
      :style="{
        backgroundImage: `url(&quot;${uploadImg.fileDataUrl}&quot;)`,
      }"
    ></div> -->
    <pre class="text-left">{{ JSON.stringify(uploadImg.exif, null, 2) }}</pre>
  </div>
</template>
