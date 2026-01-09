import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const Carousel3D = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isAutoPlaying, setIsAutoPlaying] = useState(true); // Empieza activo
  
  // Estados para el arrastre fluido
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentDragX, setCurrentDragX] = useState(0);

  const containerRef = useRef(null);

  // Funciones de navegación
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  // --- AUTOPLAY INTELIGENTE ---
  useEffect(() => {
    // Si estamos arrastrando o el autoplay está apagado manualmente, no hacemos nada
    if (!isAutoPlaying || isDragging) return;

    // Configurar el intervalo
    const interval = setInterval(handleNext, 4000);

    // Limpiar el intervalo al desmontar o cuando cambien las dependencias
    return () => clearInterval(interval);
    
    // IMPORTANTE: Agregamos 'activeIndex' a las dependencias.
    // Esto hace que cada vez que la tarjeta cambie (sea por el usuario o automática),
    // el contador de 4 segundos se reinicie desde cero.
  }, [isAutoPlaying, isDragging, handleNext, activeIndex]);


  // --- Lógica de Arrastre Fluido (Pointer Events) ---
  
  const handlePointerDown = (e) => {
    setIsAutoPlaying(false); // Pausamos MIENTRAS tocas para que no se mueva solo
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentDragX(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX - startX;
    setCurrentDragX(x);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const threshold = 100;
    
    if (currentDragX < -threshold) {
      handleNext();
    } else if (currentDragX > threshold) {
      handlePrev();
    }
    
    setCurrentDragX(0);
    
    // --- MAGIA AQUÍ ---
    // Al soltar, reactivamos el autoplay inmediatamente.
    setIsAutoPlaying(true); 
  };
  
  // --------------------------------------------------

  const getStyles = (index) => {
    const total = products.length;
    const dragOffset = isDragging ? currentDragX / 300 : 0;
    const effectiveIndex = activeIndex - dragOffset;

    let distance = (index - effectiveIndex + total) % total;
    if (distance > total / 2) distance -= total;
    if (distance < -total / 2) distance += total;

    const absDistance = Math.abs(distance);
    const isActive = absDistance < 0.5;

    if (absDistance > 2.5) {
      return { 
        opacity: 0, 
        transform: `translateX(0) scale(0)`,
        zIndex: -1,
        display: 'none'
      };
    }

    const xOffset = distance * 60; 
    const scale = 1 - (absDistance * 0.2); 
    const rotateY = distance * -15; 
    const zIndex = 10 - Math.round(absDistance);
    const opacity = 1 - (absDistance * 0.3); 
    const blur = absDistance * 2; 

    return {
      transform: `translateX(${xOffset}%) scale(${Math.max(scale, 0)}) perspective(1000px) rotateY(${rotateY}deg)`,
      zIndex: zIndex,
      opacity: Math.max(opacity, 0),
      filter: `blur(${blur}px)`,
      transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      cursor: isDragging ? 'grabbing' : 'grab',
      pointerEvents: 'none', 
    };
  };

  return (
    <div 
      className="relative w-full max-w-[1000px] mx-auto h-[450px] flex items-center justify-center mt-8 perspective-1000"
    >
      {/* Botones Manuales */}
      <button 
        onClick={() => {
          handlePrev();
          setIsAutoPlaying(true); // Aseguramos que siga automático tras el click
        }}
        className="hidden md:block absolute left-4 md:left-10 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#FF8C73] hover:border-[#FF8C73] hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={() => {
          handleNext();
          setIsAutoPlaying(true); // Aseguramos que siga automático tras el click
        }}
        className="hidden md:block absolute right-4 md:right-10 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#FF8C73] hover:border-[#FF8C73] hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronRight size={24} />
      </button>

      {/* Área Táctil */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-40 touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      {/* Tarjetas */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none"> 
        {products.map((item, index) => {
          const styles = getStyles(index);
          const total = products.length;
          let distance = (index - activeIndex + total) % total;
          if (distance > total / 2) distance -= total;

          return (
            <div
              key={item.id}
              className="absolute w-[260px] md:w-[300px] aspect-[3/4] origin-center will-change-transform"
              style={{
                ...styles,
                pointerEvents: isDragging ? 'none' : 'auto' 
              }}
              onClick={() => {
                if (!isDragging && distance !== 0) {
                  setActiveIndex(index);
                  setIsAutoPlaying(true); // Si haces click en una lateral, también sigue automático
                }
              }}
            >
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden shadow-2xl relative bg-white group border border-white/10 select-none">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FF8C73] text-[10px] font-bold uppercase tracking-wider mb-3 shadow-lg">
                    {item.category}
                  </span>
                  
                  <h3 className="text-xl font-bold mb-2 leading-tight">{item.title}</h3>
                  
                  <div className="flex justify-between items-center mt-3 border-t border-white/20 pt-3">
                    <p className="text-lg font-semibold">{item.price}</p>
                    <button className="p-2 bg-white text-[#FF8C73] rounded-full hover:bg-[#FF8C73] hover:text-white transition-colors duration-300 shadow-lg cursor-pointer">
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

export default Carousel3D;