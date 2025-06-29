import React, { useState } from 'react';
import { 
  Code, 
  Palette, 
  Database, 
  Globe, 
  Smartphone, 
  Brain, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';
import { 
  skillsSectionStyles, 
  getSkillIconStyle, 
  getSkillProgressFillStyle 
} from '../../styles/components/skillsSection';

interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  subSkills: string[];
  progress: number;
}

const SkillsSection: React.FC = () => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    {
      id: 'react',
      name: 'React',
      icon: <Code size={24} />,
      description: 'Modern JavaScript library for building user interfaces',
      subSkills: [
        'Components', 
        'Hooks', 
        'State Management', 
        'Routing', 
        'Context API', 
        'Performance Optimization'
      ],
      progress: 65
    },
    {
      id: 'design',
      name: 'UI/UX Design',
      icon: <Palette size={24} />,
      description: 'User interface and experience design principles',
      subSkills: [
        'Color Theory', 
        'Typography', 
        'Layout Design', 
        'Prototyping', 
        'User Research', 
        'Accessibility'
      ],
      progress: 40
    },
    {
      id: 'database',
      name: 'Database Management',
      icon: <Database size={24} />,
      description: 'Database design and management systems',
      subSkills: [
        'SQL', 
        'NoSQL', 
        'Database Design', 
        'Optimization', 
        'Backup & Recovery', 
        'Security'
      ],
      progress: 30
    },
    {
      id: 'web',
      name: 'Web Development',
      icon: <Globe size={24} />,
      description: 'Full-stack web development technologies',
      subSkills: [
        'HTML/CSS', 
        'JavaScript', 
        'Node.js', 
        'APIs', 
        'Authentication', 
        'Deployment'
      ],
      progress: 75
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      icon: <Smartphone size={24} />,
      description: 'Mobile application development',
      subSkills: [
        'React Native', 
        'Flutter', 
        'iOS Development', 
        'Android Development', 
        'App Store Deployment'
      ],
      progress: 20
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      icon: <Brain size={24} />,
      description: 'Machine learning and AI technologies',
      subSkills: [
        'Machine Learning', 
        'Deep Learning', 
        'Natural Language Processing', 
        'Computer Vision', 
        'Data Science'
      ],
      progress: 15
    }
  ];

  const toggleSkill = (skillId: string) => {
    setExpandedSkill(prev => prev === skillId ? null : skillId);
  };

  const handleMouseEnter = (skillId: string) => {
    setHoveredSkill(skillId);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  const getSkillCardStyle = (skillId: string): React.CSSProperties => ({
    ...skillsSectionStyles.skillCard,
    ...(expandedSkill === skillId ? skillsSectionStyles.skillCardExpanded : {})
  });

  const getSkillHeaderStyle = (skillId: string): React.CSSProperties => ({
    ...skillsSectionStyles.skillHeader,
    ...((expandedSkill === skillId || hoveredSkill === skillId) ? 
      skillsSectionStyles.skillHeaderHover : {})
  });

  return (
    <section style={skillsSectionStyles.container}>
      <header style={skillsSectionStyles.header}>
        <h2 style={skillsSectionStyles.title}>Skills Overview</h2>
        <p style={skillsSectionStyles.subtitle}>Track your progress across different skill areas</p>
      </header>

      <div style={skillsSectionStyles.grid}>
        {skills.map((skill) => (
          <article 
            key={skill.id} 
            style={getSkillCardStyle(skill.id)}
            aria-expanded={expandedSkill === skill.id}
          >
            <div
              style={getSkillHeaderStyle(skill.id)}
              onClick={() => toggleSkill(skill.id)}
              onMouseEnter={() => handleMouseEnter(skill.id)}
              onMouseLeave={handleMouseLeave}
              role="button"
              tabIndex={0}
              aria-label={`Toggle ${skill.name} details`}
            >
              <div style={skillsSectionStyles.skillContent}>
                <div style={skillsSectionStyles.skillInfo}>
                  <div style={getSkillIconStyle(skill.progress)}>
                    {skill.icon}
                  </div>
                  <div style={skillsSectionStyles.skillDetails}>
                    <h3 style={skillsSectionStyles.skillTitle}>{skill.name}</h3>
                    <p style={skillsSectionStyles.skillDescription}>{skill.description}</p>
                  </div>
                </div>
                <div style={skillsSectionStyles.skillProgress}>
                  <div style={skillsSectionStyles.skillProgressText}>
                    <span style={skillsSectionStyles.skillProgressValue}>
                      {skill.progress}%
                    </span>
                    <div style={skillsSectionStyles.skillProgressBar}>
                      <div 
                        style={getSkillProgressFillStyle(skill.progress)} 
                        role="progressbar"
                        aria-valuenow={skill.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  {expandedSkill === skill.id ? (
                    <ChevronDown style={skillsSectionStyles.expandIcon} />
                  ) : (
                    <ChevronRight style={skillsSectionStyles.expandIcon} />
                  )}
                </div>
              </div>
            </div>

            {expandedSkill === skill.id && (
              <div style={skillsSectionStyles.subSkills}>
                <h4 style={skillsSectionStyles.subSkillsTitle}>Sub-skills</h4>
                <div style={skillsSectionStyles.subSkillsGrid}>
                  {skill.subSkills.map((subSkill, index) => (
                    <div key={`${skill.id}-${index}`} style={skillsSectionStyles.subSkill}>
                      <div style={skillsSectionStyles.subSkillDot} />
                      <span style={skillsSectionStyles.subSkillText}>{subSkill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;