import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { Card } from './ui/card';

const Experience = ({ data }) => {

  const ExperienceCard = ({ item, index }) => (
    <div className="relative pl-8 pb-12 group">
      {/* Timeline Line */}
      {index !== data.length - 1 && (
        <div className="absolute left-[15px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent group-hover:from-cyan-500 transition-colors duration-500"></div>
      )}
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-500 shadow-lg shadow-cyan-500/50">
        {item.type === 'work' ? (
          <Briefcase className="w-4 h-4 text-white" />
        ) : (
          <GraduationCap className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Content Card */}
      <Card className="ml-6 p-6 bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10 hover:scale-105">
        <div className="space-y-3">
          {/* Period Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-mono">{item.period}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {item.title}
          </h3>

          {/* Company */}
          <p className="text-purple-400 font-semibold">{item.company}</p>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed">{item.description}</p>
        </div>
      </Card>
    </div>
  );

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My journey 
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="space-y-0">
            {data.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;