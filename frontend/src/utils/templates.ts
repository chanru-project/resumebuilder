import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech roles',
    preview: 'A sleek two-column layout with blue accents and modern typography',
    color: 'blue'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Vibrant design that showcases your creative personality',
    preview: 'Eye-catching design with colorful elements and creative sections',
    color: 'purple'
  },
  {
    id: 'minimal',
    name: 'Minimal Elegant',
    description: 'Simple and elegant layout focusing on content',
    preview: 'Clean minimalist design with perfect typography and spacing',
    color: 'gray'
  },
  {
    id: 'academic',
    name: 'Academic Scholar',
    description: 'Traditional format ideal for academic positions',
    preview: 'Professional academic layout with emphasis on education and research',
    color: 'green'
  }
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};