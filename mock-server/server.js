const path = require('node:path')
const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${uniqueSuffix}-${id}-${file.originalname}`)
  },
})

const upload = multer({ storage })

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file)
      throw new Error('No file uploaded')

    const filePath = path.join(__dirname, 'uploads', req.file.filename)
    res.json({ filePath })
    res.status(200).json({ message: 'File uploaded' })
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'File upload failed' })
  }
})

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`)
})
