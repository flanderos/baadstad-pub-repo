"use client";

import { motion } from "framer-motion";
import EpicContactButton from "./ui/EpicContactButton";


const FinalSection = () => {
  return (
    <div>
    <section className="relative bg-gray-800 text-white py-20 text-center">
      
      {/* Bakgrunnsdekorasjon */}
   

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6">La oss skape noe fantastisk sammen</h2>
        <p className="text-lg text-gray-300 mb-8">
          Vi er klare til å hjelpe deg med ditt neste prosjekt – enten det er oppussing, rørlegging eller totalrenovering.
          Ta kontakt i dag for en uforpliktende prat!
        </p>
        <EpicContactButton />
      </motion.div>
    </section>
    
    </div>
  );
};

export default FinalSection;
