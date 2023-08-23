const path = require('node:path')
const { createServer } = require('@vercel/node')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
})

const upload = multer({ storage })

const server = createServer((req, res) => {
  if (req.method === 'POST') {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'File upload failed' })
      }

      if (!req.file)
        return res.status(400).json({ error: 'No file uploaded' })

      const filePath = path.join('./uploads', req.file.filename)
      return res.status(200).json({ filePath })
    })
  }
  else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
})

module.exports = server
