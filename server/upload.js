const path = require('node:path')
const { createServer } = require('@vercel/node')
const multer = require('multer')

const server = createServer(async (req, res) => {
  if (req.method === 'POST') {
    try {
      const storage = multer.diskStorage({
        destination: './api/uploads/',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
          cb(null, `${uniqueSuffix}-${file.originalname}`)
        },
      })
      const upload = multer({ storage }).single('file')
      upload(req, res, async (err) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'File upload failed' })
        }
        const filePath = req.file.path
        res.status(200).json({ filePath })
    })
    catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
  else {
    res.status(405).send('Not Allowed')
  }
})

module.exports = server
