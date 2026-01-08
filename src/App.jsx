import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

// --- CONFIGURACIÓN DE COLORES (Referencia) ---
// Principal (Terracota): #C58C6D
// Acento (Verde): #6B705C
// Fondo: #FFF6EB

const products = [
  {
    id: 1,
    title: "Chaqueta Étera",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
    category: "Otoño 2026"
  },
  {
    id: 2,
    title: "Vestido Lino",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    category: "Esenciales"
  },
  {
    id: 3,
    title: "Suéter Tejido",
    price: "$65.00",
    image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800",
    category: "Invierno"
  },
  {
    id: 4,
    title: "Set Urbano",
    price: "$145.00",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    category: "Nuevo"
  },
  {
    id: 5,
    title: "Abrigo Camel",
    price: "$199.00",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800",
    category: "Premium"
  },
];

// --- COMPONENTES ---

const SplashScreen = ({ onComplete }) => {
  const [textVisible, setTextVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Secuencia de animación
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
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFF6EB] transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      <div className="flex items-center gap-4 relative">
        {/* Logo Icon "Se" - AHORA TERRACOTA */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-[#C58C6D] flex items-center justify-center shadow-2xl animate-bounce-in">
          <span className="text-[#FFF6EB] font-serif italic text-4xl pt-1 pr-1 font-bold tracking-tight">
            Se
          </span>
          {/* Anillo decorativo - AHORA VERDE */}
          <div className="absolute inset-0 rounded-full border-2 border-[#6B705C] opacity-50 animate-ping-slow"></div>
        </div>

        {/* Text Reveal "softeric" - AHORA TERRACOTA */}
        <div className={`overflow-hidden transition-all duration-1000 ease-out ${textVisible ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}>
          <h1 className="text-5xl font-bold tracking-tighter text-[#C58C6D] whitespace-nowrap">
            softeric.
          </h1>
        </div>
      </div>

      {/* Loading Bar Minimal */}
      <div className="absolute bottom-20 w-32 h-1 bg-[#C58C6D]/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#6B705C] animate-progress-bar rounded-full"></div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md bg-[#FFF6EB]/80 border-b border-[#C58C6D]/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - AHORA TERRACOTA */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C58C6D] flex items-center justify-center text-[#FFF6EB] text-xs font-serif font-bold italic">
            Se
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-[#C58C6D]">
            softeric.
          </h1>
        </div>

        {/* Desktop Menu - TEXTOS EN TERRACOTA */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#C58C6D]/90">
          <a href="#" className="hover:text-[#6B705C] transition-colors">Inicio</a>
          <a href="#" className="hover:text-[#6B705C] transition-colors">Colección</a>
          <a href="#" className="hover:text-[#6B705C] transition-colors">Editorial</a>
          <a href="#" className="hover:text-[#6B705C] transition-colors">Sostenibilidad</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#DDBEA9]/20 rounded-full transition-colors text-[#C58C6D] hover:text-[#6B705C]">
             <ShoppingBag size={20} />
          </button>
          {/* Botón Principal en Terracota */}
          <button className="hidden md:block px-5 py-2 rounded-full bg-[#C58C6D] text-[#FFF6EB] text-sm font-medium hover:bg-[#6B705C] transition-all shadow-lg shadow-[#C58C6D]/20 hover:shadow-[#6B705C]/30">
            Ingresar
          </button>
          <button className="md:hidden text-[#C58C6D]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FFF6EB] border-b border-[#C58C6D]/10 p-6 md:hidden flex flex-col gap-4 shadow-xl">
           <a href="#" className="text-[#C58C6D] font-medium">Inicio</a>
           <a href="#" className="text-[#C58C6D] font-medium">Colección</a>
           <a href="#" className="text-[#C58C6D] font-medium">Editorial</a>
        </div>
      )}
    </nav>
  );
};

const Carousel3D = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start at middle
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const getStyles = (index) => {
    const total = products.length;
    let distance = (index - activeIndex + total) % total;
    if (distance > total / 2) distance -= total;
    
    if (Math.abs(distance) > 2) return { opacity: 0, display: 'none' };

    const isActive = distance === 0;
    const isLeft = distance < 0;
    
    const xOffset = distance * 60; 
    const scale = isActive ? 1 : 0.8;
    const rotateY = isActive ? 0 : (isLeft ? 25 : -25);
    const zIndex = 10 - Math.abs(distance);
    const opacity = isActive ? 1 : 0.6;
    const blur = isActive ? 0 : 2;

    return {
      transform: `translateX(${xOffset}%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      zIndex: zIndex,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      cursor: isActive ? 'default' : 'pointer'
    };
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto h-[500px] flex items-center justify-center mt-10">
      
      {/* Navigation Buttons - Terracota */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 md:left-20 z-40 p-4 rounded-full bg-[#FFF6EB]/80 backdrop-blur-sm text-[#C58C6D] hover:bg-[#C58C6D] hover:text-white transition-all shadow-lg border border-[#C58C6D]/10"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={handleNext}
        className="absolute right-4 md:right-20 z-40 p-4 rounded-full bg-[#FFF6EB]/80 backdrop-blur-sm text-[#C58C6D] hover:bg-[#C58C6D] hover:text-white transition-all shadow-lg border border-[#C58C6D]/10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Cards Container */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {products.map((item, index) => {
          const styles = getStyles(index);
          const distance = (index - activeIndex + products.length) % products.length;
          let adjustedDistance = distance > products.length/2 ? distance - products.length : distance;
          
          return (
            <div
              key={item.id}
              onClick={() => {
                if(adjustedDistance !== 0) {
                  setIsAutoPlaying(false);
                  setActiveIndex(index);
                }
              }}
              className="absolute w-[280px] md:w-[320px] aspect-[3/4] transition-all duration-500 ease-out origin-center"
              style={styles}
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative bg-[#B7B7A4] group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay - Mantenemos el overlay oscuro (verde) para mejor contraste de texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6B705C]/90 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-0 left-0 w-full p-6 text-[#FFF6EB]">
                  {/* Badge Categoría - Acento Terracota */}
                  <span className="inline-block px-3 py-1 rounded-full bg-[#C58C6D]/90 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium opacity-90">{item.price}</p>
                    <button className="p-2 bg-[#FFF6EB] text-[#C58C6D] rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FeatureBadge = ({ text }) => (
  // Badge principal en Terracota, punto de acento en Verde
  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C58C6D]/20 bg-[#FFF6EB]/50 backdrop-blur-sm text-[#C58C6D] text-xs font-bold uppercase tracking-widest shadow-sm">
    <span className="w-2 h-2 rounded-full bg-[#6B705C] animate-pulse"></span>
    {text}
  </span>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-[#FFF6EB] text-[#C58C6D] font-sans selection:bg-[#6B705C] selection:text-white overflow-x-hidden">
      
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <Navbar />

      <main className="relative pt-32 pb-20">
        
        {/* Background Decorative Elements */}
        <div className="fixed top-20 right-0 w-[600px] h-[600px] bg-[#DDBEA9] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob pointer-events-none" />
        <div className="fixed top-40 left-0 w-[500px] h-[500px] bg-[#C58C6D] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-2000 pointer-events-none" />
        <div className="fixed -bottom-32 left-1/3 w-[600px] h-[600px] bg-[#B7B7A4] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob animation-delay-4000 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mb-8">
          <div className="mb-6 animate-fade-in-up">
            <FeatureBadge text="Nueva Colección 2026" />
          </div>
          
          {/* Título Principal en Terracota */}
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-none text-[#C58C6D]">
            Natural <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C58C6D] to-[#8A5A44] italic pr-2">
              Essence
            </span>
          </h1>
          
          <p className="max-w-xl text-lg md:text-xl text-[#C58C6D]/80 mb-10 leading-relaxed font-medium">
            Redescubre la simplicidad con texturas orgánicas y tonos tierra. 
            Moda diseñada para sentirse, no solo para verse.
          </p>
        </div>

        {/* 3D Carousel Section */}
        <div className="relative z-10 w-full mb-24">
           <Carousel3D />
        </div>

        {/* Call to Action Minimalist - Botón Terracota */}
        <div className="relative z-10 flex justify-center pb-20">
          <button className="group relative px-8 py-4 bg-[#C58C6D] text-[#FFF6EB] rounded-full text-lg font-semibold overflow-hidden shadow-xl shadow-[#C58C6D]/30 hover:shadow-2xl hover:shadow-[#6B705C]/40 transition-all duration-300">
            <span className="relative z-10 flex items-center gap-2">
              Explorar Catálogo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-[#6B705C]" />
          </button>
        </div>

        {/* Stats / Trust Badges */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-[#C58C6D]/20 pt-12">
          {[
            { label: "Materiales", value: "100% Eco" },
            { label: "Envíos", value: "Globales" },
            { label: "Garantía", value: "30 Días" },
            { label: "Soporte", value: "24/7" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[#C58C6D]">{stat.value}</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#C58C6D]/60">{stat.label}</span>
            </div>
          ))}
        </div>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.21, 1.02, 0.48, 1) forwards;
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress-bar {
          animation: progress 2.5s ease-out forwards;
        }
      `}} />
    </div>
  );
}

export default App;