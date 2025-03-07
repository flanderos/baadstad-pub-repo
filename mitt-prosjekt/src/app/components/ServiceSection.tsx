'use client';

import React from "react";
import { motion } from "framer-motion";

interface Service {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  slug?: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Flislegging",
    description: "Transformér badet ditt med vår førsteklasses flisleggingstjeneste! Slitesterke, vannbestandige fliser i et vell av designvalg garanterer et utsøkt og langvarig resultat. Ta det første skrittet mot ditt drømmebad i dag!",
    image: "/images/baadstad1.webp",
    slug: "flislegging"
  },
  {
    id: 2,
    title: "Baderomsinnredning",
    description: "Transformér ditt bad til en luksuriøs oase med vår høykvalitets baderomsinnredning! Kombiner funksjonalitet og stil med oppbevaringsløsninger som skaper orden, samt estetisk tiltalende design som løfter rommets atmosfære. Gjør badet ditt til en personlig spa-retreat!",
    image: "/images/baadstad2.webp",
    slug: "seo-markedsforing"
  },
  {
    id: 3,
    title: "Renovering",
    description: "Gjør ditt gamle bad om til et stilrent, moderne fristed med vår brukervennlige oppussingstjeneste! Vi blander enestående kvalitet, holdbart materiale og vår ekspertise for å skape ditt drømmebad. Ikke bare fjerner vi dine gamle bekymringer - vi gir deg en luksuriøs hverdagsflukt!",
    image: "/images/baadstad4.webp",
    slug: "ecommerce"
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section className="mx-auto px-6 py-20 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Våre <span className="text-blue-400">tjenester</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Vi tilbyr omfattende baderomsløsninger med ekspertise innen flislegging, 
            innredning og renovering for å skape ditt perfekte bad.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-800/80 rounded-xl overflow-hidden shadow-lg border border-gray-700"
            >
              {/* Image */}
              {service.image && (
                <div className="h-56 w-full relative">
                  <div
                    className="absolute inset-0"
                    style={{ 
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-blue-400">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;