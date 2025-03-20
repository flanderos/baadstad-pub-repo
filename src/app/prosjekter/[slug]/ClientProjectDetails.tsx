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
      style={{ 
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <button 
        style={{ 
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          color: 'white',
          zIndex: 50
        }}
        onClick={onClose}
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <button 
        style={{ 
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '0.5rem',
          borderRadius: '9999px',
          color: 'white'
        }}
        onClick={handlePrevious}
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div 
        style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '56rem',
          height: '80vh',
          maxHeight: '80vh',
          overflow: 'hidden' 
        }} 
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].image_url}
          alt={`Bilde ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          style={{ objectFit: 'contain' }}
          priority
        />
        
        <div style={{ 
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem'
        }}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      <button 
        style={{ 
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '0.5rem',
          borderRadius: '9999px',
          color: 'white'
        }}
        onClick={handleNext}
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSafari, setIsSafari] = useState(false);
  
  useEffect(() => {
    // Sjekk om det er Safari
    const checkSafari = () => {
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    };
    
    setIsSafari(checkSafari());
  }, []);
  
  const contentHtml = project.content || project.description || '';
  const formattedDate = formatDate(project.completion_date || project.created_at);
  const projectType = project.project_type || 'Rørleggerarbeid';
  const location = project.location || '';
  const clientType = project.client_type || '';
  const features = project.features || [];
  
  // Sjekk om vi har før/etter-bilder
  const showBeforeAfter = galleryImages.before.length > 0 && galleryImages.after.length > 0;
  
  // Åpne bildemodalen med spesifikt bilde
  const openGallery = (images: GalleryImage[], index: number) => {
    setCurrentGalleryType(images);
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };
  
  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero section med bilde */}
      <div style={{ position: 'relative', width: '100%', height: '24rem' }}>
        {project.image_url ? (
          <>
            <Image 
              src={project.image_url} 
              alt={project.title} 
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover' }}
            />
            {/* Gradient overlay */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              opacity: 0.6,
              background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.5), transparent)'
            }} />
          </>
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: '#1e40af', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '6rem', height: '6rem', color: 'rgba(255,255,255,0.4)' }} 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
        )}
        
        {/* Tittel overlay */}
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          padding: '2rem 1rem'
        }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {projectType && (
                <span style={{ 
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  backgroundColor: 'rgba(37, 99, 235, 0.9)',
                  color: 'white',
                  borderRadius: '9999px'
                }}>
                  {projectType}
                </span>
              )}
              {location && (
                <span style={{ 
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  backgroundColor: 'rgba(75, 85, 99, 0.9)',
                  color: 'white',
                  borderRadius: '9999px'
                }}>
                  {location}
                </span>
              )}
              {clientType && (
                <span style={{ 
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  backgroundColor: 'rgba(75, 85, 99, 0.9)',
                  color: 'white',
                  borderRadius: '9999px'
                }}>
                  {clientType}
                </span>
              )}
            </div>
            
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              color: 'white', 
              marginBottom: '0.5rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              {project.title}
            </h1>
            {formattedDate && (
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Ferdigstilt {formattedDate}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Innholdsområde */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '3rem 1rem' 
      }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.75rem', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
            marginTop: '-4rem',
            position: 'relative',
            zIndex: 10,
            marginBottom: '3rem'
          }}>
            {/* Prosjektinformasjon-kort */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '1.5rem', 
              marginBottom: '2rem', 
              paddingBottom: '2rem', 
              borderBottom: '1px solid rgba(229, 231, 235, 1)'
            }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.25rem' }}>Type</h3>
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{projectType}</p>
              </div>
              
              {location && (
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.25rem' }}>Sted</h3>
                  <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{location}</p>
                </div>
              )}
              
              {clientType && (
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.25rem' }}>Kunde</h3>
                  <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{clientType}</p>
                </div>
              )}
              
              {formattedDate && (
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.25rem' }}>Ferdigstilt</h3>
                  <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{formattedDate}</p>
                </div>
              )}
            </div>
            
            {/* Nøkkelelementer */}
            {features.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Nøkkelelementer</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                  gap: '0.75rem' 
                }}>
                  {features.map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <svg 
                        style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb', marginRight: '0.5rem', marginTop: '0.125rem' }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span style={{ color: '#4b5563' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Beskrivelse */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Om prosjektet</h3>
              {contentHtml.startsWith('<') ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {contentHtml.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} style={{ color: '#4b5563' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Bildegalleri - vises kun hvis vi har galleribilder */}
          {galleryImages.gallery.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '0.75rem', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '1.5rem',
              marginBottom: '3rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Bildegalleri</h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                gap: '1rem' 
              }}>
                {galleryImages.gallery.map((image, index) => (
                  <div 
                    key={`gallery-${index}`} 
                    style={{ 
                      aspectRatio: '1/1',
                      position: 'relative',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer'
                    }}
                    onClick={() => openGallery(galleryImages.gallery, index)}
                  >
                    <Image 
                      src={image.image_url} 
                      alt={`Prosjektbilde ${index + 1}`} 
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      style={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                      }}
                      className="gallery-image"
                    />
                    <div style={{ 
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'all 0.3s',
                    }} className="gallery-overlay">
                      <svg style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '0.75rem', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '1.5rem',
              marginBottom: '3rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Før og etter</h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {/* Før-bilder */}
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Før</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {galleryImages.before.map((image, index) => (
                      <div 
                        key={`before-${index}`} 
                        style={{ 
                          position: 'relative',
                          height: '16rem',
                          width: '100%',
                          borderRadius: '0.5rem',
                          overflow: 'hidden',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          cursor: 'pointer'
                        }}
                        onClick={() => openGallery(galleryImages.before, index)}
                      >
                        <Image 
                          src={image.image_url} 
                          alt={`Før-bilde ${index + 1}`} 
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ 
                            objectFit: 'cover',
                            transition: 'transform 0.3s'
                          }}
                          className="gallery-image"
                        />
                        <div style={{ 
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'all 0.3s',
                        }} className="gallery-overlay">
                          <svg style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Etter-bilder */}
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Etter</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {galleryImages.after.map((image, index) => (
                      <div 
                        key={`after-${index}`} 
                        style={{ 
                          position: 'relative',
                          height: '16rem',
                          width: '100%',
                          borderRadius: '0.5rem',
                          overflow: 'hidden',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          cursor: 'pointer'
                        }}
                        onClick={() => openGallery(galleryImages.after, index)}
                      >
                        <Image 
                          src={image.image_url} 
                          alt={`Etter-bilde ${index + 1}`} 
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ 
                            objectFit: 'cover',
                            transition: 'transform 0.3s'
                          }}
                          className="gallery-image"
                        />
                        <div style={{ 
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'all 0.3s',
                        }} className="gallery-overlay">
                          <svg style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div style={{ 
            backgroundColor: '#172554', 
            borderRadius: '0.75rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
            marginBottom: '3rem',
            color: 'white'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Ønsker du et lignende prosjekt?</h3>
                <p style={{ color: '#93c5fd' }}>Ta kontakt med oss for en uforpliktende befaring og tilbud.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a 
                  href="/kontakt" 
                  style={{ 
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'white',
                    color: '#172554',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    textDecoration: 'none'
                  }}
                >
                  Kontakt oss
                </a>
                <a 
                  href="tel:+4712345678" 
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'white',
                    color: '#172554',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    textDecoration: 'none'
                  }}
                >
                  <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Ring oss
                </a>
              </div>
            </div>
          </div>
          
          {/* Navigasjon */}
          <div>
            <Link
              href="/prosjekter" 
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f3f4f6',
                color: '#111827',
                fontWeight: '500',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      
      {/* CSS for hover-effekter på galleribilder */}
      <style jsx global>{`
        /* Bruk standard CSS-klasser for hover-effekter som er mer kompatible med Safari */
        .gallery-image:hover {
          transform: scale(1.05);
        }
        
        /* Gjelder bilder når brukeren hovrer over container */
        div:hover .gallery-overlay {
          background-color: rgba(0, 0, 0, 0.3) !important;
          opacity: 1 !important;
        }
        
        /* Safari-spesifikke stiler */
        @supports (-webkit-touch-callout: none) {
          /* Sikre at bakgrunnen er hvit på Safari */
          html, body {
            background-color: #f9fafb !important;
          }
          
          /* Fjern dark mode for Safari */
          .dark {
            color-scheme: light !important;
          }
          
          /* Forbedre gradient rendering */
          .bg-gradient-to-t {
            background: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.5), transparent) !important;
          }
          
          /* Forbedre rendering av knapper */
          .bg-blue-950, .dark\:bg-blue-700 {
            background-color: #172554 !important;
          }
          
          /* Sikre at tekst er leselig */
          .text-white, .dark\:text-white {
            color: #ffffff !important;
          }
          
          .text-gray-800, .dark\:text-gray-700 {
            color: #111827 !important;
          }
        }
        
        @media (hover: none) {
          /* For enheter uten hover-støtte (touch-enheter) */
          .gallery-image {
            transform: scale(1) !important;
          }
          
          .gallery-overlay {
            background-color: rgba(0, 0, 0, 0.15) !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}