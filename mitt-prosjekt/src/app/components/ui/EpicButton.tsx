'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FolderKanban } from 'lucide-react';
import Link from 'next/link';

const EpicButton = () => {
  // State for mouse position and interactions
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const buttonControls = useAnimation();
  const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });

  // Motion values for advanced animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Glow position transforms
  const glowX = useTransform(springX, [-100, 100], [-50, 50]);
  const glowY = useTransform(springY, [-100, 100], [-50, 50]);
  
  // Particle system
  const [particles, setParticles] = useState([]);
  const particleCount = 25;
  const particleColors = [
    '#3B82F6', // blue-500
    '#2563EB', // blue-600
    '#1D4ED8', // blue-700
    '#60A5FA', // blue-400
    '#93C5FD', // blue-300
    '#FCD34D', // yellow-300
    '#F472B6', // pink-400
    '#A78BFA', // purple-400
  ];

  // Set up button dimensions on mount and resize
  useEffect(() => {
    if (buttonRef.current) {
      updateButtonDimensions();
      setTimeout(() => setIsVisible(true), 100);
    }

    window.addEventListener('resize', updateButtonDimensions);
    return () => window.removeEventListener('resize', updateButtonDimensions);
  }, []);

  const updateButtonDimensions = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonDimensions({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      });
    }
  };

  // Mouse tracking for dynamic effects
  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      mouseX.set(x);
      mouseY.set(y);
      
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Create particle explosion effect on click
  const createParticles = () => {
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const force = 5 + Math.random() * 15;
      const size = 3 + Math.random() * 10;
      const opacity = 0.5 + Math.random() * 0.5;
      const colorIndex = Math.floor(Math.random() * particleColors.length);
      const duration = 0.5 + Math.random() * 1.5;
      const shape = Math.random() > 0.7 ? 'circle' : (Math.random() > 0.5 ? 'square' : 'triangle');
      
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        x: mousePosition.x || buttonDimensions.width / 2,
        y: mousePosition.y || buttonDimensions.height / 2,
        vx: Math.cos(angle) * force,
        vy: Math.sin(angle) * force,
        size,
        opacity,
        color: particleColors[colorIndex],
        rotation: Math.random() * 360,
        rotationSpeed: -10 + Math.random() * 20,
        duration,
        shape
      });
    }
    
    setParticles(newParticles);
    
    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 2000);
  };

  // Update particle positions with animation frame
  useEffect(() => {
    if (particles.length === 0) return;
    
    const animationId = requestAnimationFrame(() => {
      setParticles(currentParticles => 
        currentParticles
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.98, // air resistance
            vy: p.vy * 0.98 + 0.2, // gravity
            opacity: p.opacity - (0.6 / (p.duration * 60)),
            rotation: p.rotation + p.rotationSpeed
          }))
          .filter(p => p.opacity > 0)
      );
    });
    
    return () => cancelAnimationFrame(animationId);
  }, [particles]);

  // Text animation variants
  const textVariants = {
    initial: { opacity: 1 },
    hovered: { 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  // Button scale animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hovered: { scale: 1.03 },
    tapped: { scale: 0.98 }
  };

  // Handle click event
  const handleClick = () => {
    setIsClicked(true);
    buttonControls.start({
      scale: [1.03, 0.98, 1.03],
      transition: { duration: 0.3 }
    });
    createParticles();
    
    // Reset clicked state after animation
    setTimeout(() => {
      setIsClicked(false);
    }, 800);
  };

  // Render a particle based on its shape
  const renderParticle = (particle) => {
    const baseStyle = {
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      opacity: particle.opacity,
      transform: `rotate(${particle.rotation}deg)`,
      boxShadow: `0 0 8px ${particle.color}`
    };

    switch(particle.shape) {
      case 'square':
        return (
          <div
            key={particle.id}
            className="absolute"
            style={baseStyle}
          />
        );
      case 'triangle':
        return (
          <div
            key={particle.id}
            className="absolute"
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${particle.size/2}px solid transparent`,
              borderRight: `${particle.size/2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              boxShadow: `0 0 8px ${particle.color}`
            }}
          />
        );
      default: // circle
        return (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={baseStyle}
          />
        );
    }
  };

  return (
    <div 
      className="relative inline-block perspective-1000"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transition: 'opacity 0.5s ease',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Ambient glow that follows mouse */}
      <motion.div 
        className="absolute -inset-3 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(29, 78, 216, 0.2) 50%, transparent 70%)',
          x: glowX,
          y: glowY
        }}
      />
      
      {/* 3D floating effect container */}
      <motion.div
        className="group relative inline-block"
        animate={buttonControls}
        initial="initial"
        whileHover="hovered"
        whileTap="tapped"
        variants={buttonVariants}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mouseY.get() / 10)}deg) rotateY(${-(mouseX.get() / 15)}deg)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: isHovered ? 'none' : 'transform 0.5s ease'
        }}
      >
        {/* Pulsing border */}
        <div className="absolute -inset-[2px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" style={{
            backgroundSize: '200% 100%',
            animation: isHovered ? 'moveGradient 3s linear infinite' : 'none'
          }}></div>
        </div>
        
        {/* Amazing light beam effect */}
        <div className="absolute inset-0 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/60 to-blue-600/0" style={{
            width: '150%',
            left: '-25%',
            transform: `translateX(${isHovered ? '100%' : '-100%'})`,
            transition: 'transform 1.5s ease',
            animation: isHovered ? 'pulseLight 3s ease-in-out infinite' : 'none',
            mixBlendMode: 'overlay'
          }}></div>
        </div>
        
        {/* Button content */}
        <Link href="/prosjekter">
          <motion.button
            ref={buttonRef}
            className="relative z-10 bg-blue-600 text-white font-medium py-3 px-8 rounded-lg overflow-hidden flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent pointer-events-none"></div>
            
            {/* Subtle inner shadow on press */}
            <div className={`absolute inset-0 bg-black/20 opacity-0 transition-opacity pointer-events-none ${isClicked ? 'opacity-20' : ''}`}></div>
            
            {/* Fjernet dot grid texture */}
            
            {/* Content with animated position */}
            <motion.div 
              className="flex items-center gap-2"
              style={{ 
                transform: isHovered 
                  ? `translateZ(10px) translateX(${mouseX.get() / 50}px) translateY(${mouseY.get() / 50}px)` 
                  : 'translateZ(0)',
                transition: isHovered ? 'none' : 'transform 0.5s ease'
              }}
            >
              <motion.span variants={textVariants}>Se våre prosjekter</motion.span>
              <motion.div
                animate={{ rotate: isHovered ? [0, -10, 0, 10, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              >
                <FolderKanban className="w-4 h-4" />
              </motion.div>
              <motion.div
                animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </motion.button>
        </Link>
      </motion.div>
      
      {/* Particles container - expanded boundaries for better effect */}
      <div className="absolute inset-[-100px] overflow-hidden pointer-events-none" style={{ zIndex: 50 }}>
        {particles.map(particle => renderParticle(particle))}
      </div>
      
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulseLight {
          0% { opacity: 0.2; transform: translateX(-100%); }
          50% { opacity: 0.6; transform: translateX(50%); }
          100% { opacity: 0.2; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default EpicButton;