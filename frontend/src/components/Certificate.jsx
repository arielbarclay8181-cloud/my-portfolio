import React from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react'; 
import { Card } from './ui/card';
import { Button } from './ui/button'; 

const Certificate = ({ data }) => {
  return (
    <section id="Certificate" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            My Certificate
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Highlights of my certificate
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {data.map((item, index) => (
            <Card 
              key={index} 
              className="p-6 bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="p-3 mt-1 bg-cyan-500/20 rounded-lg flex-shrink-0">
                <Award className="w-6 h-6 text-cyan-400" />
              </div>
              
              {/* Content*/}
              <div className="space-y-1 flex-1 min-w-0"> 
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>

              {/* Action and Year Badge Container */}
              <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                  {/* View Certificate */}
                  {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <Button 
                              variant="secondary"
                              className="bg-purple-500/30 text-purple-400 hover:bg-purple-500/50 h-8"
                          >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Certificate
                          </Button>
                      </a>
                  )}

                  {/* Year Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 text-sm font-mono">{item.year}</span>
                  </div>
              </div>

            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificate;