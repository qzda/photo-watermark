<script setup lang="ts">
  import { useFileDialog } from "@vueuse/core";
  import { ref, watch } from "vue";
  import type { Tags } from "exifreader";
  import { version } from "../package.json";
  import { devLog, imgFileToDataUrl } from "./utils/img";
  import { getImgExif } from "./utils/img";

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

  function choiceDir(e: MouseEvent) {
    e.preventDefault();
    fileDialog.open();
  }
</script>

<template>
  <h1 class="relative">
    <span>Photo Frame</span>
    <span class="font-400 text-sm op50 absolute bottom-2 mx-2">v{{ version }}</span>
  </h1>

  <div class="xy-center gap-2">
    <div
      @click="choiceDir"
      class="btn text-sm xy-center"
    >
      <i class="i-carbon-upload font-bold mr-1" />
      <span>Upload</span>
    </div>

    <div
      class="btn text-sm xy-center disabled:op-50"
      :disabled="!uploadImg"
    >
      <i class="i-carbon-download font-bold mr-1" />
      <span>Download</span>
    </div>
  </div>

  <div
    v-if="uploadImg"
    class="yx px-4 pb-2"
  >
    <div class="w-100% min-h-300px">
      <h3 class="my-0">Preview</h3>

      <img
        class="img w-100%"
        style="object-fit: contain"
        :src="uploadImg.fileDataUrl"
      />
    </div>

    <div class="w-100%">
      <h3 class="my-0">Config</h3>
    </div>

    <div class="w-100%">
      <h3 class="my-0">Info</h3>

      <div>
        <pre>{{
          JSON.stringify(
            {
              Make: uploadImg.exif?.Make?.description,
              Model: uploadImg.exif?.Model?.description,
              FNumber: uploadImg.exif?.FNumber?.description,
              ISOSpeedRatings: uploadImg.exif?.ISOSpeedRatings?.description,
              ShutterSpeedValue: uploadImg.exif?.ShutterSpeedValue?.description,
              FocalLength: uploadImg.exif?.FocalLength?.description,
              DateTimeOriginal: uploadImg.exif?.DateTimeOriginal?.description,
              OffsetTime: uploadImg.exif?.OffsetTime?.description,
            },
            null,
            2,
          )
        }}</pre>
      </div>
    </div>
  </div>
</template>
