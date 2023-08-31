<script setup>
import { ref } from 'vue'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { createClient } from '@supabase/supabase-js'

const FilePond = vueFilePond(FilePondPluginImagePreview)
const files = ref([])
const supabase = createClient(
  'https://bndmvpoyrmuxmuzqlgfu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuZG12cG95cm11eG11enFsZ2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0NTcwODgsImV4cCI6MjAwOTAzMzA4OH0.Y6cxKHd_SX3BjkFcYb4SBa9z6fAswIemm9kP-8aV51E',
)

const pondServer = {
  process: async (file, load, error) => {
    try {
      const { user } = await supabase.auth.session()
      if (!user) {
        error('User not authenticated')
        return
      }

      const headers = {
        Authorization: `Bearer ${user.access_token}`,
      }

      const response = await supabase.storage
        .from('files')
        .upload(`${Date.now()}-${file.name}`, file, {
          upsert: false,
          headers,
        })

      if (response.error)
        error(`Error uploading file: ${response.error.message}`)

      else if (response.publicURL)
        load(response.publicURL)

      else
        error('Unknown error uploading file')
    }
    catch (err) {
      error(`Error: ${err.message}`)
      console.error(err)
    }
  },
}
</script>

<template>
  <div>
    <FilePond :files="files" :server="pondServer" />
  </div>
</template>
