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
  <div class="flex-1">
    <div class="xy-between flex-wrap">
      <div class="xy items-end">
        <span class="text-2xl font-bold">Photo Watermark</span>
        <span class="text-sm op50 mb-0.5">v{{ version }}</span>
      </div>

      <div class="xy">
        <div
          class="btn"
          @click="choiceDir"
        >
          <i class="i-material-symbols:upload" />
          <span>Upload</span>
        </div>

        <div
          class="btn"
          :class="[uploadImg ? null : 'disabled']"
        >
          <i class="i-material-symbols:download" />
          <span>Download</span>
        </div>
      </div>
    </div>

    <div class="flex-1 xy-between">
      <div class="flex-1">
        <h3 class="my-0">Config</h3>
      </div>

      <!-- <div class="flex-1">
      <h3 class="my-0">Info</h3>

      <div>
        <pre v-if="uploadImg">{{
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
    </div> -->
    </div>
  </div>

  <div class="max-w-40%">
    <img
      v-if="uploadImg"
      draggable="false"
      class="border border-dashed max-h-full max-w-full"
      :src="uploadImg.fileDataUrl"
    />
  </div>
</template>
