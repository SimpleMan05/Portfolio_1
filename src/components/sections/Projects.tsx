import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Palette, Smartphone, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
  category: 'web' | 'mobile' | 'design' | 'fullstack';
}

const Projects: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      demoLink: "https://demo.example.com",
      githubLink: "https://github.com/example",
      category: "fullstack"
    },
    {
      id: 2,
      title: "Mobile Task Manager",
      description: "Cross-platform mobile app built with React Native. Features offline sync, push notifications, and collaborative task management.",
      image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["React Native", "Firebase", "Redux"],
      demoLink: "https://demo.example.com",
      githubLink: "https://github.com/example",
      category: "mobile"
    },
    {
      id: 3,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for real-time data visualization using D3.js and Python backend. Supports multiple chart types and data sources.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["D3.js", "Python", "Flask", "MongoDB"],
      demoLink: "https://demo.example.com",
      githubLink: "https://github.com/example",
      category: "web"
    },
    {
      id: 4,
      title: "Brand Identity System",
      description: "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["Figma", "Adobe CC", "Branding"],
      demoLink: "https://demo.example.com",
      githubLink: "https://github.com/example",
      category: "design"
    },
    {
      id: 5,
      title: "AI Chat Application",
      description: "Real-time chat application with AI integration. Features include smart replies, sentiment analysis, and multi-language support.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["React", "WebSocket", "OpenAI", "Express"],
      demoLink: "https://demo.example.com",
      githubLink: "https://github.com/example",
      category: "fullstack"
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Responsive portfolio website with dark/light mode, smooth animations, and contact form integration.",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["React", "Tailwind", "Framer Motion"],
      demoLink: "https://demo.example.com",
      githubLink: "https://github.com/example",
      category: "web"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return <Globe size={20} />;
      case 'mobile': return <Smartphone size={20} />;
      case 'design': return <Palette size={20} />;
      case 'fullstack': return <Code size={20} />;
      default: return <Code size={20} />;
    }
  };

  const handleCardClick = (projectId: number) => {
    setFlippedCard(flippedCard === projectId ? null : projectId);
  };

  const getStyles = () => {
    if (theme === 'professional') {
      return {
        bg: isDark ? 'bg-gray-900' : 'bg-white',
        text: isDark ? 'text-white' : 'text-gray-800',
        card: isDark ? 'bg-gray-800' : 'bg-gray-50',
        accent: isDark ? 'text-blue-400' : 'text-blue-600',
      };
    } else {
      return {
        bg: isDark ? 'bg-gray-900' : 'bg-black',
        text: isDark ? 'text-cyan-400' : 'text-cyan-400',
        card: isDark ? 'bg-gray-800' : 'bg-gray-900',
        accent: 'text-purple-400',
      };
    }
  };

  const styles = getStyles();

  return (
    <section id="projects" className={`min-h-screen py-20 ${styles.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${styles.text} ${
            theme === 'professional' ? 'font-serif' : 'font-bold'
          }`}>
            Featured Projects
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            theme === 'professional' 
              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
              : 'bg-gradient-to-r from-purple-400 to-cyan-400'
          }`} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative h-80 group perspective-1000 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleCardClick(project.id)}
            >
              <motion.div
                className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700"
                animate={{
                  rotateY: flippedCard === project.id ? 180 : 0,
                }}
                whileHover={theme === 'creative' ? { 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)'
                } : { scale: 1.02 }}
              >
                {/* Front of Card */}
                <div className={`absolute inset-0 w-full h-full backface-hidden rounded-lg overflow-hidden ${styles.card} border ${
                  theme === 'professional'
                    ? isDark ? 'border-gray-700' : 'border-gray-200'
                    : 'border-purple-500/30'
                }`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                        theme === 'professional'
                          ? isDark ? 'bg-blue-400/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                          : 'bg-gradient-to-r from-purple-400/20 to-cyan-400/20 text-purple-400'
                      }`}>
                        {getCategoryIcon(project.category)}
                        <span className="capitalize">{project.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${styles.text}`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-2 ${
                      theme === 'professional'
                        ? isDark ? 'text-gray-300' : 'text-gray-600'
                        : 'text-gray-400'
                    }`}>
                      {project.description.substring(0, 80)}...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-xs rounded-full ${
                            theme === 'professional'
                              ? isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                              : 'bg-gray-700 text-cyan-400'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded-full ${styles.accent}`}>
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className={`absolute inset-0 w-full h-full backface-hidden rounded-lg ${styles.card} border ${
                  theme === 'professional'
                    ? isDark ? 'border-gray-700' : 'border-gray-200'
                    : 'border-purple-500/30'
                } p-6 flex flex-col justify-center`}
                style={{ transform: 'rotateY(180deg)' }}
                >
                  <h3 className={`text-2xl font-bold mb-4 ${styles.text} text-center`}>
                    {project.title}
                  </h3>
                  
                  <p className={`text-sm mb-6 text-center ${
                    theme === 'professional'
                      ? isDark ? 'text-gray-300' : 'text-gray-600'
                      : 'text-gray-300'
                  }`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs rounded-full ${
                          theme === 'professional'
                            ? isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            : 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === 'professional'
                          ? isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </motion.a>

                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'professional'
                          ? isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                          : 'border-purple-500 hover:bg-purple-500/10 text-purple-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {theme === 'creative' && (
                <motion.div
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2))',
                      'linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;