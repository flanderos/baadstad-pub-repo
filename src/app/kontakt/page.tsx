'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { XCircle } from 'lucide-react';

// Interface for form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}

// Interface for form errors
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  subject?: string;
}

// Interface for submission status
interface SubmitStatus {
  success: boolean;
  message: string;
  details?: string;
}

export default function KontaktPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'Kontaktskjema fra nettsiden',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [isSafari, setIsSafari] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Detect Safari browser using feature detection when possible
  useEffect(() => {
    const checkSafari = () => {
      // Try feature detection first
      if (typeof CSS !== 'undefined' && !CSS.supports('background-image', 'linear-gradient(to bottom right, #172554, #1e3a8a)')) {
        return true;
      }
      // Fallback to user agent
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    };
    
    setIsSafari(checkSafari());
  }, []);

  // Define validateForm with useCallback to avoid stale closures
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (touched.name && formData.name.trim() === '') {
      newErrors.name = 'Navn er påkrevd';
    } else if (touched.name && formData.name.trim().length < 2) {
      newErrors.name = 'Navnet må være minst 2 tegn';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touched.email && formData.email.trim() === '') {
      newErrors.email = 'E-post er påkrevd';
    } else if (touched.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Vennligst skriv inn en gyldig e-postadresse';
    }
    
    // Phone validation (optional)
    if (touched.phone && formData.phone.trim() !== '') {
      const phoneRegex = /^(\+\d{1,3})?[\s-]?\d{3,}[\s-]?\d{2,}[\s-]?\d{2,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Vennligst skriv inn et gyldig telefonnummer';
      }
    }
    
    // Message validation
    if (touched.message && formData.message.trim() === '') {
      newErrors.message = 'Melding er påkrevd';
    } else if (touched.message && formData.message.trim().length < 10) {
      newErrors.message = 'Meldingen må være minst 10 tegn';
    } else if (touched.message && formData.message.trim().length > 1000) {
      newErrors.message = 'Meldingen kan ikke være mer enn 1000 tegn';
    }
    
    setErrors(newErrors);
  }, [formData, touched]);

  // Validate form whenever form data or touched state changes
  useEffect(() => {
    validateForm();
  }, [formData, touched, validateForm]);

  // Check if form is valid whenever errors or form data changes
  useEffect(() => {
    const hasRequiredFields = 
      formData.name.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.message.trim() !== '';
    
    const hasNoErrors = Object.keys(errors).length === 0;
    
    setIsFormValid(hasRequiredFields && hasNoErrors);
  }, [errors, formData.name, formData.email, formData.message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = () => {
    // No need to call validateForm here as it will be triggered by the useEffect
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);
    
    // Wait for the next render cycle to ensure validation has run
    setTimeout(() => {
      if (!isFormValid) {
        setSubmitStatus({
          success: false,
          message: 'Vennligst fyll ut alle påkrevde felt korrekt.',
        });
        return;
      }
      
      submitForm();
    }, 0);
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare data for API call - ensure it matches what your API expects
      const emailData = {
        to: 'post@baadstad.no', // Add explicit recipient if needed by your API
        from: formData.email,
        name: formData.name,
        email: formData.email,
        subject: formData.subject + (formData.phone ? ` (Tlf: ${formData.phone})` : ''),
        message: formData.message,
        phone: formData.phone || 'Ikke oppgitt' // Explicitly include phone
      };
      
      // Log the data being sent for debugging
      console.log('Sending email data:', emailData);
      
      // Send data to API endpoint with proper error handling
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      // Handle non-200 HTTP responses
      if (!response.ok) {
        // Try to get a detailed error message if available
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server svarte med status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Successful submission
        setSubmitStatus({ 
          success: true, 
          message: 'Takk for din henvendelse! Vi tar kontakt så snart som mulig.' 
        });
        
        // Reset form
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          message: '',
          subject: 'Kontaktskjema fra nettsiden' 
        });
        setTouched({});
      } else {
        // Handle API error
        throw new Error(result.error || 'Kunne ikke sende meldingen');
      }
    } catch (error: any) {
      console.error('Feil ved innsending:', error);

      // Show error message to user
      setSubmitStatus({ 
        success: false, 
        message: 'Det oppsto en feil ved sending av skjemaet. Vennligst prøv igjen.', 
        details: error.message || 'ukjent feil' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get input style based on validation status
  const getInputStyle = (fieldName: keyof FormData) => {
    const baseClass = "w-full px-4 py-3 rounded-lg focus:outline-none";
    const validClass = touched[fieldName] && !errors[fieldName] && formData[fieldName].trim() !== '' 
      ? "border-green-500 focus:border-green-500 focus:ring-green-500" 
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
    const errorClass = touched[fieldName] && errors[fieldName] 
      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
      : "";
    
    return `${baseClass} ${validClass} ${errorClass}`;
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kontaktinformasjon */}
        <div className="rounded-xl p-8 text-white" style={{ 
          background: isSafari 
            ? '#172554' 
            : 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
          '--tw-gradient-from': '#172554',
          '--tw-gradient-to': '#1e3a8a',
          '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'
        }}>
          <h1 className="text-3xl font-bold mb-6">Kontakt Bådstad AS</h1>
          <p className="mb-8">
            Ta kontakt for befaring, tilbud eller bare en uforpliktende prat om ditt prosjekt. 
            Vi hjelper deg gjennom hele prosessen.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#1e40af' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Telefon</h3>
                <a href="tel:+4791144919" className="hover:text-white transition-colors" style={{ color: '#bfdbfe' }}>
                  +91 14 49 19
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#1e40af' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">E-post</h3>
                <a href="mailto:post@baadstad.no" className="hover:text-white transition-colors" style={{ color: '#bfdbfe' }}>
                  post@baadstad.no
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#1e40af' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Adresse</h3>
                <p style={{ color: '#bfdbfe' }}>Kvennhusvegen 21, 2820 Nordre Toten</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t" style={{ borderColor: '#1e40af' }}>
            <h3 className="font-semibold mb-3">Følg oss</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/baadstad/?locale=nb_NO" target="_blank" rel="noopener noreferrer" 
                 className="p-3 rounded-full transition-colors" 
                 style={{ backgroundColor: '#1e40af' }}
                 onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e3a8a'}
                 onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/baadstad/" target="_blank" rel="noopener noreferrer" 
                 className="p-3 rounded-full transition-colors" 
                 style={{ backgroundColor: '#1e40af' }}
                 onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e3a8a'}
                 onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.105 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.008c0 2.643-.013 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.008c-2.643 0-2.987-.013-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 01-1.772-1.153 4.903 4.903 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.903 4.903 0 011.153-1.772A4.903 4.903 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Kontaktskjema */}
        <div className="rounded-xl shadow-xl p-8" style={{ backgroundColor: 'white' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1f2937' }}>Send oss en melding</h2>
          
          {submitStatus && submitStatus.success && (
            <div className="p-4 mb-6 rounded-lg" style={{ backgroundColor: '#ecfdf5', color: '#065f46' }}>
              {submitStatus.message}
            </div>
          )}
          
          {submitStatus && !submitStatus.success && (
            <div className="p-4 mb-6 rounded-lg border-l-4 animate-bounce-in" 
                 style={{ backgroundColor: '#fef2f2', borderLeftColor: '#ef4444', color: '#991b1b' }}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5" style={{ color: '#ef4444' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium" style={{ color: '#991b1b' }}>Feil oppstod</h3>
                  <div className="mt-1 text-sm" style={{ color: '#b91c1c' }}>
                    <p>{submitStatus.message}</p>
                    {submitStatus.details && (
                      <p className="mt-1 text-xs font-mono p-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
                        {submitStatus.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-2" style={{ color: '#374151' }}>
                Navn <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                className={getInputStyle('name')}
                placeholder="Ditt navn"
                style={{ 
                  backgroundColor: 'white', 
                  color: '#111827',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: touched.name && errors.name ? '#ef4444' : 
                              (touched.name && formData.name && !errors.name ? '#10b981' : '#d1d5db')
                }}
              />
              {touched.name && errors.name && (
                <p className="mt-1 text-sm flex items-center" style={{ color: '#ef4444' }}>
                  <XCircle className="inline-block w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block font-medium mb-2" style={{ color: '#374151' }}>
                E-post <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                className={getInputStyle('email')}
                placeholder="Din e-postadresse"
                style={{ 
                  backgroundColor: 'white', 
                  color: '#111827',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: touched.email && errors.email ? '#ef4444' : 
                              (touched.email && formData.email && !errors.email ? '#10b981' : '#d1d5db')
                }}
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-sm flex items-center" style={{ color: '#ef4444' }}>
                  <XCircle className="inline-block w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block font-medium mb-2" style={{ color: '#374151' }}>
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                className={getInputStyle('phone')}
                placeholder="Ditt telefonnummer"
                style={{ 
                  backgroundColor: 'white', 
                  color: '#111827',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: touched.phone && errors.phone ? '#ef4444' : 
                              (touched.phone && formData.phone && !errors.phone ? '#10b981' : '#d1d5db')
                }}
              />
              {touched.phone && errors.phone && (
                <p className="mt-1 text-sm flex items-center" style={{ color: '#ef4444' }}>
                  <XCircle className="inline-block w-4 h-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block font-medium mb-2" style={{ color: '#374151' }}>
                Melding <span style={{ color: '#ef4444' }}>*</span>
                {touched.message && formData.message && (
                  <span className="ml-2 text-sm" style={{ 
                    color: formData.message.length > 1000 ? '#ef4444' : '#6b7280' 
                  }}>
                    {formData.message.length}/1000
                  </span>
                )}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                required
                rows={5}
                className={getInputStyle('message')}
                placeholder="Beskriv ditt prosjekt eller henvendelse"
                style={{ 
                  backgroundColor: 'white', 
                  color: '#111827',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: touched.message && errors.message ? '#ef4444' : 
                              (touched.message && formData.message && !errors.message ? '#10b981' : '#d1d5db')
                }}
              />
              {touched.message && errors.message && (
                <p className="mt-1 text-sm flex items-center" style={{ color: '#ef4444' }}>
                  <XCircle className="inline-block w-4 h-4 mr-1" />
                  {errors.message}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${isSubmitting || !isFormValid ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{ 
                backgroundColor: isFormValid ? '#2563eb' : '#9ca3af', 
                color: 'white'
              }}
            >
              {isSubmitting ? 'Sender...' : 'Send melding'}
            </button>
            
            {!isFormValid && Object.values(touched).some(Boolean) && (
              <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>
                Vennligst fyll ut alle påkrevde felt korrekt før du sender skjemaet.
              </p>
            )}
          </form>
          
          <p className="mt-6 text-sm" style={{ color: '#6b7280' }}>
            Ved å sende inn dette skjemaet samtykker du til at vi kan kontakte deg angående din henvendelse. 
            Vi vil aldri dele dine personopplysninger med tredjepart.
          </p>
        </div>
      </div>
      
      {/* Safari-spesifikke stiler */}
      <style jsx global>{`
        @supports (-webkit-touch-callout: none) {
          /* Gradient bakgrunner */
          .bg-gradient-to-br {
            background-image: none !important;
            background-color: #172554 !important;
          }
          
          /* Ringe og fokusstiler */
          .focus\\:ring-2:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
          }
          
          /* Farger for validering */
          .border-green-500 {
            border-color: #10b981 !important;
          }
          
          .border-red-500 {
            border-color: #ef4444 !important;
          }
          
          /* Knapper */
          .bg-blue-600 {
            background-color: #2563eb !important;
          }
          
          /* Background farger */
          .bg-green-100 {
            background-color: #ecfdf5 !important;
          }
          
          .bg-red-100 {
            background-color: #fef2f2 !important;
          }
        }

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