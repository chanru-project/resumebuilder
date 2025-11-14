import React, { useCallback, useState } from 'react';
import { Plus, Award, Trash2, Upload, Check, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Achievement } from '../../types';
import { certificateApi } from '../../utils/api';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

interface AchievementsFormProps {
  data: Achievement[];
  onAdd: (achievement: Omit<Achievement, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Achievement>) => void;
  onRemove: (id: string) => void;
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({ data, onAdd, onUpdate, onRemove }) => {
  const [uploadingIds, setUploadingIds] = useState<Set<string>>(new Set());
  const { showToast } = useToast();
  
  const addAchievement = () => {
    const newAchievement: Omit<Achievement, 'id'> = {
      title: '',
      organization: '',
      date: '',
      description: '',
      certificateUrl: '',
      verified: false
    };
    onAdd(newAchievement);
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string | boolean) => {
    onUpdate(id, { [field]: value });
  };

  const removeAchievement = (id: string) => {
    onRemove(id);
  };

  const handleCertificateUpload = async (achievementId: string, file: File) => {
    setUploadingIds(prev => new Set(prev).add(achievementId));
    try {
      const response = await certificateApi.upload(file);
      if (response.success) {
        updateAchievement(achievementId, 'certificateUrl', response.url);
        
        // Auto-verify the certificate
        const verificationResponse = await certificateApi.verify(response.id);
        if (verificationResponse.success) {
          updateAchievement(achievementId, 'verified', verificationResponse.verified);
          
          showToast(
            verificationResponse.verified 
              ? 'Certificate uploaded and verified successfully!' 
              : 'Certificate uploaded but verification failed',
            verificationResponse.verified ? 'success' : 'warning'
          );
        } else {
          showToast('Certificate uploaded but verification failed', 'warning');
        }
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Certificate upload failed:', error);
      showToast('Failed to upload certificate. Please try again.', 'error');
    } finally {
      setUploadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(achievementId);
        return newSet;
      });
    }
  };

  const CertificateDropzone: React.FC<{ achievementId: string }> = ({ achievementId }) => {
    const isUploading = uploadingIds.has(achievementId);
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && !isUploading) {
        handleCertificateUpload(achievementId, acceptedFiles[0]);
      }
    }, [achievementId, isUploading]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpg', '.jpeg', '.png'],
        'application/pdf': ['.pdf']
      },
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024, // 5MB
      disabled: isUploading
    });

    return (
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isUploading 
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
            : isDragActive 
              ? 'border-blue-400 bg-blue-50 cursor-pointer' 
              : 'border-gray-300 hover:border-blue-400 cursor-pointer'
        }`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <LoadingSpinner size="lg" className="mx-auto mb-2" />
        ) : (
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        )}
        <p className="text-sm text-gray-600">
          {isUploading 
            ? 'Uploading and verifying...' 
            : isDragActive 
              ? 'Drop certificate here' 
              : 'Upload certificate (PDF, JPG, PNG)'
          }
        </p>
        {!isUploading && <p className="text-xs text-gray-500">Max size: 5MB</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Achievements & Certifications</h3>
        <button
          onClick={addAchievement}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No achievements added yet. Showcase your accomplishments and certifications.</p>
        </div>
      )}
      
      {data.map((achievement) => (
        <div key={achievement.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <h4 className="text-lg font-medium text-gray-900">Achievement</h4>
              {achievement.verified && (
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  <Check className="h-3 w-3" />
                  <span>Verified</span>
                </div>
              )}
              {achievement.certificateUrl && !achievement.verified && (
                <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  <X className="h-3 w-3" />
                  <span>Pending Verification</span>
                </div>
              )}
            </div>
            <button
              onClick={() => removeAchievement(achievement.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievement Title *
              </label>
              <input
                type="text"
                value={achievement.title}
                onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="AWS Certified Solutions Architect"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization *
              </label>
              <input
                type="text"
                value={achievement.organization}
                onChange={(e) => updateAchievement(achievement.id, 'organization', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Amazon Web Services"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Achieved *
              </label>
              <input
                type="date"
                value={achievement.date}
                onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Upload
              </label>
              {achievement.certificateUrl ? (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Certificate uploaded</span>
                  <button
                    onClick={() => updateAchievement(achievement.id, 'certificateUrl', '')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <CertificateDropzone achievementId={achievement.id} />
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Demonstrated expertise in designing distributed systems on AWS cloud platform..."
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};