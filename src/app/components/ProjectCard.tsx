import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Definerer grensesnitt for prosjektdataene
interface Project {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  slug?: string; // Lagt til slug-felt
}

// Definerer props med Project-interfacet
interface ProjectCardProps {
  project: Project;
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

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full bg-gray-200">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          // Placeholder når bilde ikke er tilgjengelig
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Bilde</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <Link 
          href={`/prosjekter/${project.slug || generateSlug(project.title, project.id)}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Se detaljer
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;