import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';

const Page = () => {
  return (
    <div className=''>
      <Navigation />
      <HeroSection />
      <AboutMeSection />
      <EducationSection />
      <ExperiencesSection />
      <ProjectsSection />
    </div>
  );
};

export default Page;
