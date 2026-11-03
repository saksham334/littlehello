// HomePage.jsx — the LittleHello landing page.
// Each section is its own component, so this file reads like a table of contents.
import HeroSection from '../components/landing/HeroSection.jsx';
import HowItWorksSection from '../components/landing/HowItWorksSection.jsx';
import '../styles/landing.css';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      {/* Part 4C: Features · Inclusion & safety · What we'll never do · FAQ · Final call to action */}
    </main>
  );
}