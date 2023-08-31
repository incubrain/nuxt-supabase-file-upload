import { createError, defineEventHandler } from 'h3'
import serverSupabaseClient from '../utils/serverSupabaseClient'

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    if (!supabase)
      throw createError({ statusMessage: 'Supabase client not found' })

    if (event.method !== 'POST')
      throw createError({ statusMessage: 'Method not allowed', statusCode: 405 })

    const { file } = event.file
    if (!file)
      throw createError({ statusMessage: 'No file uploaded', statusCode: 400 })

    const { data, error } = await supabase.storage
      .from('files')
      .upload(`${Date.now()}-${file.filename}`, file.content)

    if (error) {
      console.error('Supabase storage error:', error)
      throw createError({ statusMessage: error.message, statusCode: 500 })
    }

    const filePath = data?.Key
    return { filePath }
  }
  catch (error) {
    console.error('File upload error:', error)
    throw createError({ statusMessage: 'File upload failed', statusCode: 500 })
  }
})
