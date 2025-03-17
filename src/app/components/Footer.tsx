'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  MapPin, 
  Mail, 
  Phone, 

  Building,
  ArrowUpRight
} from 'lucide-react';

// Definerer typer for sosiale medier lenker
interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

// Definerer typer for navigasjonslenker
interface NavLink {
  name: string;
  path: string;
  
}

// Hovedkomponenten for Footer
const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovering, setCursorHovering] = useState('');
  

  // Håndterer musebevegelse for spotlight-effekt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  // Navigasjonslenker
  const navLinks: NavLink[] = [
    { name: 'Tjenester', path: '/' },
    { name: 'Prosjekter', path: '/prosjekter' },
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Kontakt', path: '/kontakt' },
    { name: 'Logg inn', path: 'https://www.webfront.no/admin' }
  ];
  
  // Sosiale medier lenker med ikoner
  const socialLinks: SocialLink[] = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/baadstad/?locale=nb_NO', 
      icon: <Facebook size={20} />, 
      color: 'bg-blue-600'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/baadstad/', 
      icon: <Instagram size={20} />, 
      color: 'bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700'
    }
  ];
  
  // Kontaktinformasjon med ikoner
  const contactInfo = [
    { text: 'Kvennhusvegen 21', icon: <MapPin size={18} /> },
    { text: '2820 Nordre Toten', icon: <Building size={18} /> },
    { text: <a href="mailto:post@baadstad.no" className="hover:text-white transition-colors">post@baadstad.no</a>, icon: <Mail size={18} /> },
    { text: <a href="tel:+91144919" className="hover:text-white transition-colors">+91 14 49 19</a>, icon: <Phone size={18} /> }

  ];

  // Nyhetsbrev form håndtering
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      
      // Reset subscription status after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  // Animation variants
  const footerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-700 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-800 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-60 h-60 bg-cyan-700 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Diagonal border top */}
      <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden">
        <div className="absolute inset-0 bg-white" style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)'
        }}></div>
      </div>

      {/* Main footer content */}
      <div 
        className="relative container mx-auto px-6 py-16"
        style={{
          backgroundImage: cursorHovering ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)` : 'none'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Company information */}
          <motion.div 
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            variants={footerItemVariants}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">B</span>
              </div>
              <h3 className="text-xl font-bold">Bådstad AS</h3>
            </div>
            
            <p className="mb-6 text-gray-400 leading-relaxed">
              Vi er spesialister på rørlegging og totalrenovering av bad. 
              Med fokus på kvalitet og kundetilfredshet sørger vi for at du 
              får et stilrent og funksjonelt bad som varer.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} p-2.5 rounded-full text-white transition-all duration-300`}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setCursorHovering(social.name)}
                  onMouseLeave={() => setCursorHovering('')}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div 
            className="md:col-span-2"
            initial="hidden"
            whileInView="visible"
            variants={footerItemVariants}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Sider
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-3 z-50">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.path} 
                    className="group text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                    onMouseEnter={() => setCursorHovering(link.name)}
                    onMouseLeave={() => setCursorHovering('')}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div 
            className="md:col-span-3"
            initial="hidden"
            whileInView="visible"
            variants={footerItemVariants}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Kontakt
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-gray-400"
                  onMouseEnter={() => setCursorHovering('contact')}
                  onMouseLeave={() => setCursorHovering('')}
                >
                  <span className="text-blue-500 mr-3">{info.icon}</span>
                  {info.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter subscription */}
          <motion.div 
            className="md:col-span-3"
            initial="hidden"
            whileInView="visible"
            variants={footerItemVariants}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Nyhetsbrev
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              />
            </h3>
            <p className="text-gray-400 mb-4">
              Få de siste oppdateringene på e-post.
            </p>
            
            {subscribed ? (
              <motion.div 
                className="bg-green-900/30 border border-green-600 p-3 rounded-lg text-sm text-green-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Takk for påmeldingen! Du vil nå motta vårt nyhetsbrev.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadresse"
                  className="w-full bg-gray-800/50 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Meld på
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom bar with background animation */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute h-40 w-40 rounded-full blur-3xl bg-blue-800 z-50"
              animate={{ 
                x: [0, 100, 200, 100, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 20,
                ease: "easeInOut" 
              }}
              style={{ top: '-20px', left: '30%' }}
            />
          </div>
          
          <div className="relative">
            <p>&copy; {currentYear} Bådstad AS. Alle rettigheter reservert.</p>
            
           
          </div>
          
        </motion.div>
        <p className="mt-2 text-gray-400 flex flex-row justify-end">
              Utviklet og levert av <a href="https://webfront.no" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium z-50 ml-1.5">WebFront</a>
          </p>
      </div>
    </footer>
  );
};

export default Footer;