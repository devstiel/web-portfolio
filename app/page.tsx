import Navbar from '@/components/Navbar/Navbar';
import HeroDashboard from '@/components/HeroDashboard/HeroDashboard';
import AboutWindow from '@/components/AboutWindow/AboutWindow';
import ExperienceArchive from '@/components/ExperienceArchive/ExperienceArchive';
import SkillsInventory from '@/components/SkillsInventory/SkillsInventory';
import ProjectsGallery from '@/components/ProjectsGallery/ProjectsGallery';
import SocialContact from '@/components/SocialContact/SocialContact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroDashboard />
        <AboutWindow />
        <ExperienceArchive />
        <SkillsInventory />
        <ProjectsGallery />
        <SocialContact />
      </main>
      <Footer />
    </>
  );
}
