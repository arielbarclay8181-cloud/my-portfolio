import React from 'react';
import { Heart, Github, Linkedin, Instagram, Mail, ArrowUp, MessageCircle } from 'lucide-react';

const Footer = ({ data }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-white/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  CLAY
                </span>
              </div>
              <p className="text-gray-400">
                Pemula yang sedang belajar jangan di bully puh sepuh 🙏🏻
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {['About', 'Skills', 'Projects', 'Experience', 'Certificate', 'Contact'].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-left"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Social & Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex gap-3 mb-4">
                <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300">
                  <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                </a>
                <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300">
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                </a>
                <a href={data.social.instagram} target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300">
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-cyan-400" /> 
                </a>
                <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                   className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                </a>
                <a href={`mailto:${data.email}`}
                   className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300">
                  <Mail className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                </a>
              </div>
              <p className="text-gray-400 text-sm">{data.email}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 {data.name}. Made with{' '}
              <Heart className="inline w-4 h-4 text-red-500 fill-current" />{' '}
              and lots of coffee
            </p>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-500/50 group"
            >
              <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;