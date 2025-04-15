import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';

const Page = () => {
  return (
    <div className=''>
      <Navigation />
      <HeroSection />
      <AboutMeSection />
      <EducationSection />
      <ExperiencesSection />
      <ProjectsSection />
      <ContactSection />
      <ScrollToTop />
    </div>
  );
};

export default Page;
