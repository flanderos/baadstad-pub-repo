'use client';
// Fil: src/app/prosjekter/[slug]/ClientProjectDetails.tsx

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Typer
interface Project {
  id: string;
  title: string;
  description: string;
  content?: string;
  image_url?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  location?: string;
  client_type?: string;
  project_type?: string;
  completion_date?: string;
  features?: string[];
}

interface GalleryImage {
  id: string;
  project_id: string;
  image_url: string;
  image_type: 'gallery' | 'before' | 'after';
  sort_order: number;
  bucket_name: string;
}

interface OrganizedImages {
  gallery: GalleryImage[];
  before: GalleryImage[];
  after: GalleryImage[];
}

interface ClientProjectDetailsProps {
  project: Project;
  galleryImages: OrganizedImages;
}

// Formater dato til lesbar format
const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('nb-NO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Bildegalleri Modal komponent
const ImageGalleryModal = ({ images, selectedIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  
  useEffect(() => {
    // Legg til event listener for å lukke med ESC-tasten
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEsc);
    
    // Deaktiver scrolling på body
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white"
        onClick={handlePrevious}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="relative w-full max-w-4xl h-[80vh] max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <Image
          src={images[currentIndex].image_url}
          alt={`Bilde ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-contain"
          priority
        />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white"
        onClick={handleNext}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

// Hoved-komponenten
export default function ClientProjectDetails({ project, galleryImages }: ClientProjectDetailsProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentGalleryType, setCurrentGalleryType] = useState<GalleryImage[]>([]);
  
  const contentHtml = project.content || project.description || '';
  const formattedDate = formatDate(project.completion_date || project.created_at);
  const projectType = project.project_type || 'Rørleggerarbeid';
  const location = project.location || '';
  const clientType = project.client_type || '';
  const features = project.features || [];
  
  // Sjekk om vi har før/etter-bilder
  const showBeforeAfter = galleryImages.before.length > 0 && galleryImages.after.length > 0;
  
  // Vi vil også samle alle bilder for å kunne bla gjennom alle
 /*  const allImages = [...galleryImages.gallery, ...galleryImages.before, ...galleryImages.after]; */
  
  // Åpne bildemodalen med spesifikt bilde
  const openGallery = (images: GalleryImage[], index: number) => {
    setCurrentGalleryType(images);
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero section med bilde */}
      <div className="relative w-full h-96">
        {project.image_url ? (
          <>
            <Image 
              src={project.image_url} 
              alt={project.title} 
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-800 to-blue-900 flex items-center justify-center">
            <svg className="w-24 h-24 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
        )}
        
        {/* Tittel overlay */}
        <div className="absolute inset-x-0 bottom-0 container mx-auto px-4 md:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {projectType && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-600/90 text-white rounded-full">
                  {projectType}
                </span>
              )}
              {location && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-600/90 text-white rounded-full">
                  {location}
                </span>
              )}
              {clientType && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-600/90 text-white rounded-full">
                  {clientType}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {project.title}
            </h1>
            {formattedDate && (
              <p className="text-white/80 text-sm md:text-base mb-4">
                Ferdigstilt {formattedDate}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Innholdsområde */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 -mt-16 relative z-10 mb-12">
            {/* Prosjektinformasjon-kort */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Type</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{projectType}</p>
              </div>
              
              {location && (
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sted</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{location}</p>
                </div>
              )}
              
              {clientType && (
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Kunde</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{clientType}</p>
                </div>
              )}
              
              {formattedDate && (
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ferdigstilt</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{formattedDate}</p>
                </div>
              )}
            </div>
            
            {/* Nøkkelelementer */}
            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Nøkkelelementer</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Beskrivelse */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Om prosjektet</h3>
              {contentHtml.startsWith('<') ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <div className="space-y-6">
                  {contentHtml.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 dark:text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Bildegalleri - vises kun hvis vi har galleribilder */}
          {galleryImages.gallery.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Bildegalleri</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.gallery.map((image, index) => (
                  <div 
                    key={`gallery-${index}`} 
                    className="aspect-square relative rounded-lg overflow-hidden shadow-md cursor-pointer group"
                    onClick={() => openGallery(galleryImages.gallery, index)}
                  >
                    <Image 
                      src={image.image_url} 
                      alt={`Prosjektbilde ${index + 1}`} 
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Før og etter bildegalleri - vises kun hvis vi har begge typer bilder */}
          {showBeforeAfter && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Før og etter</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Før-bilder */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Før</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {galleryImages.before.map((image, index) => (
                      <div 
                        key={`before-${index}`} 
                        className="relative h-64 w-full rounded-lg overflow-hidden shadow-md cursor-pointer group"
                        onClick={() => openGallery(galleryImages.before, index)}
                      >
                        <Image 
                          src={image.image_url} 
                          alt={`Før-bilde ${index + 1}`} 
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Etter-bilder */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Etter</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {galleryImages.after.map((image, index) => (
                      <div 
                        key={`after-${index}`} 
                        className="relative h-64 w-full rounded-lg overflow-hidden shadow-md cursor-pointer group"
                        onClick={() => openGallery(galleryImages.after, index)}
                      >
                        <Image 
                          src={image.image_url} 
                          alt={`Etter-bilde ${index + 1}`} 
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* CTA Boks */}
          <div className="bg-blue-950 dark:bg-blue-700 rounded-xl shadow-lg p-6 md:p-8 text-white mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Ønsker du et lignende prosjekt?</h3>
                <p className="text-blue-100">Ta kontakt med oss for en uforpliktende befaring og tilbud.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/kontakt" 
                  className="inline-block px-6 py-3 bg-white text-blue-950 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md"
                >
                  Kontakt oss
                </a>
                <a 
                  href="tel:+4712345678" 
                  className="inline-flex items-center px-6 py-3 bg-white hover:bg-blue-50 text-blue-950 font-bold rounded-lg transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Ring oss
                </a>
              </div>
            </div>
          </div>
          
          {/* Navigasjon */}
          <div className="flex justify-between items-center">
            <Link
              href="/prosjekter" 
              className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Se alle prosjekter
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bildegallerimoda - vises når brukeren klikker på et bilde */}
      {galleryOpen && (
        <ImageGalleryModal 
          images={currentGalleryType}
          selectedIndex={selectedImageIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
}