import { Metadata } from 'next';
import React from 'react';

interface TeamMember {
  name: string;
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: 'Om oss | Bådstad AS',
  description: 'Profesjonell oppussing av bad med fokus på kvalitet og håndverk. Bådstad AS er din ekspert på baderomsrenovering – skreddersydde løsninger, solid håndverk og trygg oppfølging. Kontakt oss for et nytt bad du vil elske'
};

const teamMembers: TeamMember[] = [
  {
    name: 'Kent Erik Bådstad',
    title: 'Daglig Leder',
    description: 'kort beskrivelse'
  },
];

const OmOssPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Om oss</h1>
      <div className="max-w-3xl mb-12">
        <p className="text-lg mb-4">
          Vi er et team av dedikerte fagfolk som jobber med å skape fantastiske digitale opplevelser. 
          Med vår kompetanse innen webdesign og utvikling, hjelper vi bedrifter med å nå sine mål.
        </p>
        <p className="text-lg mb-4">
          Vår bedrift ble grunnlagt i 2020 med en visjon om å levere kvalitetsløsninger til våre kunder.
          Siden den gang har vi vokst og utvidet våre tjenester til å dekke et bredt spekter av digitale behov.
        </p>
      </div>

      <h2 className="text-3xl font-bold mb-6">Vårt Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
            <p className="text-center text-gray-600 mb-2">{member.title}</p>
            <p className="text-center">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OmOssPage;