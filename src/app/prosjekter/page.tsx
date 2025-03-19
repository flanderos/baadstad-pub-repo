'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/app/components/ProjectCard';
import supabase from '@/app/lib/supabase';

// TypeScript grensesnitt for prosjekt
interface Project {
  id: number;
  title: string;
  description: string;
  content?: string;
  image_url?: string;
  company_id?: string;
  created_at?: string;
  slug?: string; // Lagt til støtte for slug
}

const ProsjekterPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // Funksjon for å hente prosjekter
    async function fetchProjects() {
      try {
        setLoading(true);
      
        
        // Hent miljøvariabel for company_id
        const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;
        
        // Hent prosjekter for den spesifikke company_id
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("company_id", companyId)
          .order("created_at", { ascending: false });
        
        if (error) {
          console.error("❌ Feil ved henting av prosjekter:", error);
          setError(error.message);
          return;
        }
        
        
        setProjects(data || []);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ukjent feil oppsto';
        console.error("❌ Detaljert feil ved henting av data:", error);
        setError(errorMessage);
      } finally {
        setLoading(false);
        // Kort forsinkelse før animasjonene starter, så alt er klart
        setTimeout(() => {
          // Animerer alle prosjektkortene ved innlasting
          const cards = document.querySelectorAll('.project-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('card-visible');
            }, index * 60); // Staggered effekt basert på kortets indeks
          });
        }, 100);
      }
    }

    // Kall funksjonen når komponenten monteres
    fetchProjects();
    
    // Aktiverer animasjoner ved innlasting
    document.body.classList.add('projects-page-loaded');
    
    return () => {
      document.body.classList.remove('projects-page-loaded');
    };
  }, []);

  const stripHtml = (html: string): string => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const truncateDescription = (text: string, maxLength: number = 200): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Generer en slug fra tittel hvis det mangler
  const generateSlug = (title: string, id: number | string): string => {
    if (!title) return String(id);
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Fjerner spesialtegn
      .replace(/\s+/g, '-') // Erstatter mellomrom med bindestrek
      .replace(/--+/g, '-') // Reduserer flere bindestreker til én
      .trim();
  };

  // Viser lastestatus med animasjon
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="loading-spinner"></div>
        <p className="mt-4 text-blue-950 animate-pulse">Laster prosjekter...</p>
      </div>
    );
  }

  // Viser feilmelding med animasjon
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-blue-950 animate-fade-in">
        <h1 className="text-4xl font-bold mb-6 text-blue-950 animate-slide-down">Våre prosjekter</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded animate-shake">
          <p>Det oppsto en feil ved henting av prosjekter: {error}</p>
        </div>
      </div>
    );
  }

  // Viser melding hvis ingen prosjekter
  if (!projects || projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-6 text-blue-950 animate-slide-down">Våre prosjekter</h1>
        <p className="animate-fade-in-delay">Ingen prosjekter funnet.</p>
      </div>
    );
  }

  // Formater prosjektdata for visning, legger til slug hvis det mangler
  const formattedProjects = projects.map(project => ({
    id: project.id,
    title: project.title,
    description: truncateDescription(stripHtml(project.content || project.description || "")),
    image: project.image_url,
    slug: project.slug || generateSlug(project.title, project.id) // Bruker eksisterende slug eller genererer en
  }));

  return (
    <div className="container mx-auto px-4 py-12 mt-16 content-ready">
      <h1 className="text-4xl font-bold mb-6 text-blue-950 animate-header">Våre prosjekter</h1>
      <div className="w-24 h-1 bg-blue-400 mb-8 animate-line"></div>
      <p className="text-lg mb-8 animate-text">
        Her er noen av prosjektene vi har jobbet med.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {formattedProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-card opacity-0 transform translate-y-8"
            style={{ transitionDelay: `${index * 0.02}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      
      {/* CSS-animasjoner */}
      <style jsx global>{`
        /* Basis-animasjoner */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes lineExpand {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        /* Loading spinner */
        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #1e40af;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        
        /* Header animasjon - enda raskere */
        .animate-header {
          opacity: 0;
          animation: slideDown 0.3s ease-out forwards;
        }
        
        /* Linje animasjon - enda raskere */
        .animate-line {
          width: 0;
          opacity: 0;
          animation: lineExpand 0.3s ease-out 0.1s forwards, fadeIn 0.3s ease-out 0.1s forwards;
        }
        
        /* Tekst animasjon - enda raskere */
        .animate-text {
          opacity: 0;
          animation: fadeIn 0.3s ease-out 0.2s forwards;
        }
        
        /* Feilmelding animasjon */
        .animate-shake {
          animation: shake 0.8s ease-out;
        }
        
        /* Prosjektkort animasjoner - superkjapp */
        .project-card {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.2s ease-out, transform 0.2s ease-out;
        }
        
        .card-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Forsinkede animasjoner */
        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.2s forwards;
        }
        
        /* Generell fade-in */
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProsjekterPage;