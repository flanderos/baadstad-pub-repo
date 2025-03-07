import ProjectCard from '@/app/components/ProjectCard';

export const metadata = {
  title: 'Prosjekter | Min Nettside',
  description: 'Se våre tidligere prosjekter',
}

// Dette ville normalt hentes fra Supabase
const dummyProjects = [
  {
    id: 1,
    title: 'Prosjekt 1',
    description: 'Beskrivelse av prosjekt 1',
    image: '/images/project1.jpg',
  },
  {
    id: 2,
    title: 'Prosjekt 2',
    description: 'Beskrivelse av prosjekt 2',
    image: '/images/project2.jpg',
  },
  {
    id: 3,
    title: 'Prosjekt 3',
    description: 'Beskrivelse av prosjekt 3',
    image: '/images/project3.jpg',
  },
];

const ProsjekterPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Våre prosjekter</h1>
      <p className="text-lg mb-8">
        Her er noen av prosjektene vi har jobbet med. Disse vil senere bli hentet fra Supabase.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProsjekterPage;