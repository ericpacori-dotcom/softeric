import React from 'react';

const FeatureBadge = ({ text }) => (
  // Padding reducido (px-3 py-1), texto más pequeño (text-[10px])
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C73] animate-pulse"></span>
    {text}
  </span>
);

export default FeatureBadge;