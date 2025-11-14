import React, { useState } from 'react';
import { TemplateCard } from './TemplateCard';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { templates } from '../../utils/templates';

interface TemplateSelectionProps {
  selectedTemplateId: string | null;
  onTemplateSelect: (templateId: string) => void;
  onNext: () => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  selectedTemplateId,
  onTemplateSelect,
  onNext
}) => {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  
  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId);
  };
  
  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Perfect Template
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our professionally designed templates. Each template is optimized 
          for ATS systems and designed to help you stand out.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplateId === template.id}
            onSelect={onTemplateSelect}
            onPreview={handlePreview}
          />
        ))}
      </div>
      
      {selectedTemplateId && (
        <div className="text-center">
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Continue with Template
          </button>
        </div>
      )}
      
      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={templates.find(t => t.id === previewTemplate)!}
          isOpen={!!previewTemplate}
          onClose={handleClosePreview}
          onSelect={onTemplateSelect}
        />
      )}
    </div>
  );
};