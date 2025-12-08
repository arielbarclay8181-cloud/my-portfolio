import React, { useState } from 'react';
import { 
  Code2, Terminal, Cpu, FileCode, Layers, Server, Zap, Database, 
  Palette, GitBranch, Container, Code, Figma, Brain, Activity, 
  BarChart, Hash, PenTool, Layout, Video, Globe, MessageSquare, BookOpen
} from 'lucide-react';
import { Card } from './ui/card';

const iconMap = {
  Code2, Terminal, Cpu, FileCode, Layers, Server, Zap, Database, Palette,
  GitBranch, Container, Code, Figma, Brain, Activity, BarChart, Hash,
  PenTool, Layout, Video, Globe, MessageSquare, BookOpen
};

const Skills = ({ data }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My Software toolkit and proficiency levels
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Skills Grid */}
        <div className="max-w-6xl mx-auto space-y-12">
          {data.map((category, idx) => (
            <div key={idx} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <h3 className="text-2xl font-bold text-white px-4">{category.category}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((skill, skillIdx) => {
                  const IconComponent = iconMap[skill.icon] || Code2;
                  const isHovered = hoveredSkill === `${idx}-${skillIdx}`;
                  
                  return (
                    <Card 
                      key={skillIdx}
                      className="p-6 bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10 hover:scale-105 cursor-pointer group"
                      onMouseEnter={() => setHoveredSkill(`${idx}-${skillIdx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="space-y-4">
                        {/* Icon and Name */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg transition-all duration-500 ${
                              isHovered 
                                ? 'bg-gradient-to-br from-cyan-500 to-purple-500 scale-110' 
                                : 'bg-white/10'
                            }`}>
                              <IconComponent className={`w-6 h-6 transition-colors duration-300 ${
                                isHovered ? 'text-white' : 'text-cyan-400'
                              }`} />
                            </div>
                            <h4 className="text-white font-semibold text-lg">{skill.name}</h4>
                          </div>
                          <span className={`text-xl font-bold transition-all duration-300 ${
                            isHovered ? 'text-cyan-400 scale-125' : 'text-gray-500'
                          }`}>
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                              style={{ 
                                width: isHovered ? `${skill.level}%` : '0%',
                                opacity: isHovered ? 1 : 0.7
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Beginner</span>
                            <span>Expert</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Programming Languages', value: '5+' },
            { label: 'Languages', value: '2' },
            { label: 'Projects Completed', value: '20+' },
            { label: 'Software', value: '6+' }
          ].map((stat, idx) => (
            <Card key={idx} className="p-6 bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 text-center group">
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;