import express from 'express'
const router = express.Router();
import {summarizeText} from '../controllers/SummarizerController.js';
import {TextConverter} from '../controllers/TextConverterController.js';

router.post('/api/summarize', summarizeText);
// router.post('/api/converter', TextConverter);


export default router