import axios from "axios";
import dotenv from 'dotenv'
import multer from "multer";
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const TextConverter = async (req,res) =>{
app.post('/api/converter', upload.single('file'), async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post('https://converter.portal.ayfie.com/api/converter/1/FileConverter/Convert', formData, {
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error converting file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
} 

