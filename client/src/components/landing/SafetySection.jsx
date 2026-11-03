// SafetySection.jsx — who's welcome, community guidelines, and the safety tools.
// id="safety" is the target of the navbar link "/#safety".
//
// ⚠️ Every tool listed here must really work before testers see the site
//    (checked in Milestone 16). Don't add promises we haven't built.

const GUIDELINES = [
  'Be kind and patient: everyone moves at their own pace.',
  'Keep it platonic. LittleHello isn’t for dating.',
  'A “no thanks” or no reply is okay. Please don’t push.',
  'No harassment, hate or discrimination of any kind.',
];

const TOOLS = [
  {
    icon: 'bi-envelope-heart',
    title: 'Hello first, chat second',
    text: 'Nobody can message you until you accept their hello.',
  },
  {
    icon: 'bi-slash-circle',
    title: 'Block anytime',
    text: 'Blocking quietly hides you from each other everywhere. They aren’t notified.',
  },
  {
    icon: 'bi-flag',
    title: 'Report people or messages',
    text: 'If something feels wrong, tell us. Reports are private.',
  },
  {
    icon: 'bi-shield-lock',
    title: 'Private by default',
    text: 'Your email and birth date are never shown to anyone.',
  },
  {
    icon: 'bi-person-check',
    title: 'Adults only',
    text: 'LittleHello is for people 18 and over, checked when you sign up.',
  },
  {
    icon: 'bi-eye-slash',
    title: 'Take a break',
    text: 'Hide your profile from Discover whenever you like, and come back anytime.',
  },
];

export default function SafetySection() {
  return (
    <section id="safety" className="lh-section lh-band" aria-labelledby="safety-title">
      <div className="container">
        <div className="row g-5 align-items-start">
          {/* ---- Inclusion + guidelines ---- */}
          <div className="col-lg-5">
            <p className="lh-eyebrow mb-2">Inclusion &amp; safety</p>
            <h2 id="safety-title" className="lh-section-title">Everyone is welcome here</h2>
            <p className="mt-3">
              LittleHello is for anyone who wants genuine, platonic friendship: introverts, shy and socially anxious
              people, newcomers to a city, and anyone who’s tired of loud social apps.
            </p>
            <p className="text-soft">
              People of every gender, including men, women and non-binary people, and the whole LGBTQ+ community are
              warmly welcome. You belong here exactly as you are.
            </p>

            <div className="lh-card lh-guidelines mt-4">
              <p className="lh-guidelines__title">Our little guidelines</p>
              <ul>
                {GUIDELINES.map((rule) => (
                  <li key={rule}>
                    <i className="bi bi-check2-circle" aria-hidden="true"></i>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Safety tools ---- */}
          <div className="col-lg-7">
            <h3 className="h5 font-ui mb-3">Tools that keep you in control</h3>
            <ul className="row row-cols-1 row-cols-sm-2 g-3 list-unstyled mb-0">
              {TOOLS.map((tool) => (
                <li className="col" key={tool.title}>
                  <div className="lh-card lh-tool">
                    <span className="lh-tool__icon" aria-hidden="true">
                      <i className={`bi ${tool.icon}`}></i>
                    </span>
                    <div>
                      <h4 className="lh-tool__title">{tool.title}</h4>
                      <p className="lh-tool__text">{tool.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}