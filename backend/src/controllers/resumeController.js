import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { generatePDF } from '../services/pdfService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for demo (replace with database in production)
const resumeStorage = new Map();
const shareLinks = new Map();

export const saveResume = async (req, res) => {
  try {
    const resumeData = req.body;
    
    // Validate required fields
    if (!resumeData.personalInfo || !resumeData.personalInfo.fullName) {
      return res.status(400).json({
        success: false,
        message: 'Personal information with full name is required'
      });
    }
    
    // Generate ID for new resume or use existing
    const resumeId = uuidv4();
    
    // Store resume data
    const savedResume = {
      id: resumeId,
      ...resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    resumeStorage.set(resumeId, savedResume);
    
    res.json({
      success: true,
      id: resumeId,
      message: 'Resume saved successfully'
    });
    
  } catch (error) {
    console.error('Save resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save resume'
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const { id } = req.params;
    
    const resume = resumeStorage.get(id);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    res.json({
      success: true,
      resume: resume
    });
    
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve resume'
    });
  }
};

export const generateResumePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { templateId } = req.body;
    
    const resume = resumeStorage.get(id);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    // Generate PDF
    const pdfBuffer = await generatePDF(resume, templateId);
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.personalInfo.fullName || 'resume'}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Generate PDF error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF'
    });
  }
};

export const generateShareLink = async (req, res) => {
  try {
    const { id } = req.params;
    
    const resume = resumeStorage.get(id);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    // Generate share token
    const shareToken = uuidv4();
    const shareUrl = `${req.protocol}://${req.get('host')}/shared/${shareToken}`;
    
    // Store share link mapping
    shareLinks.set(shareToken, {
      resumeId: id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    });
    
    res.json({
      success: true,
      shareUrl: shareUrl,
      shareToken: shareToken
    });
    
  } catch (error) {
    console.error('Generate share link error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate share link'
    });
  }
};