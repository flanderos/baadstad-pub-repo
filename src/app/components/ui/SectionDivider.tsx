"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const SectionDivider = () => {
  const dividerRef = useRef<HTMLDivElement | null>(null);
  
  // Parallax effekt når brukeren scroller
  useEffect(() => {
    const handleScroll = () => {
      if (!dividerRef.current) return;
      const scrollY = window.scrollY;
      const dividerTop = dividerRef.current.getBoundingClientRect().top + scrollY;
      const offset = (scrollY - dividerTop) * 0.1;

      // Løsning: Bruk optional chaining og en type asserting
      const wavePath = dividerRef.current.querySelector('.wave-path') as HTMLElement | null;
      if (wavePath) {
        wavePath.style.transform = `translateY(${offset}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={dividerRef}
      className="relative w-full h-24 overflow-hidden"
    >
      {/* Dynamiske partikler */}
      <div className="absolute inset-0 z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -20, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, Math.random() + 0.5, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 3,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Holo-effekt */}
      <motion.div 
        className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 blur-md"
        style={{ transform: "translateY(-50%)" }}
        animate={{ 
          opacity: [0.4, 0.8, 0.4],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8, 
          ease: "easeInOut" 
        }}
      />

      {/* Pulserende lyseffekt */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-orange-500 blur-xl"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut" 
        }}
      />

      {/* Raske lysstriper */}
      {[...Array(3)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-transparent via-orange-300 to-transparent"
          style={{ 
            y: -1 + i * 1,
            width: `${80 + i * 10}%`,
            opacity: 0.6 - i * 0.1,
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "120%" }}
          transition={{ 
            repeat: Infinity, 
            duration: 2 - i * 0.4, 
            ease: "easeOut",
            delay: i * 0.3 
          }}
        />
      ))}

      {/* Avansert wave effekt med SVG */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          {/* Første bølge - mørk */}
          <motion.path 
            className="wave-path"
            fill="rgba(194, 65, 12, 0.8)" // mørkere oransje
            fillOpacity="0.8"
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            animate={{
              d: [
                "M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z",
                "M0,80L60,74.7C120,69,240,59,360,58.7C480,59,600,69,720,69.3C840,69,960,59,1080,53.3C1200,48,1320,48,1380,48L1440,48L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z",
                "M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }}
          />
          
          {/* Andre bølge - hoved */}
          <motion.path 
            className="wave-path"
            fill="rgb(234,88,12)" // orange-500
            fillOpacity="1"
            d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,90.7C672,96,768,96,864,96C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            animate={{
              d: [
                "M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,90.7C672,96,768,96,864,96C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                "M0,80L48,80C96,80,192,80,288,85.3C384,91,480,101,576,101.3C672,101,768,91,864,85.3C960,80,1056,80,1152,85.3C1248,91,1344,101,1392,106.7L1440,112L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                "M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,90.7C672,96,768,96,864,96C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {/* Tredje bølge - lysere */}
          <motion.path 
            className="wave-path"
            fill="rgba(249, 115, 22, 0.7)" // lysere oransje
            fillOpacity="0.7"
            d="M0,112L60,106.7C120,101,240,91,360,90.7C480,91,600,101,720,101.3C840,101,960,91,1080,90.7C1200,91,1320,101,1380,106.7L1440,112L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            animate={{
              d: [
                "M0,112L60,106.7C120,101,240,91,360,90.7C480,91,600,101,720,101.3C840,101,960,91,1080,90.7C1200,91,1320,101,1380,106.7L1440,112L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z",
                "M0,112L60,112C120,112,240,112,360,106.7C480,101,600,91,720,90.7C840,91,960,101,1080,106.7C1200,112,1320,112,1380,112L1440,112L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z",
                "M0,112L60,106.7C120,101,240,91,360,90.7C480,91,600,101,720,101.3C840,101,960,91,1080,90.7C1200,91,1320,101,1380,106.7L1440,112L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </svg>
      </div>

      {/* Glitch effekt */}
      <div className="absolute inset-0 z-20 w-full pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`glitch-${i}`}
            className="absolute h-[1px] bg-white opacity-40"
            style={{
              top: `${30 + i * 15}%`,
              left: 0,
              width: '100%',
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scaleY: [0, 3, 0],
              x: ['-100%', '100%', '-100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.3,
              ease: "easeInOut",
              delay: 3 + i * 5,
              repeatDelay: 10 + Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionDivider;