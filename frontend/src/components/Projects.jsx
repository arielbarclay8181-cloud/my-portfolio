import React, { useState } from 'react';
import { ExternalLink, Github, Code2, Palette, Video, Maximize2, X } from 'lucide-react'; 
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AnimatePresence, motion } from 'framer-motion'; 

const Projects = ({ data }) => {
  const [filter, setFilter] = useState('apps');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 


  const tabs = [
    { id: 'apps', label: 'Apps & Web', icon: Code2 },
    { id: 'design', label: 'Design Creative', icon: Palette },
    { id: 'video', label: 'Video Maker', icon: Video },
  ];
  
  const filteredProjects = data.filter(p => p.type === filter);

  const colorMap = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 hover:border-cyan-500',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-500',
    green: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 hover:border-emerald-500',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-500',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 hover:border-orange-500',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/30 hover:border-pink-500'
  };

  const renderActionButtons = (project, isHovered) => {
    if (project.type === 'apps') {
        return (
            <>
                {project.github && (
                    <a 
                      href={project.github} target="_blank" rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
                    >
                        <Github className="w-6 h-6 text-white" />
                    </a>
                )}
                {project.demo && (
                    <a 
                      href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
                    >
                        <ExternalLink className="w-6 h-6 text-white" />
                    </a>
                )}
            </>
        );
    } 
    
    if (project.type === 'video') {
        return (
            <a 
                href={project.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-4/5 text-sm px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
                <Video className="w-4 h-4" />
                Watch Video
            </a>
        );
    }

    if (project.type === 'design') {
        return (
            <Button
                onClick={() => setSelectedImage(project.image || project.thumbnail)} // <-- Mengatur state untuk membuka modal
                className="w-4/5 text-sm px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
                <Maximize2 className="w-4 h-4" />
                View Full Design
            </Button>
        );
    }
    
    return null;
  };
  
  return (
    <section id="projects" className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcase of my best work and personal projects
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {tabs.map((tab, idx) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={idx}
                onClick={() => setFilter(tab.id)}
                variant={filter === tab.id ? 'default' : 'outline'}
                className={`rounded-full px-6 py-2 transition-all duration-300 flex items-center gap-2 ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 hover:scale-105'
                    : 'border-white/20 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              const isHovered = hoveredProject === project.id;
              
              return (
                <Card 
                  key={project.id}
                  className={`overflow-hidden bg-gradient-to-br ${colorMap[project.color]} border-2 transition-all duration-500 hover:scale-105 group cursor-pointer`}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image / Thumbnail */}
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={project.image || project.thumbnail} 
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'scale-110 blur-sm' : 'scale-100'
                      }`}
                    />
                    {/* Overlay on Hover */}
                    <div className={`absolute inset-0 bg-black/80 flex items-center justify-center gap-4 transition-all duration-500 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    } ${project.type !== 'apps' ? 'flex-col' : 'flex-row'}`}>
                      
                      {renderActionButtons(project, isHovered)}
                      
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, idx) => (
                        <Badge 
                          key={idx}
                          variant="secondary"
                          className="bg-white/10 text-gray-300 border-0 hover:bg-white/20 transition-colors duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="md:col-span-3 text-center py-10">
                <p className="text-gray-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* IMAGE MODAL (Diambil dari Projects.tsx) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#13131a] rounded-xl p-2">
                <img 
                  src={selectedImage} 
                  alt="Full Design Preview" 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="mt-4 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-white"
              >
                <X className="w-5 h-5 mr-2 inline-block" />
                Close Preview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;