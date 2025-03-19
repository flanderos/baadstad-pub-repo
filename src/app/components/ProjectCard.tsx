// Legg til denne stylingen i head-seksjonen av din layout.tsx eller i en global CSS-fil:

`
/* Safari-spesifikke styles - påvirker bare Safari */
@supports (-webkit-touch-callout: none) {
  /* CSS spesifikk for Safari */
  .bg-blue-950, .text-blue-950 {
    /* Lysere versjon av blue-950 for Safari */
    color: #1e3a8a !important;
  }
  
  .bg-blue-950 {
    background-color: #1e3a8a !important;
  }
  
  /* Overstyr mørke bakgrunner */
  .dark .bg-gray-800, .dark .bg-gray-900 {
    background-color: #1e293b !important; /* En lysere versjon */
  }
  
  /* Sikre at tekst ikke er for mørk på mørk bakgrunn */
  .dark .text-white {
    color: #f8fafc !important;
  }
  
  /* Forbedre kontrast på mørke bakgrunner */
  .dark .text-gray-300, .dark .text-gray-400 {
    color: #cbd5e1 !important;
  }
  
  /* Bakgrunnsfarger til kortene dine */
  .dark\:bg-gray-800 {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(37 47 63) !important;
  }
  
  /* Spesifikke stiler for ProjectCard */
  .dark\:bg-blue-900 {
    background-color: rgb(30 58 138) !important;
  }
  
  /* iPhone X+ spesifikk styling (for notched devices) */
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3),
         only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2),
         only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3),
         only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3),
         only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) {
    /* Ytterligere tilpasninger for nyere iPhones om nødvendig */
    .bg-blue-950 {
      background-color: #1e40af !important; /* Enda lysere */
    }
  }
  
  /* Forsøk på å fikse gradients */
  .bg-gradient-to-t, .bg-gradient-to-r {
    background-image: none !important;
  }
  
  .bg-gradient-to-t.from-black.via-black\/50.to-transparent {
    background-color: rgba(0, 0, 0, 0.6) !important;
    opacity: 0.6 !important;
  }
  
  .bg-gradient-to-r.from-blue-800.to-blue-900 {
    background-color: #1e40af !important;
  }
  
  /* Forsøk på å reparere opacity-problemer */
  [class*="/"] {
    --tw-bg-opacity: 1 !important;
  }
  
  /* Setter opaciteten mer eksplisitt for generell bedre kompatibilitet */
  .opacity-0 { opacity: 0 !important; }
  .opacity-50 { opacity: 0.5 !important; }
  .opacity-60 { opacity: 0.6 !important; }
  .opacity-70 { opacity: 0.7 !important; }
  .opacity-100 { opacity: 1 !important; }
  
  /* Forsøk på å fikse gruppe-hover */
  .group:hover .group-hover\:opacity-100 {
    opacity: 1 !important;
  }
  
  .group:hover .group-hover\:scale-110 {
    --tw-scale-x: 1.1 !important;
    --tw-scale-y: 1.1 !important;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) !important;
  }
  
  /* Fiks for backdrop-blur */
  .backdrop-blur-md {
    backdrop-filter: none !important;
    background-color: rgba(255, 255, 255, 0.95) !important;
  }
  
  .dark .backdrop-blur-md {
    background-color: rgba(30, 41, 59, 0.95) !important;
  }
}

/* Meta tag for å sikre korrekt fargevisning på Safari */
/* Legg til denne i head-seksjonen av din layout.tsx:
<meta name="color-scheme" content="light dark">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1e293b" media="(prefers-color-scheme: dark)">
*/
`

// --- For å fikse ProjectCard-komponenten spesifikt, erstatt med dette: ---

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Interfacer og hjelpefunksjoner (uendret)
interface Project {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  slug?: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'minimal';
}

const generateSlug = (title: string, id: number | string): string => {
  if (!title) return String(id);
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'default' }) => {
  const projectUrl = `/prosjekter/${project.slug || generateSlug(project.title, project.id)}`;
  const isMinimal = variant === 'minimal';
  
  return (
    <div className="safari-card group relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl" 
         style={{ 
           backgroundColor: 'white', 
           padding: isMinimal ? '0.75rem' : '0'
         }}>
      {!isMinimal && (
        <div className="relative h-52 w-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" 
                 style={{ backgroundColor: '#1e40af' }}>
              <svg className="w-16 h-16" 
                   style={{ color: 'white', opacity: 0.5 }} 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24" 
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Forenklet overlay uten gradient */}
          <div className="safari-overlay absolute inset-0 transition-opacity duration-300" 
               style={{ 
                 backgroundColor: 'rgba(0,0,0,0.5)', 
                 opacity: 0 
               }}
               onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
               onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
          />
        </div>
      )}
      
      <div style={{ padding: isMinimal ? '0.75rem' : '1.25rem' }}>
        {project.tags && project.tags.length > 0 && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem', 
            marginBottom: isMinimal ? '0.5rem' : '0.75rem' 
          }}>
            {project.tags.map((tag, index) => (
              <span key={index} 
                    style={{ 
                      display: 'inline-block',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '9999px'
                    }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <h3 style={{ 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          fontSize: isMinimal ? '1.125rem' : '1.25rem',
          color: '#172554'
        }}>
          {project.title}
        </h3>
        
        {!isMinimal && (
          <p style={{ 
            marginBottom: '1rem', 
            color: '#4b5563',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.description}
          </p>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link 
            href={projectUrl}
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              padding: isMinimal ? '0.375rem 0.75rem' : '0.5rem 1rem',
              backgroundColor: '#172554',
              color: 'white',
              fontWeight: '500',
              borderRadius: '0.5rem',
              fontSize: isMinimal ? '0.875rem' : '1rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e3a8a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#172554'}
          >
            {isMinimal ? 'Se mer' : 'Se detaljer'}
            <svg className="w-4 h-4 ml-2" 
                 style={{ 
                   transition: 'transform 0.2s',
                   transform: 'translateX(0)' 
                 }} 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          {!isMinimal && (
            <button 
              style={{ 
                padding: '0.5rem',
                color: '#6b7280',
                borderRadius: '9999px'
              }}
              aria-label="Forhåndsvisning"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;