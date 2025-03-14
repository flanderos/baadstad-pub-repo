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
              className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center"
            >
              <Check className="w-5 h-5 mr-2 text-emerald-500" />
              <span>Takk for din henvendelse! Vi vil kontakte deg så snart som mulig.</span>
            </motion.div>
          )}

          {submitError && (
            <motion.div 
              variants={alertVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              <span>{submitError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block mb-1.5 font-medium text-gray-700">Navn</label>
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white bg-opacity-90 transition-colors"
              />
            </motion.div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1.5 font-medium text-gray-700">E-post</label>
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white bg-opacity-90 transition-colors"
              />
            </motion.div>
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1.5 font-medium text-gray-700">Emne</label>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white bg-opacity-90 transition-colors"
            />
          </motion.div>
        </div>

        <div>
          <label htmlFor="message" className="block mb-1.5 font-medium text-gray-700">Melding</label>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white bg-opacity-90 transition-colors resize-none"
            ></textarea>
          </motion.div>
        </div>

        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 transition-all flex items-center justify-center min-w-[140px]"
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
    </motion.div>
  );
};

export default ContactForm;