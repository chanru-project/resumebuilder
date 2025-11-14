import React from 'react';
import { ResumeData } from '../../types';
import { ResumePreview } from './ResumePreview';

interface LivePreviewProps {
  data: ResumeData;
  templateId: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ data, templateId }) => {
  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Live Preview
        </h3>
        <div className="transform scale-50 origin-top">
          <ResumePreview data={data} templateId={templateId} />
        </div>
      </div>
    </div>
  );
};