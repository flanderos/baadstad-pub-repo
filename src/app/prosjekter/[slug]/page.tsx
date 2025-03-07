import React from 'react';
import { notFound } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import Image from 'next/image';

// Typer
interface Project {
  id: string;
  title: string;
  description: string;
  content?: string;
  image?: string;
  slug?: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

// Generer metadata dynamisk basert på prosjektdata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  console.log('⭐ generateMetadata starter - slug:', params.slug);
  const project = await getProject(params.slug);
  
  if (!project) {
    console.log('⭐ generateMetadata - prosjekt ikke funnet');
    return {
      title: 'Prosjekt ikke funnet',
    };
  }
  
  console.log('⭐ generateMetadata - prosjekt funnet:', project.title);
  return {
    title: `${project.title} | Min Nettside`,
    description: project.description || project.content?.substring(0, 160) || '',
  };
}

// Felles funksjon for å hente prosjekt (enten via slug eller ID)
async function getProject(slugOrId: string): Promise<Project | null> {
  console.log('🔍 getProject starter - søker etter:', slugOrId);
  
  try {
    // Oppretter Supabase-klienten for serverkomponenter
    console.log('🔄 Oppretter supabase-klient...');
    const supabase = createServerComponentClient({ cookies });
    console.log('✅ Supabase-klient opprettet');
    
    // Først, prøv å søke etter slug
    console.log('🔄 Søker først etter prosjekt med slug =', slugOrId);
    let { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slugOrId)
      .single();
    
    console.log('📊 Slug-søkeresultat:', { dataFunnet: !!data, error: error?.message });
      
    // Hvis ikke funnet via slug, sjekk om det er en UUID og søk med ID
    if (error) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(slugOrId);
      console.log('🔄 Slug ikke funnet, er det en UUID?', isUuid);
      
      if (isUuid) {
        console.log('🔄 Prøver å søke med ID =', slugOrId);
        const result = await supabase
          .from('projects')
          .select('*')
          .eq('id', slugOrId)
          .single();
        
        data = result.data;
        error = result.error;
        console.log('📊 ID-søkeresultat:', { dataFunnet: !!data, error: error?.message });
      }
    }
    
    // Prøv en tredje metode: søk i alle prosjekter for debugging
    if (error) {
      console.log('🔄 Siste forsøk: Henter alle prosjekter for å sjekke...');
      const { data: allProjects, error: listError } = await supabase
        .from('projects')
        .select('id, title, slug')
        .limit(10);
      
      console.log('📋 Alle prosjekter (opptil 10):', allProjects);
      console.log('📋 Listingsfeil:', listError?.message);
    }
    
    if (error) {
      console.error('❌ Feil ved henting av prosjekt:', error);
      return null;
    }
    
    console.log('✅ Prosjekt funnet:', data?.title);
    return data as Project;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ukjent feil';
    console.error('❌ Exception i getProject:', errorMessage);
    // Dump stack trace for å finne hvor feilen oppstår
    console.error('📚 Stack trace:', new Error().stack);
    return null;
  }
}

const ProsjektDetaljer = async ({ params }: PageProps) => {
  console.log('🚀 ProsjektDetaljer starter - slug:', params.slug);
  const project = await getProject(params.slug);
  
  // Hvis ikke funnet, vis 404-side
  if (!project) {
    console.log('❌ Prosjekt ikke funnet, viser 404-side');
    notFound();
  }
  
  console.log('✅ Rendering prosjekt:', project.title);
  
  // Formater HTML-innhold for visning hvis det finnes
  const contentHtml = project.content || project.description || '';
  
  console.log('📝 Innholdstype:', contentHtml.startsWith('<') ? 'HTML' : 'Ren tekst');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        
        {project.image && (
          <div className="relative h-80 w-full bg-gray-200 mb-8">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
        
        {!project.image && (
          <div className="relative h-80 w-full bg-gray-200 mb-8">
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Bilde ikke tilgjengelig</span>
            </div>
          </div>
        )}
        
        <div className="prose max-w-none">
          {/* Hvis innholdet er HTML, viser vi det som HTML */}
          {contentHtml.startsWith('<') ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            <p className="text-lg">{contentHtml}</p>
          )}
        </div>
        
        <div className="mt-12">
          <a 
            href="/prosjekter" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            ← Tilbake til prosjekter
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProsjektDetaljer;