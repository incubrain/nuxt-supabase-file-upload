<script setup lang="ts">
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import axios from 'axios'

const FilePond = vueFilePond(FilePondPluginImagePreview)

const filePondOptions = {
  allowMultiple: false,
  acceptedFileTypes: ['image/*'],
  server: {
    process: async (file, load, error, progress) => {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await axios.post('/api/upload', formData, {
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            )
            progress(uploadPercentage)
          },
        })

        const filePath = response.data.filePath
        load(filePath)
      }
      catch (err) {
        console.error(err)
        error('Error uploading file', err)
      }
    },
  },
}
</script>

<template>
  <div>
    <h2 class="my-4 text-lg font-semibold">
      Upload any image here
    </h2>
    <FilePond v-bind="filePondOptions" />
    <h2 class="font-semibold">
      Files will be uploaded on a <span class="text-red-500"> MAIN SERVER </span>
    </h2>
  </div>
</template>
