'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSafari, setIsSafari] = useState<boolean>(false);

  // Sjekk om det er Safari i useEffect
  useState(() => {
    const checkSafari = () => {
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    };
    
    setIsSafari(checkSafari());
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    ? { background: '#3b82f6', color: 'white' } 
    : { background: 'linear-gradient(to right, #60a5fa, #2563eb)', color: 'white' };

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
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
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
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
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
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#e5e7eb',
                borderRadius: '0.5rem'
              }}
            />
          </motion.div>
        </div>

        <div>
          <label htmlFor="message" className="block mb-1.5 font-medium" style={{ color: '#374151' }}>Melding</label>
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
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#e5e7eb',
                borderRadius: '0.5rem'
              }}
            ></textarea>
          </motion.div>
        </div>

        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-medium py-3 px-6 rounded-lg focus:outline-none disabled:opacity-70 transition-all flex items-center justify-center min-w-[140px]"
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