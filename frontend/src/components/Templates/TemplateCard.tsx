import React from 'react';
import { Check, Eye } from 'lucide-react';
import { Template } from '../../types';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onPreview: (templateId: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onPreview
}) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    gray: 'from-gray-500 to-gray-600',
    green: 'from-green-500 to-green-600'
  };

  return (
    <div className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
      isSelected ? 'ring-2 ring-blue-500 shadow-glow' : ''
    }`}>
      {/* Preview Area */}
      <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${colorMap[template.color as keyof typeof colorMap]} opacity-10`} />
        
        {/* Mock Resume Preview */}
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="w-24 h-3 bg-gray-300 rounded mb-2"></div>
            <div className="w-16 h-2 bg-gray-200 rounded mb-4"></div>
            <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
            <div className="w-3/4 h-2 bg-gray-200 rounded mb-4"></div>
          </div>
          <div>
            <div className="w-20 h-2 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
            <div className="w-5/6 h-1 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce-in">
            <Check className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      
      {/* Template Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
        <p className="text-xs text-gray-500 mb-4">{template.preview}</p>
        
        <div className="flex gap-2">
          <button
            onClick={() => onSelect(template.id)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              isSelected
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
          <button
            onClick={() => onPreview(template.id)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};