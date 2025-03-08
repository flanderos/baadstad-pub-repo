'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FolderKanban } from 'lucide-react';

// Define types for particles
interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  duration: number;
  shape: 'circle' | 'square' | 'triangle';
}

// Define types for button dimensions
interface ButtonDimensions {
  width: number;
  height: number;
  left: number;
  top: number;
}

// Define types for mouse position
interface MousePosition {
  x: number;
  y: number;
}

const EpicButton: React.FC = () => {
  // State for mouse position and interactions
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonControls = useAnimation();
  const [buttonDimensions, setButtonDimensions] = useState<ButtonDimensions>({ 
    width: 0, 
    height: 0, 
    left: 0, 
    top: 0 
  });

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
  const [particles, setParticles] = useState<Particle[]>([]);
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

  const updateButtonDimensions = (): void => {
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
  const handleMouseMove = (e: React.MouseEvent): void => {
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
  const createParticles = (): void => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const force = 5 + Math.random() * 15;
      const size = 3 + Math.random() * 10;
      const opacity = 0.5 + Math.random() * 0.5;
      const colorIndex = Math.floor(Math.random() * particleColors.length);
      const duration = 0.5 + Math.random() * 1.5;
      const shape = Math.random() > 0.7 
        ? 'circle' 
        : (Math.random() > 0.5 ? 'square' : 'triangle');
      
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
        shape: shape as 'circle' | 'square' | 'triangle'
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
  const handleClick = (): void => {
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
  const renderParticle = (particle: Particle): React.ReactElement => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
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
            style={baseStyle}
          />
        );
      case 'triangle':
        return (
          <div
            key={particle.id}
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
            className="rounded-full"
            style={baseStyle}
          />
        );
    }
  };

  // For animations that rely on spring values
  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);
  const translateZ = useTransform(springX, [-100, 100], [0, 0]);
  const translateX = useTransform(springX, [-100, 100], [-2, 2]);
  const translateY = useTransform(springY, [-100, 100], [-2, 2]);

  return (
    <div 
      className="relative inline-block"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transition: 'opacity 0.5s ease',
        perspective: '1000px'
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
        }}
      >
        {/* Button with hover container */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transition: isHovered ? 'none' : 'transform 0.5s ease'
          }}
        >
          {/* Pulsing border */}
          <div className="absolute -inset-[2px] rounded-lg overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={isHovered ? {
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
              } : {}}
              transition={isHovered ? {
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              } : {}}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
          </div>
          
          {/* Amazing light beam effect */}
          <div className="absolute inset-0 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/60 to-blue-600/0"
              animate={isHovered ? {
                x: ['-100%', '100%']
              } : {}}
              transition={isHovered ? {
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
              } : {}}
              style={{
                width: '150%',
                left: '-25%',
                mixBlendMode: 'overlay'
              }}
            />
          </div>
          
          {/* Button content */}
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
            
            {/* Content with animated position */}
            <motion.div 
              className="flex items-center gap-2"
              style={{
                transformStyle: 'preserve-3d',
                z: translateZ,
                x: isHovered ? translateX : 0,
                y: isHovered ? translateY : 0,
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
        </motion.div>
      </motion.div>
      
      {/* Particles container - expanded boundaries for better effect */}
      <div className="absolute inset-[-100px] overflow-hidden pointer-events-none" style={{ zIndex: 50 }}>
        {particles.map(particle => renderParticle(particle))}
      </div>
      
      {/* Vi fjerner Link-komponenten her siden den allerede er wrappet utenfor */}
    </div>
  );
};

// Sørg for at filnavn endres til EpicButton.tsx for TypeScript-støtte
export default EpicButton;