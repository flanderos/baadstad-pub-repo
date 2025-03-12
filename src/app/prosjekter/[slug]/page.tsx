// Fil: src/app/prosjekter/[slug]/page.tsx
// Dette er server-komponenten for prosjektsiden
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ClientProjectDetails from './ClientProjectDetails';

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

// Her bruker vi en eksportert type direkte
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
    title: `${project.title} | Rørleggermester Prosjekter`,
    description: project.description || project.content?.substring(0, 160) || '',
    openGraph: {
      title: project.title,
      description: project.description || '',
      images: project.image_url ? [{ url: project.image_url }] : [],
    },
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

// Funksjon for å hente galleribilder
async function getProjectImages(projectId: string): Promise<GalleryImage[]> {
  try {
    const supabase = createServerComponentClient({ cookies });
    
    const { data, error } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', projectId)
      .order('sort_order', { ascending: true });
      
    if (error) {
      console.error('❌ Feil ved henting av bilder:', error);
      return [];
    }
    
    return data as GalleryImage[];
  } catch (error) {
    console.error('❌ Exception i getProjectImages:', error);
    return [];
  }
}

// Server-side komponent som rendrer klient-komponenten
export default async function ProsjektDetaljerPage(props: Props) {
  const { params } = props;
  const project = await getProject(params.slug);
  
  if (!project) {
    notFound();
  }
  
  // Hent galleribilder
  const galleryImages = await getProjectImages(project.id);
  
  // Organiser bildene etter type
  const organizedImages = {
    gallery: galleryImages.filter(img => img.image_type === 'gallery'),
    before: galleryImages.filter(img => img.image_type === 'before'),
    after: galleryImages.filter(img => img.image_type === 'after')
  };
  
  // Sammenstill all data og send til klientkomponenten
  return <ClientProjectDetails project={project} galleryImages={organizedImages} />;
}