'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Kent Erik Bådstad',
    title: 'Daglig Leder',
    description: 'Grunnlegger og daglig leder med over 15 års erfaring innen baderomsrenovering. Kent Erik sikrer at alle prosjekter gjennomføres med høyeste kvalitet og kundetilfredshet.',
    image: "/images/baadstad4.webp"
  }
];

const OmOssClient: React.FC = () => {
  const [isSafari, setIsSafari] = useState(false);
  
  // Bruk useEffect for å legge til CSS klasser etter at komponenten er montert
  useEffect(() => {
    // Sjekk om det er Safari
    const checkSafari = () => {
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    };
    
    setIsSafari(checkSafari());
    
    // Legg til en klasse på body for å trigge animasjoner
    document.body.classList.add('page-loaded');
    
    // Funksjon for å håndtere scroll-animasjoner
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.75);
        
        if (isVisible) {
          section.classList.add('animate-visible');
        }
      });
    };
    
    // Legg til scroll-lytter
    window.addEventListener('scroll', handleScroll);
    // Kjør en gang ved oppstart for å animere synlige elementer
    handleScroll();
    
    // Cleanup funksjon
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('page-loaded');
    };
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl mt-16">
      <section className="mb-20 animate-fade-in">
        <div className="flex flex-col items-center mb-16">
          <h1 
            className="text-5xl font-bold mb-3 text-center animate-slide-up" 
            style={{ color: '#172554' }}
          >
            Om Bådstad AS
          </h1>
          <div className="animate-line-grow w-24 h-1 mb-12" style={{ backgroundColor: '#60a5fa' }}></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Fjernet den blå rammen rundt tekstboksen */}
          <div className="rounded-xl animate-fade-in-delay-1">
            <div className="p-8 rounded-lg h-full shadow-lg" 
                 style={{ backgroundColor: 'white' }}>
              <p className="text-lg mb-6 leading-relaxed animate-fade-in-delay-2">
                Vi er et team av dedikerte fagfolk som spesialiserer oss på baderom av høyeste kvalitet. 
                Med vår omfattende kompetanse og lidenskap for håndverk, skaper vi funksjonelle og estetisk 
                tiltalende bad som overgår forventningene.
              </p>
              <p className="text-lg mb-6 leading-relaxed animate-fade-in-delay-3">
                Bådstad AS ble grunnlagt i 2020 med en visjon om å levere kvalitetsløsninger til våre kunder.
                Vi kombinerer tradisjonelt håndverk med moderne teknikker for å sikre holdbare og 
                tidløse resultater på alle våre prosjekter.
              </p>
              <p className="text-lg leading-relaxed animate-fade-in-delay-4">
                Vårt mål er å gjøre baderomsrenovering til en smidig og stressfri opplevelse for våre kunder, 
                fra planlegging til ferdigstillelse.
              </p>
            </div>
          </div>
          <div className="relative group animate-fade-in-delay-1">
            <div className="absolute -inset-1 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" 
                 style={{ 
                   background: isSafari ? '#2563eb' : 'linear-gradient(to right, #2563eb, #0891b2)'
                 }}></div>
            <div className="relative h-96 lg:h-[28rem] rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 z-10" style={{ backgroundColor: 'rgba(30, 58, 138, 0.2)' }}></div>
              
              <Image 
                src="/images/baadstad2.webp" 
                alt="Bådstad AS baderom" 
                fill 
                priority
                style={{ objectFit: 'cover' }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 animate-fade-in-delay-4" 
                   style={{ 
                     background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                   }}>
                <span className="text-white font-medium text-lg block">Kvalitet i hvert detalj</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="animate-on-scroll">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold mb-3 text-center" style={{ color: '#172554' }}>Vårt Team</h2>
          <div className="animate-line-grow-scroll w-16 h-1 mb-8" style={{ backgroundColor: '#60a5fa' }}></div>
          <p className="text-xl text-center max-w-2xl mb-12">
            Møt menneskene bak Bådstad AS som gjør drømmebaderommet ditt til virkelighet
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className={`group animate-on-scroll animate-team-${index}`}>
              <div className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2"
                   style={{ backgroundColor: 'white' }}>
                <div className="aspect-w-4 aspect-h-3 relative h-80 overflow-hidden">
                  {member.image ? (
                    <div className="animate-fade-in-scroll">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6 animate-fade-in-scroll-delay">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="font-medium mb-4" style={{ color: '#2563eb' }}>{member.title}</p>
                  <p style={{ color: '#4b5563' }}>{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mt-20 rounded-2xl p-8 md:p-12 animate-on-scroll shadow-lg"
               style={{ backgroundColor: '#eff6ff' }}>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#172554' }}>Opplev forskjellen med Bådstad AS</h2>
          <p className="text-lg mb-8">
            Vi lever etter våre verdier: kvalitet, pålitelighet og kundetilfredshet. Kontakt oss i dag for å diskutere 
            ditt neste baderomsprosjekt.
          </p>
          <a 
            href="/kontakt" 
            className="inline-block font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#172554', color: 'white' }}
          >
            Kontakt Oss
          </a>
        </div>
      </section>
      
      {/* CSS-animasjoner */}
      <style jsx global>{`
        /* Basis-animasjoner */
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slideUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          0% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes lineGrow {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        /* Animasjonsklasser for page-load */
        .page-loaded .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .page-loaded .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .page-loaded .animate-line-grow {
          width: 0;
          animation: lineGrow 0.8s ease-out 0.3s forwards;
        }
        
        .page-loaded .animate-scale-in {
          opacity: 0;
          animation: scaleIn 0.8s ease-out 0.2s forwards;
        }
        
        /* Forsinket fade-in for sekvenser */
        .page-loaded .animate-fade-in-delay-1 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.2s forwards;
        }
        
        .page-loaded .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.4s forwards;
        }
        
        .page-loaded .animate-fade-in-delay-3 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.6s forwards;
        }
        
        .page-loaded .animate-fade-in-delay-4 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.8s forwards;
        }
        
        /* Scroll-animasjoner */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-line-grow-scroll {
          width: 0;
          transition: width 0.8s ease-out 0.3s;
        }
        
        .animate-visible .animate-line-grow-scroll {
          width: 4rem;
        }
        
        .animate-fade-in-scroll {
          opacity: 0;
          transition: opacity 0.8s ease-out 0.2s;
        }
        
        .animate-visible .animate-fade-in-scroll {
          opacity: 1;
        }
        
        .animate-fade-in-scroll-delay {
          opacity: 0;
          transition: opacity 0.8s ease-out 0.4s;
        }
        
        .animate-visible .animate-fade-in-scroll-delay {
          opacity: 1;
        }
        
        /* Team medlem animasjoner */
        .animate-team-0 {
          transition-delay: 0.1s;
        }
        
        .animate-team-1 {
          transition-delay: 0.3s;
        }
        
        /* Safari-spesifikke stiler */
        @supports (-webkit-touch-callout: none) {
          /* Sikre at bakgrunnen er lys på Safari */
          body, html {
            background-color: #ffffff !important;
          }
          
          /* Fikse gradient-problemer */
          .bg-gradient-to-r {
            background-image: none !important;
            background-color: #3b82f6 !important;
          }
          
          /* Fikse farger */
          .text-blue-950 {
            color: #172554 !important;
          }
          
          .bg-blue-400 {
            background-color: #60a5fa !important;
          }
          
          .bg-blue-50 {
            background-color: #eff6ff !important;
          }
          
          /* Fikse animasjoner for Safari */
          @keyframes lineGrow {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              -webkit-transform: translateY(30px); 
              transform: translateY(30px); 
              opacity: 0; 
            }
            to { 
              -webkit-transform: translateY(0); 
              transform: translateY(0); 
              opacity: 1; 
            }
          }
          
          /* Sikre at hover-effekter fungerer på Safari */
          .group:hover .transition-transform {
            -webkit-transform: scale(1.05);
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default OmOssClient;