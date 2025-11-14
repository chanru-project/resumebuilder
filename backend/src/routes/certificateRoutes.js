import express from 'express';
import { uploadCertificate, verifyCertificate } from '../controllers/certificateController.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Upload certificate
router.post('/upload', uploadMiddleware.single('certificate'), uploadCertificate);

// Verify certificate
router.post('/:id/verify', verifyCertificate);

export default router;