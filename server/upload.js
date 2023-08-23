const path = require('node:path')
const { createServer } = require('@vercel/node')
const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
const server = createServer((req, res) => app(req, res))

app.use(cors())

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file)
      throw new Error('No file uploaded')

    const filePath = path.join(__dirname, 'uploads', req.file.filename)
    res.status(200).json({ filePath })
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'File upload failed' })
  }
})

module.exports = server
