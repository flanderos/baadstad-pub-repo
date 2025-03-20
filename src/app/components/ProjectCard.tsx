import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Definerer grensesnitt for prosjektdataene
interface Project {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  slug?: string;
  tags?: string[]; // Lagt til støtte for tags
}

// Definerer props med Project-interfacet
interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'minimal'; // Støtte for ulike varianter
}

// Funksjon for å generere slug hvis det ikke finnes en
const generateSlug = (title: string, id: number | string): string => {
  if (!title) return String(id);
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Fjerner spesialtegn
    .replace(/\s+/g, '-') // Erstatter mellomrom med bindestrek
    .replace(/--+/g, '-') // Reduserer flere bindestreker til én
    .trim();
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'default' }) => {
  // Beregner prosjektets URL
  const projectUrl = `/prosjekter/${project.slug || generateSlug(project.title, project.id)}`;
  
  // Bruk variant til å endre utseendet
  const isMinimal = variant === 'minimal';
  
  return (
    <div className={`group relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${isMinimal ? 'p-3' : ''}`} 
      style={{ backgroundColor: 'white' }}>
      {/* Vis bare bildet hvis det ikke er minimal variant */}
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
            // Placeholder-design med solid farge
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
          
          {/* Korrigert overlegg - Lagt til gradient-overlay-klassen som matches i CSS */}
          <div 
            className="gradient-overlay absolute inset-0 transition-opacity duration-300" 
            style={{ 
              opacity: 0,
              backgroundColor: 'rgba(0,0,0,0.4)'
            }}
          />
        </div>
      )}
      
      <div style={{ padding: isMinimal ? '0.75rem' : '1.25rem' }}>
        {/* Tag-liste med betinget stil */}
        {project.tags && project.tags.length > 0 && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem', 
            marginBottom: isMinimal ? '0.5rem' : '0.75rem' 
          }}>
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                style={{ 
                  display: 'inline-block',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  borderRadius: '9999px'
                }}
              >
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
        
        {/* Viser beskrivelse bare hvis det ikke er minimal variant */}
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
            <svg style={{ 
                   width: '1rem', 
                   height: '1rem', 
                   marginLeft: '0.5rem',
                   transition: 'transform 0.2s'
                 }} 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          {/* Ikonknapp bare i standard variant */}
          {!isMinimal && (
            <button 
              style={{ 
                padding: '0.5rem',
                color: '#6b7280',
                borderRadius: '9999px'
              }}
              aria-label="Forhåndsvisning"
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24" 
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* CSS for hover-effekten */}
      <style jsx>{`
        .group:hover .gradient-overlay {
          opacity: 1 !important;
        }
        
        @media (hover: none) {
          /* For enheter uten hover-støtte (touch-enheter) */
          .gradient-overlay {
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;