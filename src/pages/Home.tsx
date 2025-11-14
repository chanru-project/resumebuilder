import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { Hero } from '../components/Landing/Hero';
import { TemplateSelection } from '../components/Templates/TemplateSelection';
import { ResumeForm } from '../components/Form/ResumeForm';

type PageState = 'landing' | 'templates' | 'form';

export const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleGetStarted = () => {
    setCurrentPage('templates');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleTemplateNext = () => {
    if (selectedTemplate) {
      setCurrentPage('form');
    }
  };

  const handleBackToTemplates = () => {
    setCurrentPage('templates');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="home" />
      
      {currentPage === 'landing' && (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      {currentPage === 'templates' && (
        <TemplateSelection
          selectedTemplateId={selectedTemplate}
          onTemplateSelect={handleTemplateSelect}
          onNext={handleTemplateNext}
        />
      )}
      
      {currentPage === 'form' && selectedTemplate && (
        <ResumeForm
          templateId={selectedTemplate}
          onBack={handleBackToTemplates}
        />
      )}
    </div>
  );
};