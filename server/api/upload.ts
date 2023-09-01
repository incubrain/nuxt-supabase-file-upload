import fs from 'node:fs'
import { createError, defineEventHandler } from 'h3'

const file = 'uploads/test.jpg'

export default defineEventHandler(async (event) => {
    try {
      const image = fs.readFileSync(file)

      const supabaseService = serverSupabaseServiceRole(event)
      console.log('workingUpload', file)

      const { error } = await supabaseService.storage.from('profile-public').upload('test.jpg', image, {
        cacheControl: '3600',
        upsert: true,
      })

      if (error) {
        console.log('error', error)
        throw createError({ statusMessage: error.message })
      }
    }
    catch (error) {
      console.error('File upload error:', error)
      throw createError({ statusMessage: 'File upload failed', statusCode: 500 })
    }


// try {
//   const supabase = await serverSupabaseClient(event)
//   if (!supabase)
//     throw createError({ statusMessage: 'Supabase client not found' })

//   if (event.method !== 'POST')
//     throw createError({ statusMessage: 'Method not allowed', statusCode: 405 })

//   const { file } = event
//   if (!file)
//     throw createError({ statusMessage: 'No file uploaded', statusCode: 400 })

//   const { data, error } = await supabase.storage
//     .from('public-profile')
//     .upload(`${Date.now()}-${file.filename}`, file.content)

//   if (error) {
//     console.error('Supabase storage error:', error)
//     throw createError({ statusMessage: error.message, statusCode: 500 })
//   }

//   const filePath = data?.Key
//   return { filePath }
// }
// catch (error) {
//   console.error('File upload error:', error)
//   throw createError({ statusMessage: 'File upload failed', statusCode: 500 })
// }
})
