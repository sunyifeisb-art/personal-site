import Navigation from '../sections/Navigation'
import HeroSection from '../sections/HeroSection'
import ProjectsSection from '../sections/ProjectsSection'
import EducationSection from '../sections/EducationSection'
import AboutSection from '../sections/AboutSection'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0B1120] text-white overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <EducationSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
