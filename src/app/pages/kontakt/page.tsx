import ContactForm from '@/app/components/ContactForm';
import { Metadata } from 'next';
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Definerer metadata med riktig Next.js type
export const metadata: Metadata = {
  title: 'Kontakt oss | Min Nettside',
  description: 'Ta kontakt med vårt team - vi er her for å hjelpe deg',
};

// Utvidet interface med ikon-støtte
interface ContactInfo {
  type: string;
  lines: string[];
  icon: React.ReactNode;
  color: string;
}

const KontaktPage: React.FC = () => {
  // Strukturerer kontaktinformasjonen med ikoner og farger
  const contactInfo: ContactInfo[] = [
    {
      type: 'Adresse',
      lines: ['Eksempelgaten 123', '0123 Oslo'],
      icon: <MapPin className="w-6 h-6" />,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      type: 'Telefon',
      lines: ['+47 123 45 678'],
      icon: <Phone className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      type: 'E-post',
      lines: ['kontakt@eksempel.no'],
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-violet-100 text-violet-600'
    },
    {
      type: 'Åpningstider',
      lines: ['Man-Fre: 09:00 - 16:00', 'Lør-Søn: Stengt'],
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  // Animasjonsvarianter
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 font-main">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Kontakt oss
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Vi er alltid klare til å hjelpe deg. Send oss en melding eller bruk kontaktinformasjonen under.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Kontaktinformasjon</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="flex items-start"
                  >
                    <div className={`p-3 rounded-lg mr-4 ${info.color} flex-shrink-0`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{info.type}</h3>
                      {info.lines.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-600">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-8 overflow-hidden relative"
            >
              <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-indigo-100 opacity-60"></div>
              <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-purple-100 opacity-60"></div>
              
              <h2 className="text-2xl font-semibold mb-4 relative z-10">Følg oss</h2>
              <div className="flex space-x-4 relative z-10">
                <a href="#" className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 bg-white rounded-xl shadow-lg p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-transparent rounded-full -mr-32 -mt-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-transparent rounded-full -ml-24 -mb-24 opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Send oss en melding</h2>
              <p className="text-gray-600 mb-8">
                Fyll ut skjemaet under, så svarer vi deg så fort vi kan. Vanligvis innen 24 timer.
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.9769403758004!2d10.732089!3d59.913320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDU0JzQ4LjAiTiAxMMKwNDMnNTUuNSJF!5e0!3m2!1sno!2sno!4v1616161616161!5m2!1sno!2sno" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Kontorplassering"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default KontaktPage;