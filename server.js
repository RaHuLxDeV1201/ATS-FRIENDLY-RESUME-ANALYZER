const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Enable CORS for your Vite frontend
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Setup file storage using multer
const upload = multer({ dest: 'uploads/' });

app.post('/api/analyze', upload.single('resume'), (req, res) => {
  try {
    const file = req.file;
    const jobDescription = req.body.jobDescription;

    if (!file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    res.json({
      success: true,
      message: "Resume received successfully on backend!",
      filename: file.originalname,
      jobDescription: jobDescription || "None provided"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});