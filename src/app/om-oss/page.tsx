import { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
}

export const metadata: Metadata = {
  title: 'Om oss | Bådstad AS',
  description: 'Profesjonell oppussing av bad i innlandet med fokus på kvalitet og håndverk. Bådstad AS er din ekspert på baderomsrenovering – skreddersydde løsninger, solid håndverk og trygg oppfølging. Kontakt oss for et nytt bad du vil elske'
};

const teamMembers: TeamMember[] = [
  {
    name: 'Kent Erik Bådstad',
    title: 'Daglig Leder',
    description: 'Grunnlegger og daglig leder med over 15 års erfaring innen baderomsrenovering. Kent Erik sikrer at alle prosjekter gjennomføres med høyeste kvalitet og kundetilfredshet.',
    image: "/images/kent-erik-badstad.jpg"
  }

];

const OmOssPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl mt-16">
      <section className="mb-20">
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-5xl font-bold mb-3 text-center">Om Bådstad AS</h1>
          <div className="w-24 h-1 bg-blue-600 mb-12"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-1">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg h-full">
              <p className="text-lg mb-6 leading-relaxed">
                Vi er et team av dedikerte fagfolk som spesialiserer oss på baderom av høyeste kvalitet. 
                Med vår omfattende kompetanse og lidenskap for håndverk, skaper vi funksjonelle og estetisk 
                tiltalende bad som overgår forventningene.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Bådstad AS ble grunnlagt i 2020 med en visjon om å levere kvalitetsløsninger til våre kunder.
                Vi kombinerer tradisjonelt håndverk med moderne teknikker for å sikre holdbare og 
                tidløse resultater på alle våre prosjekter.
              </p>
              <p className="text-lg leading-relaxed">
                Vårt mål er å gjøre baderomsrenovering til en smidig og stressfri opplevelse for våre kunder, 
                fra planlegging til ferdigstillelse.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative h-96 lg:h-[28rem] rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-blue-900/20 z-10"></div>
              <Image 
                src="/images/baadstad1.webp" 
                alt="Bådstad AS baderom" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-20">
                <span className="text-white font-medium text-lg block">Kvalitet i hvert detalj</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold mb-3 text-center">Vårt Team</h2>
          <div className="w-16 h-1 bg-blue-600 mb-8"></div>
          <p className="text-xl text-center max-w-2xl mb-12">
            Møt menneskene bak Bådstad AS som gjør drømmebaderommet ditt til virkelighet
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-w-4 aspect-h-3 relative h-80 overflow-hidden">
                  {member.image ? (
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.title}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mt-20 bg-blue-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Opplev forskjellen med Bådstad AS</h2>
          <p className="text-lg mb-8">
            Vi lever etter våre verdier: kvalitet, pålitelighet og kundetilfredshet. Kontakt oss i dag for å diskutere 
            ditt neste baderomsprosjekt.
          </p>
          <a 
            href="/kontakt" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Kontakt Oss
          </a>
        </div>
      </section>
    </div>
  );
};

export default OmOssPage;