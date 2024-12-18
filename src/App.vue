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

  function choiceDir(e: MouseEvent) {
    e.preventDefault();
    // fileDialog.reset();
    fileDialog.open();
  }

  // const imgClass = "max-h-70vh max-w-45% rd overflow-hidden";
</script>

<template>
  <h1 class="relative my-0">
    <span>Photo Frame</span>
    <span class="font-400 text-sm op50 absolute bottom-2 mx-2">v{{ version }}</span>
  </h1>

  <div class="xy-center gap-2">
    <button
      @click="choiceDir"
      class="btn xy-center"
    >
      <i class="i-carbon-upload text-xl font-bold" />
      <span>Upload</span>
    </button>

    <button
      class="btn xy-center disabled:op-50"
      :disabled="!uploadImg"
    >
      <i class="i-carbon-download text-xl font-bold" />
      <span>Download</span>
    </button>
  </div>

  <div class="my-2"></div>

  <div class="flex-1 yx-center flex-wrap px-2 pb-2">
    <h3 class="my-0">Preview</h3>
    <div class="min-h-300px max-h-300px xy-center">
      <img
        v-if="uploadImg"
        class="w-100% h-100%"
        style="object-fit: contain"
        :src="uploadImg.fileDataUrl"
        @click="choiceDir"
      />
    </div>

    <h3 class="my-0">Config</h3>
    <div class="flex-1 min-w-300px">
      <pre
        v-if="uploadImg"
        class="box text-left m-0 overflow-auto"
        >{{ JSON.stringify(uploadImg.exif, null, 2) }}</pre
      >
    </div>
  </div>
</template>
