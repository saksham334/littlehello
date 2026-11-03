// FaqSection.jsx — an accessible accordion (no Bootstrap JS needed).
// id="faq" is the target of the navbar link "/#faq".
import { useId, useState } from 'react';

const FAQS = [
  {
    q: 'Is LittleHello a dating app?',
    a: 'No. LittleHello is only for platonic friendship. There’s no romantic matching, and keeping things platonic is part of our community guidelines.',
  },
  {
    q: 'Who can join?',
    a: 'Any adult aged 18 or older. Everyone is welcome: all genders, LGBTQ+ folks, introverts, newcomers, and anyone who prefers a quieter way to meet people.',
  },
  {
    q: 'Do I have to reply quickly?',
    a: 'Never. There are no timers or streaks, and nobody is told when you’ve read their message. Reply tomorrow, next week, or whenever you feel ready.',
  },
  {
    q: 'Can people see when I’m online?',
    a: 'No. LittleHello has no “online now” indicator and no read receipts.',
  },
  {
    q: 'What’s shown on my profile?',
    a: 'Only what you choose: your display name, interests, conversation style and, if you like, pronouns and a short intro. Your email and birth date always stay private.',
  },
  {
    q: 'How are people suggested to me?',
    a: 'With simple, transparent rules based on shared interests, conversation style, languages and friendship goals. Each suggestion explains why. We never use looks or popularity.',
  },
  {
    q: 'What if someone makes me uncomfortable?',
    a: 'You can block them, which quietly hides you from each other everywhere, and report the person or a specific message so it can be reviewed.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. LittleHello is a small independent project, currently being tested with a small group of invited adults.',
  },
  {
    q: 'Can I delete my account?',
    a: 'Yes, anytime, from Settings. Deleting your account removes your profile, hellos and messages.',
  },
];

export default function FaqSection() {
  // useId gives a unique, stable prefix, so the aria ids never clash with anything else.
  const baseId = useId();
  // Which questions are open (by index). The first one starts open as a hint.
  const [openItems, setOpenItems] = useState(() => new Set([0]));

  function toggle(index) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section id="faq" className="lh-section lh-band" aria-labelledby="faq-title">
      <div className="container">
        <header className="text-center mb-5">
          <p className="lh-eyebrow mb-2">FAQ</p>
          <h2 id="faq-title" className="lh-section-title">Questions, gently answered</h2>
        </header>

        <div className="lh-faq mx-auto">
          {FAQS.map((item, index) => {
            const isOpen = openItems.has(index);
            const buttonId = `${baseId}-question-${index}`;
            const panelId = `${baseId}-answer-${index}`;

            return (
              <div className={`lh-faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <h3 className="lh-faq__question">
                  <button
                    type="button"
                    id={buttonId}
                    className="lh-faq__button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.q}</span>
                    <span className="lh-faq__chevron" aria-hidden="true">
                      <i className="bi bi-chevron-down"></i>
                    </span>
                  </button>
                </h3>

                {/* hidden removes the answer from view AND from screen readers when closed */}
                <div id={panelId} role="region" aria-labelledby={buttonId} className="lh-faq__answer" hidden={!isOpen}>
                  <p className="mb-0">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}