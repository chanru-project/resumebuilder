import puppeteer from 'puppeteer';

const generateResumeHTML = (resumeData, templateId) => {
  const { personalInfo, education, skills, projects, achievements } = resumeData;
  
  // Modern template HTML
  const modernTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume - ${personalInfo.fullName || 'Resume'}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background: white;
            }
            
            .resume {
                max-width: 8.5in;
                margin: 0 auto;
                padding: 0.75in;
                background: white;
            }
            
            .header {
                border-bottom: 3px solid #3B82F6;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            
            .name {
                font-size: 2.5em;
                font-weight: bold;
                color: #1F2937;
                margin-bottom: 10px;
            }
            
            .contact-info {
                color: #6B7280;
                font-size: 0.9em;
            }
            
            .contact-info div {
                margin-bottom: 5px;
            }
            
            .section {
                margin-bottom: 25px;
            }
            
            .section-title {
                font-size: 1.3em;
                font-weight: bold;
                color: #3B82F6;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 15px;
                border-bottom: 1px solid #E5E7EB;
                padding-bottom: 5px;
            }
            
            .education-item,
            .project-item,
            .achievement-item {
                margin-bottom: 20px;
            }
            
            .item-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 8px;
            }
            
            .item-title {
                font-weight: bold;
                color: #1F2937;
            }
            
            .item-subtitle {
                color: #4B5563;
                font-size: 0.9em;
            }
            
            .item-date {
                color: #6B7280;
                font-size: 0.85em;
                white-space: nowrap;
            }
            
            .item-description {
                color: #4B5563;
                font-size: 0.9em;
                margin-top: 5px;
            }
            
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .skill-category {
                margin-bottom: 10px;
            }
            
            .skill-category-title {
                font-weight: bold;
                color: #374151;
                margin-bottom: 5px;
            }
            
            .skill-list {
                color: #6B7280;
                font-size: 0.9em;
            }
            
            .technologies {
                font-size: 0.85em;
                color: #6B7280;
                margin-top: 5px;
            }
            
            .technologies strong {
                color: #374151;
            }
            
            .links {
                font-size: 0.8em;
                color: #3B82F6;
                margin-top: 5px;
            }
            
            .verified-badge {
                display: inline-block;
                background: #10B981;
                color: white;
                font-size: 0.7em;
                padding: 2px 8px;
                border-radius: 12px;
                margin-left: 10px;
            }
            
            @media print {
                .resume {
                    padding: 0.5in;
                }
            }
        </style>
    </head>
    <body>
        <div class="resume">
            <!-- Header -->
            <div class="header">
                <div class="name">${personalInfo.fullName || 'Your Name'}</div>
                <div class="contact-info">
                    <div>
                        ${personalInfo.email || ''} 
                        ${personalInfo.phone ? '• ' + personalInfo.phone : ''} 
                        ${personalInfo.location ? '• ' + personalInfo.location : ''}
                    </div>
                    <div>
                        ${personalInfo.portfolio ? personalInfo.portfolio + ' • ' : ''}
                        ${personalInfo.linkedin ? personalInfo.linkedin + ' • ' : ''}
                        ${personalInfo.github || ''}
                    </div>
                </div>
            </div>
            
            <!-- Education -->
            ${education && education.length > 0 ? `
            <div class="section">
                <div class="section-title">Education</div>
                ${education.map(edu => `
                    <div class="education-item">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${edu.institution || ''}</div>
                                <div class="item-subtitle">${edu.degree || ''} in ${edu.field || ''}</div>
                                ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
                            </div>
                            <div class="item-date">${edu.startYear || ''} - ${edu.endYear || ''}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Skills -->
            ${skills && skills.length > 0 ? `
            <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills-grid">
                    ${['Technical', 'Soft', 'Language', 'Other'].map(category => {
                        const categorySkills = skills.filter(skill => skill.category === category);
                        if (categorySkills.length === 0) return '';
                        
                        return `
                            <div class="skill-category">
                                <div class="skill-category-title">${category}</div>
                                <div class="skill-list">
                                    ${categorySkills.map(skill => `${skill.name} (${skill.level})`).join(', ')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            ` : ''}
            
            <!-- Projects -->
            ${projects && projects.length > 0 ? `
            <div class="section">
                <div class="section-title">Projects</div>
                ${projects.map(project => `
                    <div class="project-item">
                        <div class="item-header">
                            <div class="item-title">${project.title || ''}</div>
                            <div class="item-date">
                                ${project.startDate ? new Date(project.startDate).toLocaleDateString() : ''} - 
                                ${project.endDate ? new Date(project.endDate).toLocaleDateString() : ''}
                            </div>
                        </div>
                        <div class="item-description">${project.description || ''}</div>
                        ${project.technologies && project.technologies.length > 0 ? `
                            <div class="technologies">
                                <strong>Technologies:</strong> ${project.technologies.join(', ')}
                            </div>
                        ` : ''}
                        ${project.githubUrl || project.liveUrl ? `
                            <div class="links">
                                ${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''} 
                                ${project.githubUrl && project.liveUrl ? ' • ' : ''}
                                ${project.liveUrl ? `Live: ${project.liveUrl}` : ''}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Achievements -->
            ${achievements && achievements.length > 0 ? `
            <div class="section">
                <div class="section-title">Achievements & Certifications</div>
                ${achievements.map(achievement => `
                    <div class="achievement-item">
                        <div class="item-header">
                            <div>
                                <div class="item-title">
                                    ${achievement.title || ''}
                                    ${achievement.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                                </div>
                                <div class="item-subtitle">${achievement.organization || ''}</div>
                            </div>
                            <div class="item-date">
                                ${achievement.date ? new Date(achievement.date).toLocaleDateString() : ''}
                            </div>
                        </div>
                        <div class="item-description">${achievement.description || ''}</div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    </body>
    </html>
  `;
  
  return modernTemplate;
};

export const generatePDF = async (resumeData, templateId) => {
  let browser;
  
  try {
    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Generate HTML content
    const htmlContent = generateResumeHTML(resumeData, templateId);
    
    // Set content and generate PDF
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0' 
    });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    return pdfBuffer;
    
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};