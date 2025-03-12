'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      const response = await fetch('/api/supabase/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Takk for din henvendelse! Vi vil kontakte deg så snart som mulig.
        </div>
      )}

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">Navn</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">E-post</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block mb-1 font-medium">Emne</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">Melding</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Sender...' : 'Send melding'}
      </button>
    </form>
  );
};

export default ContactForm;
