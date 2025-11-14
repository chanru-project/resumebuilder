import express from 'express';
import { 
  saveResume, 
  getResume, 
  generateResumePDF, 
  generateShareLink 
} from '../controllers/resumeController.js';

const router = express.Router();

// Save resume data
router.post('/', saveResume);

// Get resume by ID
router.get('/:id', getResume);

// Generate PDF
router.post('/:id/pdf', generateResumePDF);

// Generate shareable link
router.post('/:id/share', generateShareLink);

export default router;