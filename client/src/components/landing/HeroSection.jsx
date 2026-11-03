// HeroSection.jsx - the fiorst screen of the landing page.
// Goal: in ~3 seconds, say "safe, gentle, low-pressure friendship".
import { Link } from 'react-router';
import DoodleScatter from '../brand/DoodleScatter.jsx';
import Doodle from '../brand/Doodle.jsx';
import ProfileCard from '../profile/ProfileCard.jsx';
import { DEMO_PROFILES, DEMO_MY_INTERESTS } from '../../utils/demoData.js'

const HERO_DOODLES = [
  { name: 'flower', size: 56, top: '7%', left: '3%', rotate: -12 },
  { name: 'star', size: 38, top: '5%', right: '6%', rotate: 14, delay: 1.2 },
  { name: 'heart', size: 34, bottom: '6%', left: '6%', rotate: -8, delay: 2, hideOnMobile: true },
  { name: 'sparkle', size: 26, top: '42%', left: '46%', delay: 1.6, hideOnMobile: true },
  { name: 'cloud', size: 70, bottom: '4%', right: '4%', delay: 0.6, hideOnMobile: true },
];

// Works out shared interests + plain-language reasons for a demo card.
// (In Milestone 11 the server's recommendation engine will do this for real.)
function demoMatch(profile) {
  const shared = profile.interests.filter((interest) => DEMO_MY_INTERESTS.includes(interest));
  const reasons = [shared.length > 0 && `You both like ${shared.join(' and ')}`, 'You both enjoy unhurried chats'].filter(
    Boolean,
  );
  return { shared, reasons };
}

export default function HeroSection() {
  const [front, back] = DEMO_PROFILES; // array destructuring: first and second profiles
  const frontMatch = demoMatch(front);
  const backMatch = demoMatch(back);

  return (
    <section className="lh-hero" aria-labelledby="hero-title">
      <DoodleScatter items={HERO_DOODLES} />

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          {/* ---- Left (laptop) / top (phone): words ---- */}
          <div className="col-lg-6 text-center text-lg-start">
            <p className="lh-hero__eyebrow mb-0">
              <Doodle name="flower" size={18} /> A friendship space for quiet people
            </p>

            <h1 id="hero-title" className="lh-hero__title">
              Small hellos.
              <br />
              <span className="lh-hero__highlight">Real friendships.</span>
            </h1>

            <p className="lh-hero__intro mx-auto mx-lg-0">
              LittleHello helps shy, introverted and socially anxious adults find platonic friends through shared
              interests: slowly, gently, and with zero pressure. You don’t have to be loud to belong.
            </p>

            <div className="lh-hero__actions">
              <Link to="/register" className="btn btn-berry btn-lg">
                <i className="bi bi-flower1" aria-hidden="true"></i> Join LittleHello
              </Link>
              <Link to="/#how-it-works" className="btn btn-soft btn-lg">
                See how it works
              </Link>
            </div>

            <ul className="lh-hero__promises">
              <li>
                <i className="bi bi-gift" aria-hidden="true"></i>Free to join
              </li>
              <li>
                <i className="bi bi-person-check" aria-hidden="true"></i>Adults 18+ only
              </li>
              <li>
                <i className="bi bi-eye-slash" aria-hidden="true"></i>No public likes or counts
              </li>
            </ul>
          </div>

          {/* ---- Right (laptop) / bottom (phone): preview ---- */}
          <div className="col-lg-6">
            <div className="lh-hero__preview" role="group" aria-label="Example profile cards (demo, not real people)">
              {/* Back card: only on laptops, so phones stay uncluttered */}
              <div className="lh-hero__card--back d-none d-lg-block" aria-hidden="true">
                <ProfileCard
                  profile={back}
                  isDemo
                  sharedInterests={backMatch.shared}
                  reasons={backMatch.reasons}
                  headingLevel="p"
                />
              </div>

              <div className="lh-hero__card">
                <ProfileCard
                  profile={front}
                  isDemo
                  sharedInterests={frontMatch.shared}
                  reasons={frontMatch.reasons}
                  headingLevel="p"
                />
              </div>

              <div className="lh-hello-note">
                <p className="lh-hello-note__label">A little hello · demo</p>
                <p className="lh-hello-note__text">
                  Hi Mira! I saw you like tea and books too 🍵📚 Any cozy reads you’d recommend? No rush to reply!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}