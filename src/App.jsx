import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Carousel3D from './components/Carousel3D';
import FeatureBadge from './components/FeatureBadge';
import bgImage from './assets/fondo.jpg'; 

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen relative font-sans selection:bg-[#FF8C73] selection:text-white overflow-x-hidden text-white">
      
      <div className="fixed inset-0 -z-20">
        <img 
          src={bgImage} 
          alt="Fondo Softeric" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <Navbar />

      <main className="relative pt-28 pb-16"> {/* Padding superior reducido */}
        
        <div className="fixed top-20 right-0 w-[600px] h-[600px] bg-[#FF8C73] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob pointer-events-none" />
        <div className="fixed top-40 left-0 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-10 animate-blob animation-delay-2000 pointer-events-none" />
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mb-6">
          <div className="mb-5 animate-fade-in-up">
            <FeatureBadge text="Nueva Colección 2026" />
          </div>
          
          {/* TÍTULO REDUCIDO: text-4xl en móvil, text-6xl en escritorio */}
          <h1 className="text-4xl md:text-6xl font-black mb-5 tracking-tight leading-none text-white drop-shadow-2xl">
            Natural <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF8C73] italic pr-2">
              Essence
            </span>
          </h1>
          
          {/* PÁRRAFO REDUCIDO */}
          <p className="max-w-lg text-base md:text-lg text-white/90 font-medium mb-8 leading-relaxed drop-shadow-md">
            Redescubre la simplicidad con texturas orgánicas y tonos puros. 
            Moda diseñada para sentirse.
          </p>
        </div>

        {/* 3D Carousel Section */}
        <div className="relative z-10 w-full mb-16">
           <Carousel3D />
        </div>

        {/* Botón CTA Reducido */}
        <div className="relative z-10 flex justify-center pb-16">
          <button className="group relative px-6 py-3 bg-[#FF8C73] text-white rounded-full text-base font-bold overflow-hidden shadow-xl shadow-[#FF8C73]/30 hover:shadow-2xl hover:shadow-[#FF8C73]/50 transition-all duration-300">
            <span className="relative z-10 flex items-center gap-2">
              Explorar Catálogo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20" />
          </button>
        </div>

        {/* Stats Reducidas */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-white/20 pt-10">
          {[
            { label: "Materiales", value: "100% Eco" },
            { label: "Envíos", value: "Globales" },
            { label: "Garantía", value: "30 Días" },
            { label: "Soporte", value: "24/7" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center backdrop-blur-sm p-3 rounded-xl">
              {/* Valor text-xl, Label text-xs */}
              <span className="text-xl font-bold text-[#FF8C73]">{stat.value}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">{stat.label}</span>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default App;