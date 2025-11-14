import { useState, useCallback } from 'react';
import { ResumeData, PersonalInfo, Education, Skill, Project, Achievement } from '../types';
import { resumeApi } from '../utils/api';

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  portfolio: '',
  linkedin: '',
  github: ''
};

const initialResumeData: ResumeData = {
  personalInfo: initialPersonalInfo,
  education: [],
  skills: [],
  projects: [],
  achievements: []
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved data on initialization
  const loadSavedData = useCallback(async () => {
    setIsLoading(true);
    try {
      const savedId = localStorage.getItem('resumeBuilder_resumeId');
      if (savedId) {
        const response = await resumeApi.getById(savedId);
        if (response.success) {
          setResumeData(response.resume);
        }
      }
    } catch (error) {
      console.log('No saved data found');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePersonalInfo = useCallback((personalInfo: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  }, []);

  const addEducation = useCallback((education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: Date.now().toString() };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  }, []);

  const updateEducation = useCallback((id: string, updates: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...updates } : edu
      )
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  }, []);

  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  }, []);

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, ...updates } : skill
      )
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  }, []);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  }, []);

  const addAchievement = useCallback((achievement: Omit<Achievement, 'id'>) => {
    const newAchievement = { ...achievement, id: Date.now().toString() };
    setResumeData(prev => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement]
    }));
  }, []);

  const updateAchievement = useCallback((id: string, updates: Partial<Achievement>) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement => 
        achievement.id === id ? { ...achievement, ...updates } : achievement
      )
    }));
  }, []);

  const removeAchievement = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(achievement => achievement.id !== id)
    }));
  }, []);

  return {
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
  };
};