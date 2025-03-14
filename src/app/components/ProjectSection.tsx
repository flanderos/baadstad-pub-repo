'use client';

import { useEffect, useState } from 'react';
/* import ProjectCard from '@/app/components/ProjectCard'; */
import supabase from '@/app/lib/supabase';
import SectionDivider from'./ui/SectionDivider';
import Image from 'next/image';


// TypeScript-grensesnitt for prosjekter
interface Project {
  id: number;
  title: string;
  description?: string;
  content?: string;
  image_url?: string;
  slug?: string;
}

const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;
        
        if (!companyId) {
          console.error("❌ Feil: NEXT_PUBLIC_COMPANY_ID er undefined!");
          setError("NEXT_PUBLIC_COMPANY_ID mangler.");
          return;
        }
    
    
        
        const { data, error, status } = await supabase
          .from("projects")
          .select("id, title, content, image_url, slug")
          .eq("company_id", companyId)
          .order("created_at", { ascending: false })
          .limit(3);
    
        if (error) {
          console.error(`❌ Feil ved henting av prosjekter (status: ${status}):`, error);
          throw error;
        }
    
       
        setProjects(data || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ukjent feil oppsto");
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  const stripHtml = (html?: string): string => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const truncateDescription = (text?: string, maxLength: number = 180) => 
    text && text.length > maxLength ? text.substring(0, maxLength) + "..." : text || "Ingen beskrivelse tilgjengelig.";

  if (loading) return <p className="text-center py-16 text-lg">Laster prosjekter...</p>;
  if (error) return <p className="text-center text-red-500 py-16">{error}</p>;
  if (projects.length === 0) return <p className="text-center py-16">Ingen prosjekter funnet.</p>;

  return (
    <div>
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
        Våre Prosjekter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full h-40 mb-4">
              <Image 
                src={project.image_url || "/placeholder.jpg"} // Fallback hvis bildet mangler
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {truncateDescription(stripHtml(project.description || project.content))}
            </p>
            <a href={`/prosjekter/${project.slug}`} className="text-blue-950 dark:text-blue-400 font-semibold hover:underline">
              Les mer →
            </a>
          </div>
        ))}
      </div>
    </section>
    <SectionDivider /> 
    </div>
  );
};

export default ProjectSection;