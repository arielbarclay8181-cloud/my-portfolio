import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const Contact = ({ data }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        'https://web-production-9bc1e.up.railway.app/api/contact',
        formData
      );
      
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. Your message has been recorded.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error("Failed to send message.");
      }
      
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ada Project yang mau di diskusiing atau sekedar sapa? yuk kontak saya.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Let's Talk</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Chat ajaa kalo ada yang mau ditanyain tentang saya, perkenalan diri dulu tapi yahh!!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Card className="p-6 bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/10 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${data.email}`} className="text-white font-medium hover:text-cyan-400 transition-colors">
                      {data.email}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:bg-white/10 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${data.phone}`} className="text-white font-medium hover:text-purple-400 transition-colors">
                      {data.phone}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/10 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-white font-medium">{data.location}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-400 mb-4">Follow me on social media</p>
              <div className="flex gap-4">
                <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                   className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 group">
                  <Github className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                   className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 group">
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a href={data.social.instagram} target="_blank" rel="noopener noreferrer"
                   className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 group">
                  <Instagram className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                   className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 group">
                  <MessageCircle className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <Card className="p-8 bg-white/5 border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Udin Petot"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="udipetot@gmail.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject of your message"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="let me know what you need..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;