import React, { useState, useEffect } from 'react';
import bgLogo from '../assets/fondologo.jpg';

const SplashScreen = ({ onComplete }) => {
  const [textVisible, setTextVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setTextVisible(true), 600); 
    const fadeTimer = setTimeout(() => setIsFading(true), 2800);   
    const finishTimer = setTimeout(onComplete, 3500);              

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      <div className="absolute inset-0 z-0">
        <img 
          src={bgLogo} 
          alt="Fondo Intro" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        {/* Logo reducido a w-16 (64px) */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-[#FF8C73] flex items-center justify-center shadow-2xl animate-bounce-in">
          <span className="text-white font-serif italic text-3xl pt-1 pr-1 font-bold tracking-tight">
            Se
          </span>
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-50 animate-ping-slow"></div>
        </div>

        {/* Texto reducido a 4xl */}
        <div className={`overflow-hidden transition-all duration-1000 ease-out ${textVisible ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
          <h1 className="text-4xl font-bold tracking-tighter text-white whitespace-nowrap drop-shadow-lg">
            softeric.
          </h1>
        </div>
      </div>

      <div className="absolute bottom-20 w-32 h-1 bg-white/20 rounded-full overflow-hidden z-10">
        <div className="h-full bg-[#FF8C73] animate-progress-bar rounded-full"></div>
      </div>
    </div>
  );
};

export default SplashScreen;