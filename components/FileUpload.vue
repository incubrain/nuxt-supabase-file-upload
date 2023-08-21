<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import axios from 'axios' // Import Axios library

export default {
  components: {
    FilePond: vueFilePond(FilePondPluginImagePreview), // Pass plugins directly
  },
  data() {
    return {
      filePondOptions: {
        // FilePond options and settings
        allowMultiple: true,
        server: {
          process: (fieldName, file, metadata, load, error, progress) => {
            // Use Axios to upload the file to the server
            const formData = new FormData()
            formData.append(fieldName, file, file.name)

            axios
              .post('https://example.com/upload', formData, {
                onUploadProgress: (progressEvent) => {
                  const uploadPercentage = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100,
                  )
                  progress(uploadPercentage) // Report progress to FilePond
                },
              })
              .then((response) => {
                // Simulate a successful upload after 2 seconds
                setTimeout(() => {
                  load(response.data.filePath) // Pass the server-generated file path
                }, 2000)
              })
              .catch((err) => {
                error('Error uploading file', err) // Report error to FilePond
              })
          },
        },
      },
    }
  },
}
</script>

<template>
  <div>
    <h2 class="my-4 text-lg font-semibold">
      Upload any image here
    </h2>
    <FilePond v-bind="filePondOptions" ref="FilePond" />
    <h2 class="font-semibold color-red">
      IMP: Files will not get uploaded as '.post' URL has not been provided
    </h2>
  </div>
</template>
