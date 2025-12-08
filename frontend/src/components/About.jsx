import React from 'react';
import { User, Calendar, Cake } from 'lucide-react'; 
import { Card } from './ui/card';

const About = ({ data }) => {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden border-4 border-cyan-500/30">
                  <img 
                    src={data.avatar} 
                    alt={data.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-xl">
                  <p className="text-black font-bold text-lg whitespace-nowrap">Computer Science & Graphic Design</p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">
                  Hello! I'm <span className="text-cyan-400">{data.name || data.name}</span>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {data.bio}
                </p>
              </div>

              {/* Contact Info Cards  */}
              <div className="space-y-3">
                {/* Nickname Card */}
                <Card className="p-4 bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <User className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nickname</p>
                      <p className="text-white font-medium">{data.nickname}</p>
                    </div>
                  </div>
                </Card>

                {/* Age Card */}
                <Card className="p-4 bg-white/5 border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-white font-medium">{data.age}</p>
                    </div>
                  </div>
                </Card>

                {/* Born Card */}
                <Card className="p-4 bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Cake className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Born</p>
                      <p className="text-white font-medium">{data.born}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;