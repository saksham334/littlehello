// FeaturesSection.jsx — six reasons LittleHello feels calm and in your control.
import Doodle from '../brand/Doodle.jsx';

// Each feature gets a doodle and a soft tinted background, cycling through the palette.
const FEATURES = [
  {
    doodle: 'star',
    tint: 'var(--lh-peach-soft)',
    title: 'Find people who love what you love',
    text: 'Discover friends through shared interests, from cozy games to nature walks, not through looks or popularity.',
  },
  {
    doodle: 'bubbles',
    tint: 'var(--lh-blush-soft)',
    title: 'Introductions, not cold messages',
    text: 'Start with a short hello note. A chat only opens if they say hello back.',
  },
  {
    doodle: 'moon',
    tint: 'var(--lh-lilac-soft)',
    title: 'Reply whenever you’re ready',
    text: 'No read receipts, no “online now” dots, no timers. Take a day, or a week.',
  },
  {
    doodle: 'cloud',
    tint: 'var(--lh-peach-soft)',
    title: 'Share only what you want',
    text: 'Pronouns and bio are optional. Hide your profile from Discover whenever you need a break.',
  },
  {
    doodle: 'sparkle',
    tint: 'var(--lh-blush-soft)',
    title: 'Suggestions that explain themselves',
    text: 'Every suggestion tells you why, like shared hobbies or a similar chat style. No mystery rankings.',
  },
  {
    doodle: 'heart',
    tint: 'var(--lh-lilac-soft)',
    title: 'A place for everyone',
    text: 'Men, women, non-binary people and LGBTQ+ folks are all welcome. Friendship only, never dating pressure.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="lh-section" aria-labelledby="features-title">
      <div className="container">
        <header className="text-center mb-5">
          <p className="lh-eyebrow mb-2">Made for quiet people</p>
          <h2 id="features-title" className="lh-section-title">Friendship, at your own pace</h2>
          <p className="text-soft mx-auto mt-3 mb-0" style={{ maxWidth: '34rem' }}>
            Everything here is designed to feel calm, kind and completely in your control.
          </p>
        </header>

        {/* 1 column on phones, 2 on tablets, 3 on laptops */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {FEATURES.map((feature) => (
            <div className="col" key={feature.title}>
              <article className="lh-card lh-feature">
                <div className="lh-feature__art" style={{ background: feature.tint }}>
                  <Doodle name={feature.doodle} size={44} />
                </div>
                <h3 className="lh-feature__title">{feature.title}</h3>
                <p className="lh-feature__text">{feature.text}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}