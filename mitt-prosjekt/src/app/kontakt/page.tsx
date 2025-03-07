import ContactForm from '@/app/components/ContactForm';

export const metadata = {
  title: 'Kontakt oss | Min Nettside',
  description: 'Ta kontakt med oss',
}

const KontaktPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Kontakt oss</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kontaktinformasjon</h2>
          <div className="mb-4">
            <p className="font-medium">Adresse:</p>
            <p>Eksempelgaten 123</p>
            <p>0123 Oslo</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Telefon:</p>
            <p>+47 123 45 678</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">E-post:</p>
            <p>kontakt@eksempel.no</p>
          </div>
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