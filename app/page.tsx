'use client'
import Navigation from '@/components/navigation';

const Page = () => {
  return (
    <div>
      {/* Navigation component */}
      <Navigation />

      {/* Main content */}
      <main className="pt-20 px-4">
        <section id="about" className="py-16">
          <h2 className="text-3xl font-bold">À propos</h2>
          <p className="mt-4">Voici un peu plus d'informations sur moi...</p>
        </section>

        <section id="projects" className="py-16 bg-gray-100">
          <h2 className="text-3xl font-bold">Projets</h2>
          <p className="mt-4">Voici quelques-uns de mes projets récents...</p>
        </section>

        <section id="skills" className="py-16">
          <h2 className="text-3xl font-bold">Compétences</h2>
          <p className="mt-4">Je maîtrise plusieurs technologies...</p>
        </section>

        <section id="contact" className="py-16 bg-gray-100">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className="mt-4">Si vous souhaitez me contacter, vous pouvez utiliser...</p>
        </section>
      </main>
    </div>
  );
};

export default Page;
