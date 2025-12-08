import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificate from './components/Certificate';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import { portfolioData } from './mock';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-black min-h-screen">
        <Header />
        <main id="home">
          <Hero data={portfolioData.personal} />
          <About data={portfolioData.personal} />
          <Skills data={portfolioData.skills} />
          <Projects data={portfolioData.projects} />
          <Experience data={portfolioData.experience} />
          <Certificate data={portfolioData.Certificate} />
          <Contact data={portfolioData.personal} />
        </main>
        <Footer data={portfolioData.personal} />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;