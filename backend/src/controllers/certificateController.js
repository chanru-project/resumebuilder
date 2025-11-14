import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { verifyWithDigiLocker } from '../services/digilockerService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for demo (replace with database in production)
const certificateStorage = new Map();

export const uploadCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    const certificateId = uuidv4();
    const certificateUrl = `/uploads/${req.file.filename}`;
    
    // Store certificate metadata
    const certificateData = {
      id: certificateId,
      originalName: req.file.originalname,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: certificateUrl,
      uploadedAt: new Date().toISOString(),
      verified: false
    };
    
    certificateStorage.set(certificateId, certificateData);
    
    res.json({
      success: true,
      id: certificateId,
      url: certificateUrl,
      message: 'Certificate uploaded successfully'
    });
    
  } catch (error) {
    console.error('Upload certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload certificate'
    });
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    
    const certificate = certificateStorage.get(id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    // Verify certificate with DigiLocker (simulated)
    const verificationResult = await verifyWithDigiLocker(certificate);
    
    // Update certificate verification status
    certificate.verified = verificationResult.verified;
    certificate.verificationDetails = verificationResult.details;
    certificate.verifiedAt = new Date().toISOString();
    
    certificateStorage.set(id, certificate);
    
    res.json({
      success: true,
      verified: verificationResult.verified,
      details: verificationResult.details,
      message: verificationResult.verified 
        ? 'Certificate verified successfully' 
        : 'Certificate verification failed'
    });
    
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify certificate'
    });
  }
};