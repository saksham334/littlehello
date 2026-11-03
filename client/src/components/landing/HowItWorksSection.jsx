// HowItWorksSection.jsx — three gentle steps, shown as cards.
// id="how-it-works" is the target of the navbar link "/#how-it-works".
import Doodle from '../brand/Doodle.jsx';

const STEPS = [
  {
    doodle: 'flower',
    title: 'Tell us a little',
    text: 'Pick your interests, how you like to chat, and the kind of friendship you’re hoping for. Share only what feels comfortable.',
  },
  {
    doodle: 'star',
    title: 'Meet people like you',
    text: 'Discover people who share your interests. Every suggestion tells you why. No swiping, no rankings.',
  },
  {
    doodle: 'bubbles',
    title: 'Send a little hello',
    text: 'Write a short, friendly note. If they say hello back, a private chat opens. Reply whenever you’re ready.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="lh-section lh-band" aria-labelledby="how-title">
      <div className="container">
        <header className="text-center mb-5">
          <p className="lh-eyebrow mb-2">How it works</p>
          <h2 id="how-title" className="lh-section-title">Three small steps</h2>
          <p className="text-soft mx-auto mt-3 mb-0" style={{ maxWidth: '34rem' }}>
            Go as slowly as you like. Nothing happens unless you choose it.
          </p>
        </header>

        {/* An ordered list, because the steps happen in order.
            1 column on phones, 3 side by side from 768px. */}
        <ol className="lh-steps row row-cols-1 row-cols-md-3 g-4">
          {STEPS.map((step, index) => (
            <li className="col" key={step.title}>
              <article className="lh-card lh-step">
                <div className="lh-step__art">
                  <Doodle name={step.doodle} size={60} />
                  <span className="lh-step__number" aria-hidden="true">
                    {index + 1}
                  </span>
                </div>
                <h3 className="lh-step__title">{step.title}</h3>
                <p className="lh-step__text">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>

        <p className="lh-note text-center mt-5 mb-0">
          No timers. No streaks. No “seen” receipts. Just people, at their own pace. ♡
        </p>
      </div>
    </section>
  );
}