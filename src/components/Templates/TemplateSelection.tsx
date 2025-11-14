import React from 'react';

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
  const templates = [
    { id: 'modern', name: 'Modern Professional', color: 'blue' },
    { id: 'creative', name: 'Creative Portfolio', color: 'purple' },
    { id: 'minimal', name: 'Minimal Elegant', color: 'gray' },
    { id: 'academic', name: 'Academic Scholar', color: 'green' }
  ];

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
          <div
            key={template.id}
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              selectedTemplateId === template.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl relative overflow-hidden">
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="w-24 h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="w-16 h-2 bg-gray-200 rounded mb-4"></div>
                  <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded mb-4"></div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
              <button
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTemplateId === template.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedTemplateId === template.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
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
    </div>
  );
};