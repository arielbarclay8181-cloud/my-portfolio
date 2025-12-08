import React, { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Instagram, MessageCircle } from 'lucide-react'; 
import { Button } from './ui/button';

const Hero = ({ data }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = data.tagline;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00d9ff 1px, transparent 1px),
            linear-gradient(to bottom, #00d9ff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Animated Badge */}
          <div className="inline-block animate-fade-in">
            <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
              <span className="text-cyan-400 text-sm font-mono">👨‍💻 I'm just chill guy</span>
            </div>
          </div>

          {/* Name with Gradient */}
          <h1 className="text-6xl md:text-8xl font-bold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              {data.name}
            </span>
          </h1>

          {/* Title */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl md:text-4xl text-gray-300 font-light">
              {data.title}
            </h2>
          </div>

          {/* Typing Effect Tagline */}
          <div className="animate-fade-in-up min-h-[60px]" style={{ animationDelay: '0.6s' }}>
            <p className="text-xl md:text-2xl text-gray-400 font-mono">
              {displayText}
              <span className="inline-block w-1 h-6 bg-cyan-400 ml-1 animate-blink"></span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              View My Project
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <a href={data.social.github} target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110">
              <Github className="w-6 h-6 text-gray-400 hover:text-cyan-400 transition-colors" />
            </a>
            <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110">
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-cyan-400 transition-colors" />
            </a>
            <a href={data.social.instagram} target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110">
              <Instagram className="w-6 h-6 text-gray-400 hover:text-cyan-400 transition-colors" /> 
            </a>
            <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110">
              <MessageCircle className="w-6 h-6 text-gray-400 hover:text-cyan-400 transition-colors" />
            </a>
            <a href={`mailto:${data.email}`}
               className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110">
              <Mail className="w-6 h-6 text-gray-400 hover:text-cyan-400 transition-colors" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <ArrowDown className="w-8 h-8 text-cyan-400 mx-auto" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;