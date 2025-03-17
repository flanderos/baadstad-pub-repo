'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MinimalisticLine from "./ui/MinimalisticLine";

const AboutSection = () => {
  return (
    <div className="relative">
      {/* Dekorative elementer */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      
      <section className="relative min-h-fit flex flex-col justify-center items-center bg-white text-black px-6 py-20 overflow-hidden">
        {/* Subtil bakgrunnstekstur */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0z" fill="%23000" fill-opacity=".05"/%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        {/* Innhold */}
        <div className="max-w-4xl text-center relative z-10">
          <div className="mb-2 flex justify-center">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="h-1 bg-blue-500 rounded-full"
            ></motion.div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold mb-8 text-blue-950"
          >
            Om oss
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Vi i <span className="font-bold text-blue-950">Bådstad AS</span> er spesialister på rørlegging og totalrenovering av bad. 
              Med mange års erfaring og fokus på kvalitet, sørger vi for at du får et 
              funksjonelt og stilrent bad som varer i mange år.
            </p>

            <p className="text-lg md:text-xl text-gray-600">
              Vi tar oss av <span className="font-semibold">alt fra rørinstallasjon til flislegging og montering</span> – 
              og vi leverer alltid håndverk du kan stole på. 
              Vårt mål er å gjøre prosessen <span className="font-semibold">enkel, effektiv og problemfri</span> for deg.
            </p>
          </motion.div>
          
          {/* Fakta bokser */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-blue-950 font-bold text-4xl mb-1">15+</h3>
              <p className="text-gray-600">års erfaring</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-blue-950 font-bold text-4xl mb-1">250+</h3>
              <p className="text-gray-600">fornøyde kunder</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg col-span-2 md:col-span-1">
              <h3 className="text-blue-950 font-bold text-4xl mb-1">100%</h3>
              <p className="text-gray-600">kundetilfredshet</p>
            </div>
          </motion.div>
        </div>

        {/* Knapp med kul animasjon */}
        <motion.button 
          className="relative mt-12 px-8 py-4 bg-blue-950 text-white font-semibold rounded-lg shadow-lg overflow-hidden group hover:cursor-pointer"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <motion.span 
            className="relative z-10 flex items-center"
            variants={{
              hover: {
                x: -4
              }
            }}
          >
            Kontakt oss i dag
            <motion.div
              className="inline-block ml-2"
              variants={{
                hover: {
                  x: 8,
                 
                }
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.span>
          
          <motion.div
            className="absolute left-0 bottom-0 h-1 bg-blue-500"
            initial={{ width: 0 }}
            variants={{
              hover: {
                width: "100%",
                transition: {
                  duration: 0.3
                }
              }
            }}
          />
          
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-blue-800 origin-left"
            initial={{ scaleX: 0 }}
            variants={{
              hover: {
                scaleX: 1,
                transition: {
                  duration: 0.4
                }
              }
            }}
            style={{ zIndex: 1 }}
          />
        </motion.button>
      </section>
      <MinimalisticLine />
    </div>
  );
};

export default AboutSection;