import React from 'react';
import { ResumeData } from '../../types';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId }) => {
  const renderModernTemplate = () => (
    <div className="bg-white min-h-[11in] w-[8.5in] mx-auto shadow-lg p-8 font-sans">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-gray-600 space-y-1">
          <div className="flex flex-wrap gap-4 text-sm">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            {data.personalInfo.portfolio && (
              <span className="text-blue-600">{data.personalInfo.portfolio}</span>
            )}
            {data.personalInfo.linkedin && (
              <span className="text-blue-600">{data.personalInfo.linkedin}</span>
            )}
            {data.personalInfo.github && (
              <span className="text-blue-600">{data.personalInfo.github}</span>
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 uppercase tracking-wide">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree}  {edu.field}</p>
                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-gray-600 text-sm">{edu.startYear} - {edu.endYear}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h4 className="font-medium text-gray-800 mb-1">{category}</h4>
                  <div className="text-sm text-gray-600">
                    {categorySkills.map(skill => `${skill.name} (${skill.level})`).join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 uppercase tracking-wide">
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <span className="text-gray-600 text-sm">
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-2">{project.description}</p>
              <div className="text-xs text-gray-600 mb-1">
                <strong>Technologies:</strong> {project.technologies.join(', ')}
              </div>
              {(project.githubUrl || project.liveUrl) && (
                <div className="text-xs space-x-4">
                  {project.githubUrl && (
                    <span className="text-blue-600">GitHub: {project.githubUrl}</span>
                  )}
                  {project.liveUrl && (
                    <span className="text-blue-600">Live: {project.liveUrl}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-3 uppercase tracking-wide">
            Achievements & Certifications
          </h2>
          {data.achievements.map((achievement) => (
            <div key={achievement.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    {achievement.title}
                    {achievement.verified && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-700 text-sm">{achievement.organization}</p>
                </div>
                <span className="text-gray-600 text-sm">
                  {new Date(achievement.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // For now, all templates use the modern design
  // TODO: Implement different template designs
  return (
    <div className="resume-preview">
      {renderModernTemplate()}
    </div>
  );
};