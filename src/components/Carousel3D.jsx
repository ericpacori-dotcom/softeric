import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const Carousel3D = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Estados para el arrastre
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0); // Nuevo: Para detectar scroll vertical
  const [currentDragX, setCurrentDragX] = useState(0);

  const containerRef = useRef(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, handleNext, activeIndex]);

  // --- Lógica de Arrastre Inteligente (Touch Friendly) ---
  
  const handlePointerDown = (e) => {
    // NO capturamos el puntero inmediatamente ni pausamos el autoplay todavía.
    // Solo guardamos dónde empezó el dedo.
    setIsDragging(false);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setCurrentDragX(0);
  };

  const handlePointerMove = (e) => {
    // Si ya estamos arrastrando (confirmado), movemos el carrusel
    if (isDragging) {
      // Prevenir el scroll por si acaso el navegador intenta intervenir tarde
      if (e.cancelable) e.preventDefault(); 
      const x = e.clientX - startX;
      setCurrentDragX(x);
      return;
    }

    // Si NO estamos arrastrando aún, verificamos la intención del usuario
    // Solo si el botón del mouse está presionado o hay un dedo en pantalla
    if (e.buttons > 0 || e.pointerType === 'touch') {
      const xDiff = Math.abs(e.clientX - startX);
      const yDiff = Math.abs(e.clientY - startY);

      // Umbral mínimo para decidir (5px)
      if (xDiff > 5 || yDiff > 5) {
        // Si se mueve más en HORIZONTAL que en VERTICAL -> Es un Swipe de Carrusel
        if (xDiff > yDiff) {
          setIsDragging(true);
          setIsAutoPlaying(false); // Ahora sí pausamos
          e.currentTarget.setPointerCapture(e.pointerId); // Capturamos el evento
          const x = e.clientX - startX;
          setCurrentDragX(x);
        } 
        // Si se mueve más en VERTICAL -> Es Scroll de página
        else {
          // No hacemos nada, dejamos que el navegador haga scroll nativo
        }
      }
    }
  };

  const handlePointerUp = (e) => {
    // Liberar captura siempre
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 100;
    
    if (currentDragX < -threshold) {
      handleNext();
    } else if (currentDragX > threshold) {
      handlePrev();
    }
    
    setCurrentDragX(0);
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
      <button 
        onClick={() => { handlePrev(); setIsAutoPlaying(true); }}
        className="hidden md:block absolute left-4 md:left-10 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#FF8C73] hover:border-[#FF8C73] hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={() => { handleNext(); setIsAutoPlaying(true); }}
        className="hidden md:block absolute right-4 md:right-10 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#FF8C73] hover:border-[#FF8C73] hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronRight size={24} />
      </button>

      {/* Área Táctil:
         - touch-pan-y: PERMITE scroll vertical nativo del navegador.
         - touch-none: (ELIMINADO) Ya no bloqueamos todo.
      */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-40 touch-pan-y" 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

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
                  setIsAutoPlaying(true);
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