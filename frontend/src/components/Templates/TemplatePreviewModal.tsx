import React from 'react';
import { X } from 'lucide-react';
import { Template } from '../../types';
import { ResumePreview } from '../Preview/ResumePreview';

interface TemplatePreviewModalProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

const sampleData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    portfolio: 'https://alexjohnson.dev',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson'
  },
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2020',
      endYear: '2024',
      gpa: '3.8/4.0'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Advanced' as const, category: 'Technical' as const },
    { id: '2', name: 'React', level: 'Advanced' as const, category: 'Technical' as const },
    { id: '3', name: 'Node.js', level: 'Intermediate' as const, category: 'Technical' as const },
    { id: '4', name: 'Leadership', level: 'Advanced' as const, category: 'Soft' as const }
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      githubUrl: 'https://github.com/alexjohnson/ecommerce',
      liveUrl: 'https://myecommerce.com'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'AWS Certified Solutions Architect',
      organization: 'Amazon Web Services',
      date: '2023-09-15',
      description: 'Demonstrated expertise in designing distributed systems on AWS cloud platform.',
      certificateUrl: '/certificates/aws-cert.pdf',
      verified: true
    }
  ]
};

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onSelect
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{template.name}</h2>
            <p className="text-gray-600">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Preview Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="transform scale-75 origin-top">
            <ResumePreview data={sampleData} templateId={template.id} />
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSelect(template.id);
              onClose();
            }}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Select This Template
          </button>
        </div>
      </div>
    </div>
  );
};