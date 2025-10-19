// server/routes/upload.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image to Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'ecommerce-products',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' },
          { format: 'webp' }
        ]
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Upload failed', error });
        }
        res.json({ imageUrl: result.secure_url });
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;