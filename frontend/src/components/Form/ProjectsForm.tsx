import React from 'react';
import { Plus, Code, Trash2, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';

interface ProjectsFormProps {
  data: Project[];
  onAdd: (project: Omit<Project, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Project>) => void;
  onRemove: (id: string) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onAdd, onUpdate, onRemove }) => {
  const addProject = () => {
    const newProject: Omit<Project, 'id'> = {
      title: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      githubUrl: '',
      liveUrl: ''
    };
    onAdd(newProject);
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    onUpdate(id, { [field]: value });
  };

  const removeProject = (id: string) => {
    onRemove(id);
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(id, 'technologies', technologies);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No projects added yet. Showcase your work by adding projects.</p>
        </div>
      )}
      
      {data.map((project) => (
        <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-medium text-gray-900">Project</h4>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="E-commerce Website"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Built a full-stack e-commerce platform with user authentication, product catalog, and payment integration..."
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used *
              </label>
              <input
                type="text"
                value={project.technologies.join(', ')}
                onChange={(e) => updateTechnologies(project.id, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="React, Node.js, MongoDB, Express"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={project.startDate}
                onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                value={project.endDate}
                onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Github className="h-4 w-4 inline mr-2" />
                GitHub URL
              </label>
              <input
                type="url"
                value={project.githubUrl}
                onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="https://github.com/username/project"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ExternalLink className="h-4 w-4 inline mr-2" />
                Live Demo URL
              </label>
              <input
                type="url"
                value={project.liveUrl}
                onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="https://yourproject.com"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};