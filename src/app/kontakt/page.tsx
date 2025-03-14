'use client';

import React, { useState } from 'react';


export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simuler en form-innsending - erstatt med faktisk API-kall
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Suksess
      setSubmitStatus({ success: true, message: 'Takk for din henvendelse! Vi tar kontakt så snart som mulig.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {

      console.error(error);

      // Feil
      setSubmitStatus({ success: false, message: 'Det oppsto en feil ved sending av skjemaet. Vennligst prøv igjen.', details: error.message || ' ukent feil' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kontaktinformasjon */}
        <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6">Kontakt Bådstad AS</h1>
          <p className="mb-8">
            Ta kontakt for befaring, tilbud eller bare en uforpliktende prat om ditt prosjekt. 
            Vi hjelper deg gjennom hele prosessen.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-800 p-3 rounded-full mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Telefon</h3>
                <a href="tel:+4712345678" className="text-blue-200 hover:text-white transition-colors">+47 123 45 678</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-800 p-3 rounded-full mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">E-post</h3>
                <a href="mailto:post@badstad.no" className="text-blue-200 hover:text-white transition-colors">post@badstad.no</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-800 p-3 rounded-full mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Adresse</h3>
                <p className="text-blue-200">Rørleggergata 123, 2317 Hamar</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-blue-800">
            <h3 className="font-semibold mb-3">Følg oss</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.105 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.008c0 2.643-.013 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.008c-2.643 0-2.987-.013-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 01-1.772-1.153 4.903 4.903 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.903 4.903 0 011.153-1.772A4.903 4.903 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Kontaktskjema */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Send oss en melding</h2>
          
          {submitStatus && submitStatus.success && (
            <div className="p-4 mb-6 rounded-lg bg-green-100 text-green-800">
              {submitStatus.message}
            </div>
          )}
          
          {submitStatus && !submitStatus.success && (
            <div className="p-4 mb-6 rounded-lg bg-red-100 border-l-4 border-red-500 animate-bounce-in">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Feil oppstod</h3>
                  <div className="mt-1 text-sm text-red-700">
                    <p>{submitStatus.message}</p>
                    {submitStatus.details && (
                      <p className="mt-1 text-xs font-mono bg-red-50 p-1 rounded">{submitStatus.details}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Navn</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ditt navn"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">E-post</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Din e-postadresse"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ditt telefonnummer"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Melding</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Beskriv ditt prosjekt eller henvendelse"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sender...' : 'Send melding'}
            </button>
          </form>
          
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Ved å sende inn dette skjemaet samtykker du til at vi kan kontakte deg angående din henvendelse. 
            Vi vil aldri dele dine personopplysninger med tredjepart.
          </p>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(-10px);
          }
          70% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}