// StyleGuidePage.jsx — a living catalog of the LittleHello design system.
// Designers and developers use pages like this to check every component in
// one place. It's also a great portfolio piece. Route: /styleguide
import { useState } from 'react';
import { Link } from 'react-router';
import Logo from '../components/brand/Logo.jsx';
import Doodle, { DOODLE_NAMES } from '../components/brand/Doodle.jsx';
import DoodleScatter from '../components/brand/DoodleScatter.jsx';
import Avatar from '../components/common/Avatar.jsx';
import InterestChip from '../components/common/InterestChip.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ProfileCard from '../components/profile/ProfileCard.jsx';
import { AVATARS } from '../utils/avatars.js';
import { DEMO_PROFILES, DEMO_MY_INTERESTS } from '../utils/demoData.js';
import '../styles/styleguide.css';
import ApiStatus from '../components/common/ApiStatus.jsx';
const SWATCHES = [
  { name: 'Cloud Cream', hex: '#FFF9F2', use: 'Main background' },
  { name: 'Peach', hex: '#FFD6C2', use: 'Decoration, warm gradients' },
  { name: 'Blush Pink', hex: '#FFB7C5', use: 'Hearts, highlights' },
  { name: 'Lilac Pink', hex: '#F5C6E8', use: 'Secondary highlights' },
  { name: 'Berry', hex: '#A85D79', use: 'Buttons, accents, large text' },
  { name: 'Berry Ink', hex: '#8E4562', use: 'Small berry text (6.3:1)' },
  { name: 'Plum Text', hex: '#4A3540', use: 'Body text (10.7:1)' },
];

const SAMPLE_INTERESTS = ['Reading 📚', 'Tea 🍵', 'Cozy games 🎮', 'Nature walks 🌳', 'Drawing ✏️', 'Lo-fi music 🎧'];

// The floating doodles around the hero preview
const HERO_DOODLES = [
  { name: 'flower', size: 64, top: '12%', left: '6%', rotate: -12 },
  { name: 'star', size: 44, top: '10%', right: '10%', rotate: 14, delay: 1.2 },
  { name: 'cloud', size: 78, bottom: '10%', left: '12%', delay: 0.6, hideOnMobile: true },
  { name: 'heart', size: 40, bottom: '16%', right: '8%', rotate: 10, delay: 2 },
  { name: 'sparkle', size: 30, top: '48%', right: '22%', delay: 1.6, hideOnMobile: true },
];

export default function StyleGuidePage() {
  // A Set holds the selected chip labels: fast "is it selected?" checks.
  const [selected, setSelected] = useState(() => new Set(['Tea 🍵']));
  // Which demo cards have "sent" a hello (local only; nothing is saved).
  const [sentTo, setSentTo] = useState(() => new Set());

  function toggleInterest(label) {
    setSelected((prev) => {
      const next = new Set(prev); // never mutate state directly: copy, then change
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function sayHello(id) {
    setSentTo((prev) => new Set(prev).add(id));
  }

  return (
        <main className="container py-5">
      <header className="mb-5 d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div>
          <p className="lh-eyebrow mb-1">Design system</p>
          <h1 className="lh-section-title mb-0">LittleHello style guide</h1>
        </div>
        <Link to="/" className="btn btn-ghost">
          <i className="bi bi-arrow-left" aria-hidden="true"></i> Back home
        </Link>
      </header>

      {/* ---- Developer check ---------------------------------------- */}
      <div className="mb-5">
        <ApiStatus />
      </div>

      {/* ---- Hero preview -------------------------------------------- */}
      <section className="lh-card position-relative overflow-hidden text-center sg-hero mb-5" aria-labelledby="sg-hero">
        <DoodleScatter items={HERO_DOODLES} />
        <div className="position-relative">
          <Logo size="lg" />
          <h2 id="sg-hero" className="font-hand hero-title mt-3 mb-2">Small hellos. Real friendships.</h2>
          <p className="lead text-soft mx-auto" style={{ maxWidth: '32rem' }}>
            A gentle place for shy, quiet and introverted people to make friends at their own pace.
          </p>
          <p className="lh-note mb-0">no pressure, just people ♡</p>
        </div>
      </section>

      {/* ---- Colors ------------------------------------------------------ */}
      <section className="mb-5" aria-labelledby="sg-colors">
        <h2 id="sg-colors" className="h4 mb-3">Colors</h2>
        {/* 2 per row on phones, 3 on small tablets, 4 on laptops */}
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-3">
          {SWATCHES.map((swatch) => (
            <div className="col" key={swatch.hex}>
              <div className="sg-swatch">
                <div className="sg-swatch__color" style={{ background: swatch.hex }}></div>
                <div className="p-2">
                  <p className="fw-bold mb-0 small">{swatch.name}</p>
                  <code className="small">{swatch.hex}</code>
                  <p className="text-soft small mb-0">{swatch.use}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Typography ------------------------------------------------- */}
      <section className="lh-card p-4 mb-5" aria-labelledby="sg-type">
        <h2 id="sg-type" className="h4 mb-3">Typography</h2>
        <p className="lh-eyebrow mb-1">Caveat — headings &amp; short feelings</p>
        <p className="font-hand hero-title mb-3">Take your time.</p>
        <p className="lh-section-title mb-4">Find your people</p>
        <p className="lh-eyebrow mb-1">Nunito — everything you read</p>
        <p className="mb-4" style={{ maxWidth: '40rem' }}>
          LittleHello has no likes, no follower counts and no streaks. You can reply tomorrow, next week, or whenever
          you feel ready. Friendship isn’t a race.
        </p>
        <p className="lh-eyebrow mb-1">Quicksand — buttons, labels, navigation</p>
        <p className="font-ui mb-0">Discover · Hellos · Messages · Profile</p>
      </section>

      {/* ---- Buttons ----------------------------------------------------- */}
      <section className="mb-5" aria-labelledby="sg-buttons">
        <h2 id="sg-buttons" className="h4 mb-3">Buttons</h2>
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <button type="button" className="btn btn-berry btn-lg">
            <i className="bi bi-flower1" aria-hidden="true"></i> Join LittleHello
          </button>
          <button type="button" className="btn btn-berry">Say a little hello</button>
          <button type="button" className="btn btn-soft">How it works</button>
          <button type="button" className="btn btn-outline-berry">Edit profile</button>
          <button type="button" className="btn btn-ghost">Skip for now</button>
          <button type="button" className="btn btn-berry" disabled>Disabled</button>
        </div>
      </section>

      {/* ---- Chips ------------------------------------------------------- */}
      <section className="mb-5" aria-labelledby="sg-chips">
        <h2 id="sg-chips" className="h4 mb-1">Interest chips</h2>
        <p className="text-soft mb-3">
          Tap to select. Selected: {selected.size === 0 ? 'none yet' : [...selected].join(', ')}
        </p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {SAMPLE_INTERESTS.map((label) => (
            <InterestChip key={label} label={label} selected={selected.has(label)} onToggle={() => toggleInterest(label)} />
          ))}
        </div>
        <div className="d-flex flex-wrap gap-2">
          <InterestChip label="Tea 🍵" shared />
          <InterestChip label="Journaling" />
        </div>
      </section>

      {/* ---- Doodles & avatars ------------------------------------------ */}
      <section className="row g-4 mb-5">
        <div className="col-lg-7">
          <div className="lh-card p-4 h-100">
            <h2 className="h4 mb-3">Doodles</h2>
            <div className="d-flex flex-wrap gap-4 align-items-end">
              {DOODLE_NAMES.map((name) => (
                <figure className="text-center mb-0" key={name}>
                  <Doodle name={name} size={56} />
                  <figcaption className="small text-soft mt-1">{name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="lh-card p-4 h-100">
            <h2 className="h4 mb-3">Doodle avatars</h2>
            <div className="d-flex flex-wrap gap-3">
              {Object.entries(AVATARS).map(([key, avatar]) => (
                <figure className="text-center mb-0" key={key}>
                  <Avatar avatarKey={key} />
                  <figcaption className="small text-soft mt-2">{avatar.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Profile cards ---------------------------------------------- */}
      <section className="mb-5" aria-labelledby="sg-cards">
        <h2 id="sg-cards" className="h4 mb-1">Profile cards</h2>
        <p className="text-soft mb-3">Demo profiles only. These are not real people, and nothing here is saved.</p>
        {/* 1 column on phones, 2 on tablets, 3 on laptops */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          {DEMO_PROFILES.map((profile) => {
            const shared = profile.interests.filter((i) => DEMO_MY_INTERESTS.includes(i));
            const reasons = [
              shared.length > 0 && `You both like ${shared.join(' and ')}`,
              'You both prefer unhurried chats',
            ].filter(Boolean); // removes the "false" if nothing is shared

            return (
              <div className="col" key={profile.id}>
                <ProfileCard
                  profile={profile}
                  isDemo
                  sharedInterests={shared}
                  reasons={reasons}
                  onSayHello={() => sayHello(profile.id)}
                  helloSent={sentTo.has(profile.id)}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- Empty state, forms, alerts -------------------------------- */}
      <section className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="lh-card h-100 d-flex align-items-center">
            <EmptyState
              title="No hellos yet"
              action={<button type="button" className="btn btn-soft">Discover people</button>}
            >
              When someone says hello, it’ll wait for you here. There’s no rush.
            </EmptyState>
          </div>
        </div>
        <div className="col-md-6">
          <form className="lh-card p-4 h-100" onSubmit={(e) => e.preventDefault()} noValidate>
            <h2 className="h4 mb-3">Form elements</h2>
            <div className="mb-3">
              <label htmlFor="sg-name" className="form-label">Display name</label>
              <input id="sg-name" className="form-control" placeholder="What should friends call you?" />
              <div className="form-text">You can change this anytime.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="sg-email" className="form-label">Email</label>
              <input
                id="sg-email"
                type="email"
                className="form-control is-invalid"
                defaultValue="hello@"
                aria-invalid="true"
                aria-describedby="sg-email-error"
              />
              <div id="sg-email-error" className="invalid-feedback">
                That email looks incomplete. Could you check it?
              </div>
            </div>
            <div className="form-check mb-3">
              <input id="sg-check" className="form-check-input" type="checkbox" defaultChecked />
              <label htmlFor="sg-check" className="form-check-label">Show my profile in Discover</label>
            </div>
            <div className="lh-alert lh-alert--success mb-2" role="status">
              <i className="bi bi-check-circle-fill" aria-hidden="true"></i> Saved! Your profile is up to date.
            </div>
            <div className="lh-alert lh-alert--error" role="alert">
              <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i> We couldn’t save that. Please try again.
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}