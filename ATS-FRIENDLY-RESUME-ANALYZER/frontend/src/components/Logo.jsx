import React from 'react';

export default function Logo({ showTagline = false, size = "md", variant = "light" }) {
  // Size variations
  const isSmall = size === "sm";
  const isLarge = size === "lg";

  const logoContent = (
    <div className="flex items-center gap-2.5">
      {/* User's Custom Cyan-Purple-Pink N Logo Image */}
      <div className={`relative flex items-center justify-center shrink-0 ${isSmall ? 'w-7 h-7' : isLarge ? 'w-11 h-11' : 'w-9 h-9'}`}>
        <img 
          src="/logo.png" 
          alt="NAVIREQ ATS Logo" 
          className="w-full h-full object-contain filter drop-shadow-md rounded-lg"
        />
      </div>

      {/* Brand Name Typography - ALWAYS PURE WHITE */}
      <div className="flex items-center gap-2">
        <span className={`font-black tracking-tight text-white ${isSmall ? 'text-lg' : isLarge ? 'text-3xl' : 'text-2xl'}`}>
          N<span className="tracking-tighter">Λ</span>VIREQ
        </span>

        {/* ATS Badge */}
        <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-extrabold italic px-2 py-0.5 rounded-md text-xs shadow-xs tracking-wider">
          ATS
        </span>
      </div>
    </div>
  );

  // When used on light pages (variant="dark"), wrap in a sleek dark slate badge so white text pops out perfectly
  if (variant === 'dark') {
    return (
      <div className="inline-flex flex-col items-start gap-1 select-none">
        <div className="bg-slate-950 px-3.5 py-1.5 rounded-2xl border border-slate-800/90 shadow-md flex items-center">
          {logoContent}
        </div>
        {showTagline && (
          <p className="text-xs font-medium tracking-wide mt-0.5 text-slate-500 pl-1">
            Navigate the ATS. Land the Role.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-1 select-none">
      {logoContent}
      {showTagline && (
        <p className="text-xs font-medium tracking-wide mt-0.5 text-cyan-200">
          Navigate the ATS. Land the Role.
        </p>
      )}
    </div>
  );
}

