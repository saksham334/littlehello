// HomePage.jsx — the LittleHello landing page.
// Each section is its own component, so this file reads like a table of contents.
import HeroSection from '../components/landing/HeroSection.jsx';
import HowItWorksSection from '../components/landing/HowItWorksSection.jsx';
import FeaturesSection from '../components/landing/FeaturesSection.jsx';
import SafetySection from '../components/landing/SafetySection.jsx';
import NeverSection from '../components/landing/NeverSection.jsx';
import FaqSection from '../components/landing/FaqSection.jsx';
import CtaSection from '../components/landing/CtaSection.jsx';
import '../styles/landing.css';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />   {/* id="how-it-works" · tinted band */}
      <FeaturesSection />
      <SafetySection />       {/* id="safety" · tinted band */}
      <NeverSection />
      <FaqSection />          {/* id="faq" · tinted band */}
      <CtaSection />
    </main>
  );
}