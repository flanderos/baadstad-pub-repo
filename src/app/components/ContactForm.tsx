'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle, Loader, XCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSafari, setIsSafari] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Sjekk om det er Safari i useEffect
  useEffect(() => {
    const checkSafari = () => {
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    };
    
    setIsSafari(checkSafari());
  }, []);

  // Validering ved hver endring
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Sjekk om skjemaet er gyldig
  useEffect(() => {
    const formIsValid = 
      Object.keys(errors).length === 0 && 
      formData.name.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.subject.trim() !== '' && 
      formData.message.trim() !== '';
    
    setIsFormValid(formIsValid);
  }, [errors, formData]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Navn validering
    if (touched.name && formData.name.trim() === '') {
      newErrors.name = 'Navn er påkrevd';
    } else if (touched.name && formData.name.trim().length < 2) {
      newErrors.name = 'Navnet må være minst 2 tegn';
    }
    
    // E-post validering
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touched.email && formData.email.trim() === '') {
      newErrors.email = 'E-post er påkrevd';
    } else if (touched.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Vennligst skriv inn en gyldig e-postadresse';
    }
    
    // Emne validering
    if (touched.subject && formData.subject.trim() === '') {
      newErrors.subject = 'Emne er påkrevd';
    } else if (touched.subject && formData.subject.trim().length < 3) {
      newErrors.subject = 'Emnet må være minst 3 tegn';
    }
    
    // Melding validering
    if (touched.message && formData.message.trim() === '') {
      newErrors.message = 'Melding er påkrevd';
    } else if (touched.message && formData.message.trim().length < 10) {
      newErrors.message = 'Meldingen må være minst 10 tegn';
    } else if (touched.message && formData.message.trim().length > 1000) {
      newErrors.message = 'Meldingen kan ikke være mer enn 1000 tegn';
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = () => {
    setFocusedField(null);
    validateForm();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Merk alle felt som berørt
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);
    
    // Kjør validering en siste gang
    validateForm();
    
    if (!isFormValid) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      // Legg til en kort forsinkelse for å vise ladeanimeringen (kan fjernes i produksjon)
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch('/api/supabase/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({});
        
        // Automatisk fjern suksessmelding etter 5 sekunder
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error(result.error || 'Noe gikk galt');
      }
    } catch (error) {
      console.error('Feil:', error);
      setSubmitError('Det oppsto en feil ved innsending av skjemaet. Prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animasjonsvarianter
  const inputVariants = {
    focused: { scale: 1.01, boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.2)' },
    default: { scale: 1, boxShadow: '0 0 0 0px rgba(79, 70, 229, 0)' }
  };

  const alertVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } }
  };

  // Definisjon av gradient som bakgrunnsfarge for Safari-kompatibilitet
  const buttonStyle = isSafari 
    ? { background: isFormValid ? '#3b82f6' : '#9ca3af', color: 'white' } 
    : { 
        background: isFormValid 
          ? 'linear-gradient(to right, #60a5fa, #2563eb)' 
          : 'linear-gradient(to right, #9ca3af, #6b7280)', 
        color: 'white' 
      };

  // Hjelpefunksjon for å bestemme inputstil basert på valideringsstatus
  const getInputStyle = (fieldName: string) => {
    const baseStyle = { 
      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
      borderRadius: '0.5rem'
    };
    
    if (errors[fieldName] && touched[fieldName]) {
      return { ...baseStyle, borderColor: '#ef4444' }; // Rød for feil
    } else if (touched[fieldName] && formData[fieldName] && !errors[fieldName]) {
      return { ...baseStyle, borderColor: '#10b981' }; // Grønn for gyldig
    }
    
    return baseStyle;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AnimatePresence>
          {submitSuccess && (
            <motion.div 
              variants={alertVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="border rounded-lg flex items-center px-4 py-3"
              style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46' }}
            >
              <Check className="w-5 h-5 mr-2" style={{ color: '#10b981' }} />
              <span>Takk for din henvendelse! Vi vil kontakte deg så snart som mulig.</span>
            </motion.div>
          )}

          {submitError && (
            <motion.div 
              variants={alertVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="border rounded-lg flex items-center px-4 py-3"
              style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}
            >
              <AlertCircle className="w-5 h-5 mr-2" style={{ color: '#ef4444' }} />
              <span>{submitError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block mb-1.5 font-medium" style={{ color: '#374151' }}>Navn</label>
            <motion.div
              variants={inputVariants}
              animate={focusedField === 'name' ? 'focused' : 'default'}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                placeholder="Ditt navn"
                className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
                style={getInputStyle('name')}
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>
                  <XCircle className="inline-block w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </motion.div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1.5 font-medium" style={{ color: '#374151' }}>E-post</label>
            <motion.div
              variants={inputVariants}
              animate={focusedField === 'email' ? 'focused' : 'default'}
              transition={{ duration: 0.2 }}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                placeholder="din.epost@eksempel.no"
                className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
                style={getInputStyle('email')}
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>
                  <XCircle className="inline-block w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1.5 font-medium" style={{ color: '#374151' }}>Emne</label>
          <motion.div
            variants={inputVariants}
            animate={focusedField === 'subject' ? 'focused' : 'default'}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => handleFocus('subject')}
              onBlur={handleBlur}
              required
              placeholder="Hva gjelder din henvendelse?"
              className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
              style={getInputStyle('subject')}
            />
            {errors.subject && touched.subject && (
              <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>
                <XCircle className="inline-block w-4 h-4 mr-1" />
                {errors.subject}
              </p>
            )}
          </motion.div>
        </div>

        <div>
          <label htmlFor="message" className="block mb-1.5 font-medium" style={{ color: '#374151' }}>
            Melding 
            {touched.message && formData.message && (
              <span className="ml-2 text-sm" style={{ color: formData.message.length > 1000 ? '#ef4444' : '#6b7280' }}>
                {formData.message.length}/1000
              </span>
            )}
          </label>
          <motion.div
            variants={inputVariants}
            animate={focusedField === 'message' ? 'focused' : 'default'}
            transition={{ duration: 0.2 }}
          >
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              required
              rows={5}
              placeholder="Skriv din melding her..."
              className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors resize-none"
              style={getInputStyle('message')}
            ></textarea>
            {errors.message && touched.message && (
              <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>
                <XCircle className="inline-block w-4 h-4 mr-1" />
                {errors.message}
              </p>
            )}
          </motion.div>
        </div>

        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className="font-medium py-3 px-6 rounded-lg focus:outline-none disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[140px]"
            style={buttonStyle}
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                <span>Sender...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                <span>Send melding</span>
              </>
            )}
          </motion.button>
          {!isFormValid && Object.keys(touched).length > 0 && (
            <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>
              Vennligst fyll ut alle feltene korrekt før du sender skjemaet.
            </p>
          )}
        </div>
      </form>

      {/* Safari-spesifikke stiler */}
      <style jsx global>{`
        @supports (-webkit-touch-callout: none) {
          /* Knapper og bakgrunner */
          .bg-gradient-to-r {
            background-image: none !important;
            background-color: #3b82f6 !important;
          }
          
          /* Alertmeldinger */
          .bg-emerald-50 {
            background-color: #ecfdf5 !important;
          }
          
          .bg-red-50 {
            background-color: #fef2f2 !important;
          }
          
          /* Fokus-stiler */
          input:focus, textarea:focus {
            border-color: #6366f1 !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ContactForm;