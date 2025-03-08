import React from 'react';
import { notFound } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Typer
interface Project {
  id: string;
  title: string;
  description: string;
  content?: string;
  image?: string;
  slug?: string;
}

// Her bruker vi en eksportert type direkte, uten våre egne grensesnitt
export type Props = {
  params: { slug: string };
  searchParams?: Record<string, string | string[]>;
};

// Generer metadata dynamisk basert på prosjektdata
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
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

// Felles funksjon for å hente prosjekt
async function getProject(slugOrId: string): Promise<Project | null> {
  console.log('🔍 getProject starter - søker etter:', slugOrId);
  
  try {
    const supabase = createServerComponentClient({ cookies });
    
    // Først, prøv å søke etter slug
    let { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slugOrId)
      .single();
      
    // Hvis ikke funnet via slug, sjekk om det er en UUID
    if (error) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(slugOrId);
      
      if (isUuid) {
        const result = await supabase
          .from('projects')
          .select('*')
          .eq('id', slugOrId)
          .single();
        
        data = result.data;
        error = result.error;
      }
    }
    
    if (error) {
      console.error('❌ Feil ved henting av prosjekt:', error);
      return null;
    }
    
    return data as Project;
  } catch (error) {
    console.error('❌ Exception i getProject:', error);
    return null;
  }
}

// Denne funksjonen mottar props direkte fra Next.js
// Vi bruker ikke vårt eget page props interface
export default async function ProsjektDetaljer(props: Props) {
  const { params } = props;
  console.log('🚀 ProsjektDetaljer starter - slug:', params.slug);
  const project = await getProject(params.slug);
  
  if (!project) {
    notFound();
  }
  
  const contentHtml = project.content || project.description || '';
  
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
          <div className="h-80 w-full bg-gray-200 mb-8 flex items-center justify-center">
            <span className="text-gray-500">Bilde ikke tilgjengelig</span>
          </div>
        )}
        
        <div className="prose max-w-none">
          {contentHtml.startsWith('<') ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            <p className="text-lg">{contentHtml}</p>
          )}
        </div>
        
        <div className="mt-12">
          <Link
            href="/prosjekter" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
            ← Tilbake til prosjekter
            </Link>
        </div>
      </div>
    </div>
  );
}