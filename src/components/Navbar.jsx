import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 bg-transparent border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* --- LOGO MÁS PEQUEÑO --- */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#FF8C73] flex items-center justify-center text-white text-[10px] font-serif font-bold italic shadow-lg shadow-[#FF8C73]/20">
            Se
          </div>
          {/* Reducido de text-2xl a text-xl */}
          <h1 className="text-xl font-bold tracking-tighter text-white">
            softeric.
          </h1>
        </div>

        {/* --- ACCIONES --- */}
        <div className="flex items-center gap-3 text-white">
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors hover:text-[#FF8C73]">
             {/* Icono reducido a 18px */}
             <ShoppingBag size={18} />
          </button>
          
          {/* Botón reducido: text-xs, padding menor */}
          <button className="px-4 py-1.5 rounded-full bg-white text-[#FF8C73] text-xs font-bold hover:bg-[#FF8C73] hover:text-white transition-all shadow-lg">
            Ingresar
          </button>
          
          <button 
            className="p-1.5 text-white hover:text-[#FF8C73] transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MENÚ DESPLEGABLE --- */}
      <div className={`
          absolute top-full left-0 w-full 
          bg-black/95 backdrop-blur-xl border-b border-white/10 
          transition-all duration-500 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}
      `}>
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-5">
           {/* Texto reducido de 2xl a xl */}
           <a href="#" className="text-xl font-light text-white hover:text-[#FF8C73] transition-colors tracking-widest">INICIO</a>
           <a href="#" className="text-xl font-light text-white hover:text-[#FF8C73] transition-colors tracking-widest">COLECCIÓN</a>
           <a href="#" className="text-xl font-light text-white hover:text-[#FF8C73] transition-colors tracking-widest">EDITORIAL</a>
           <a href="#" className="text-xl font-light text-white hover:text-[#FF8C73] transition-colors tracking-widest">SOSTENIBILIDAD</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;