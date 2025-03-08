'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowDown,  User  } from 'lucide-react';
import Link from 'next/link';
import EpicButton from './components/ui/EpicButton';

// Importer komponenter
import ServiceSection from './components/ServiceSection';
import ProjectSection from './components/ProjectSection';
import AboutSection from './components/AboutSection';
import DecorativeElement from './components/ui/DecorativeElement';
import FinalSection from './components/FinalSection';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  
  // Parallax-effekt for bakgrunnen
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  // Scroll-indikator animasjon
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0]
  );

  useEffect(() => {
    // Setter en liten forsinkelse for lastingen for å tillate animasjoner
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <section 
        ref={heroRef}
        className="relative h-screen w-full flex flex-col justify-center items-start overflow-hidden"
      >
        {/* Parallax bakgrunn */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div 
            className="w-full h-[120%] absolute top-0 left-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/background.webp)',
            }}
          />
        </motion.div>
        
        {/* Moderne gradient overlay med texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-color z-0"></div>
        
        {/* Subtil texture overlay */}
        <div className="absolute inset-0 opacity-10 z-0" 
          style={{ 
            backgroundImage: 'url(/images/noise-texture.png)', 
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Innhold med staggered animasjon */}
        <div className="flex justify-center container w-full mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col items-start max-w-xl p-6"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
              variants={itemVariants}
            >
              BÅDSTAD <span className="text-blue-400">AS</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
              variants={itemVariants}
            >
              Din nøkkelpartner for perfekte rør og bærekraftige løsninger.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
            <Link href="/prosjekter">
  <EpicButton />
</Link>

              
              <Link href="/kontakt">
              <motion.button 
                className="group bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium py-3 px-8 rounded-lg transition-all duration-300 cursor-pointer flex"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Kontakt oss <User />
              </motion.button>

              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indikator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          style={{ opacity: scrollIndicatorOpacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={scrollToContent}
        >
          <ArrowDown className="w-8 h-8 text-white" />
        </motion.div>
      </section>

      {/* Animert overgang mellom seksjoner */}
      <motion.div 
        className="bg-white py-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <ScrollReveal>
          <ServiceSection />
        </ScrollReveal>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <DecorativeElement />
        </motion.div>
        
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <ProjectSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <FinalSection />
        </ScrollReveal>
      </motion.div>
    </div>
  );
}

type ScrollRevealProps = {
  children: React.ReactNode;
};

// Hjelpefunksjon for å animere seksjoner ved scrolling
const ScrollReveal: React.FC<ScrollRevealProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};