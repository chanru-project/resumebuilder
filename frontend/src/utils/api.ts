import { ResumeData } from '../types';

// Local storage keys
const RESUME_STORAGE_KEY = 'resumeBuilder_resumeData';
const RESUME_ID_KEY = 'resumeBuilder_resumeId';

// Generate a simple ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Simulate API delay for better UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const resumeApi = {
  save: async (data: ResumeData) => {
    await delay(1000); // Simulate network delay
    
    try {
      const resumeId = localStorage.getItem(RESUME_ID_KEY) || generateId();
      
      // Save to localStorage
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(RESUME_ID_KEY, resumeId);
      
      return {
        success: true,
        id: resumeId,
        message: 'Resume saved successfully'
      };
    } catch (error) {
      throw new Error('Failed to save resume');
    }
  },

  getById: async (id: string) => {
    await delay(500);
    
    try {
      const savedData = localStorage.getItem(RESUME_STORAGE_KEY);
      if (!savedData) {
        throw new Error('Resume not found');
      }
      
      return {
        success: true,
        resume: JSON.parse(savedData)
      };
    } catch (error) {
      throw new Error('Failed to retrieve resume');
    }
  },

  generatePdf: async (id: string, templateId: string) => {
    await delay(2000); // Simulate PDF generation time
    
    try {
      const savedData = localStorage.getItem(RESUME_STORAGE_KEY);
      if (!savedData) {
        throw new Error('Resume not found');
      }
      
      // For demo purposes, create a simple text file as PDF placeholder
      const resumeData = JSON.parse(savedData);
      const pdfContent = `Resume for ${resumeData.personalInfo.fullName}\n\nThis is a demo PDF. In production, this would be a properly formatted PDF resume.`;
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      
      return blob;
    } catch (error) {
      throw new Error('Failed to generate PDF');
    }
  },

  generateShareLink: async (id: string) => {
    await delay(1000);
    
    try {
      const shareUrl = `${window.location.origin}/shared/${id}`;
      return {
        success: true,
        shareUrl: shareUrl,
        shareToken: id
      };
    } catch (error) {
      throw new Error('Failed to generate share link');
    }
  }
};

export const certificateApi = {
  upload: async (file: File) => {
    await delay(1500);
    
    try {
      // For demo purposes, just return success
      const certificateId = generateId();
      
      return {
        success: true,
        id: certificateId,
        url: URL.createObjectURL(file),
        message: 'Certificate uploaded successfully'
      };
    } catch (error) {
      throw new Error('Failed to upload certificate');
    }
  },

  verify: async (certificateId: string) => {
    await delay(2000); // Simulate verification time
    
    try {
      // Simulate 80% success rate for demo
      const verified = Math.random() > 0.2;
      
      return {
        success: true,
        verified: verified,
        details: {
          documentType: 'Professional Certificate',
          issuer: verified ? 'Verified Institution' : 'Unknown',
          verificationMethod: 'DigiLocker API (Demo)',
          verifiedAt: new Date().toISOString(),
          confidence: verified ? 95 : 0
        },
        message: verified 
          ? 'Certificate verified successfully' 
          : 'Certificate verification failed'
      };
    } catch (error) {
      throw new Error('Failed to verify certificate');
    }
  }
};