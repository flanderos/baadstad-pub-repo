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
  
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
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
          // Moderne placeholder-design
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 flex items-center justify-center">
            <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Overlegg med gradient effekt */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5">
        {/* Tag-liste (hvis tilgjengelig) */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag, index) => (
              <span key={index} className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2 text-blue-950 dark:text-white transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            href={projectUrl}
            className="inline-flex items-center px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Se detaljer
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          {/* Ikonknapp for rask forhåndsvisning (for UX-forbedring) */}
          <button 
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Forhåndsvisning"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;