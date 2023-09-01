<script setup lang="ts">
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

const FilePond = vueFilePond(FilePondPluginImagePreview)

const filePondOptions = {
  allowMultiple: false,
  acceptedFileTypes: ['image/*'],
  server: {
    process: async (file, load, error, progress) => {
      try {
        const formData = new FormData()
        formData.append('file', file.file) // Use 'file.file' to get the actual Blob object

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            )
            progress(uploadPercentage)
          },
        }

        const { data, error } = await useFetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (error)
          throw createError('Error uploading file')
        console.log(data)

        load(filePath)
      }
      catch (err) {
        console.log(err)
      }
    },
  },
}

async function test() {
  const { data, error } = await useFetch('/api/upload')

  console.log(data)
}
</script>

<template>
  <div>
    <h2 class="my-4 text-lg font-semibold">
      Upload any image here
    </h2>
    <FilePond v-bind="filePondOptions" />
    <UButton @click="test">
      test
    </UButton>
    <h2 class="font-semibold">
      Files will be uploaded on a <span class="text-red-500"> MAIN SERVER </span>
    </h2>
  </div>
</template>
