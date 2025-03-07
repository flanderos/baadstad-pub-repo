import ContactForm from '@/app/components/ContactForm';
import { Metadata } from 'next';
import React from 'react';

// Definerer metadata med riktig Next.js type
export const metadata: Metadata = {
  title: 'Kontakt oss | Min Nettside',
  description: 'Ta kontakt med oss',
};

// Interfacet kan utvides hvis du trenger å legge til props senere
interface ContactInfo {
  type: string;
  lines: string[];
}

const KontaktPage: React.FC = () => {
  // Strukturerer kontaktinformasjonen for enklere vedlikehold
  const contactInfo: ContactInfo[] = [
    {
      type: 'Adresse',
      lines: ['Eksempelgaten 123', '0123 Oslo']
    },
    {
      type: 'Telefon',
      lines: ['+47 123 45 678']
    },
    {
      type: 'E-post',
      lines: ['kontakt@eksempel.no']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 font-main">
      <h1 className="text-4xl font-bold mb-6">Kontakt oss</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kontaktinformasjon</h2>
          {contactInfo.map((info, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{info.type}:</p>
              {info.lines.map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send oss en melding</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default KontaktPage;