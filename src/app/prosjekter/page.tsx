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
  image?: string;
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
        console.log("🔄 Starter henting av prosjekter...");
        
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
        
        console.log("📂 Mottatt prosjekter:", data);
        setProjects(data || []);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ukjent feil oppsto';
        console.error("❌ Detaljert feil ved henting av data:", error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    // Kall funksjonen når komponenten monteres
    fetchProjects();
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

  // Viser lastestatus
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Laster prosjekter...</p>
      </div>
    );
  }

  // Viser feilmelding
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Våre prosjekter</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Det oppsto en feil ved henting av prosjekter: {error}</p>
        </div>
      </div>
    );
  }

  // Viser melding hvis ingen prosjekter
  if (!projects || projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Våre prosjekter</h1>
        <p>Ingen prosjekter funnet.</p>
      </div>
    );
  }

  // Formater prosjektdata for visning, legger til slug hvis det mangler
  const formattedProjects = projects.map(project => ({
    id: project.id,
    title: project.title,
    description: truncateDescription(stripHtml(project.content || project.description || "")),
    image: project.image,
    slug: project.slug || generateSlug(project.title, project.id) // Bruker eksisterende slug eller genererer en
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Våre prosjekter</h1>
      <p className="text-lg mb-8">
        Her er noen av prosjektene vi har jobbet med.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {formattedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProsjekterPage;