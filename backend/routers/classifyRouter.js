import express from 'express';
import { classify } from '../controller/classifyController.js';

const router = express.Router();

router.post('/classify', classify);

export default router;