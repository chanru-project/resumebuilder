import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Download, Share } from 'lucide-react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { AchievementsForm } from './AchievementsForm';
import { useResumeData } from '../../hooks/useResumeData';
import { resumeApi } from '../../utils/api';
import { LivePreview } from '../Preview/LivePreview';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { Toast } from '../Common/Toast';
import { useToast } from '../../hooks/useToast';

interface ResumeFormProps {
  templateId: string;
  onBack: () => void;
}

const formSteps = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'projects', title: 'Projects', component: ProjectsForm },
  { id: 'achievements', title: 'Achievements', component: AchievementsForm },
];

export const ResumeForm: React.FC<ResumeFormProps> = ({ templateId, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const { toast, showToast, hideToast } = useToast();
  const {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addAchievement,
    updateAchievement,
    removeAchievement
  } = useResumeData();

  const currentStepData = formSteps[currentStep];
  const CurrentStepComponent = currentStepData.component;

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await resumeApi.save(resumeData);
      if (response.success) {
        setResumeId(response.id);
        showToast('Resume saved successfully!', 'success');
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Save error:', error);
      showToast('Failed to save resume. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!resumeId) {
      // Try to save first
      try {
        const response = await resumeApi.save(resumeData);
        if (response.success) {
          setResumeId(response.id);
        } else {
          showToast('Please save your resume first', 'warning');
          return;
        }
      } catch (error) {
        showToast('Please save your resume first', 'warning');
        return;
      }
    }
    
    try {
      const currentId = resumeId || localStorage.getItem('resumeBuilder_resumeId');
      if (!currentId) {
        showToast('Please save your resume first', 'warning');
        return;
      }
      
      const pdfBlob = await resumeApi.generatePdf(currentId, templateId);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.fullName || 'resume'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Resume downloaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to download resume. Please try again.', 'error');
    }
  };

  const handleShare = async () => {
    if (!resumeId) {
      // Try to save first
      try {
        const response = await resumeApi.save(resumeData);
        if (response.success) {
          setResumeId(response.id);
        } else {
          showToast('Please save your resume first', 'warning');
          return;
        }
      } catch (error) {
        showToast('Please save your resume first', 'warning');
        return;
      }
    }
    
    try {
      const currentId = resumeId || localStorage.getItem('resumeBuilder_resumeId');
      if (!currentId) {
        showToast('Please save your resume first', 'warning');
        return;
      }
      
      const response = await resumeApi.generateShareLink(currentId);
      if (response.success) {
        await navigator.clipboard.writeText(response.shareUrl);
        showToast('Share link copied to clipboard!', 'success');
      } else {
        throw new Error('Failed to generate share link');
      }
    } catch (error) {
      console.error('Share error:', error);
      showToast('Failed to generate share link. Please try again.', 'error');
    }
  };

  const getFormProps = () => {
    switch (currentStep) {
      case 0:
        return { data: resumeData.personalInfo, onChange: updatePersonalInfo };
      case 1:
        return { 
          data: resumeData.education, 
          onAdd: addEducation,
          onUpdate: updateEducation,
          onRemove: removeEducation
        };
      case 2:
        return { 
          data: resumeData.skills, 
          onAdd: addSkill,
          onUpdate: updateSkill,
          onRemove: removeSkill
        };
      case 3:
        return { 
          data: resumeData.projects, 
          onAdd: addProject,
          onUpdate: updateProject,
          onRemove: removeProject
        };
      case 4:
        return { 
          data: resumeData.achievements, 
          onAdd: addAchievement,
          onUpdate: updateAchievement,
          onRemove: removeAchievement
        };
      default:
        return { data: [], onChange: () => {} };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Templates</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Your Resume</h1>
        <p className="text-gray-600">Fill out the form and watch your resume come to life</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {formSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <CurrentStepComponent {...getFormProps()} />
          </div>
        </div>
        
        {/* Live Preview */}
        <div className="lg:col-span-1">
          <LivePreview data={resumeData} templateId={templateId} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {isSaving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
          
          {resumeId && (
            <>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
            </>
          )}
          
          {currentStep < formSteps.length - 1 && (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};