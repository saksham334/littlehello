// ProfileCard.jsx — the friendship card used on Discover and the landing page.
//
// Deliberately NOT shown: likes, follower/friend counts, popularity, online
// status, age, location, or photos. Just who someone is and why you might click.
import Avatar from '../common/Avatar.jsx';
import InterestChip from '../common/InterestChip.jsx';
import Doodle from '../brand/Doodle.jsx';

const MAX_CHIPS = 5; // keep cards calm; the full list lives on the profile page

export default function ProfileCard({
  profile,
  sharedInterests = [],
  reasons = [],
  isDemo = false,
  onSayHello,
  helloSent = false,
  headingLevel = 'h3',
}) {
  const Heading = headingLevel;

  // Show shared interests first: they're the friendliest conversation openers.
  const sortedInterests = [...profile.interests].sort(
    (a, b) => sharedInterests.includes(b) - sharedInterests.includes(a),
  );
  const visible = sortedInterests.slice(0, MAX_CHIPS);
  const hiddenCount = sortedInterests.length - visible.length;

  return (
    <article className="lh-card lh-card--interactive lh-profile-card">
      <div className="lh-profile-card__banner">
        {isDemo && <span className="lh-profile-card__demo">Demo profile</span>}
        <Doodle name="sparkle" size={28} fill="#FFFFFF" className="lh-profile-card__banner-doodle" />
      </div>

      <div className="lh-profile-card__body">
        <Avatar avatarKey={profile.avatar} size="4.25rem" className="lh-profile-card__avatar" />

        <div>
          <Heading className="lh-profile-card__name">
            {profile.displayName}
            {profile.pronouns && <span className="lh-profile-card__pronouns">{profile.pronouns}</span>}
          </Heading>
          {profile.conversationStyle && (
            <p className="lh-profile-card__meta">
              <i className="bi bi-chat-dots me-1" aria-hidden="true"></i>
              {profile.conversationStyle}
            </p>
          )}
        </div>

        {profile.intro && <p className="lh-profile-card__intro">{profile.intro}</p>}

        {/* A list of chips is semantically a list, so screen readers announce "list, 5 items" */}
        <ul className="lh-profile-card__chips" aria-label="Interests">
          {visible.map((interest) => (
            <li key={interest}>
              <InterestChip label={interest} shared={sharedInterests.includes(interest)} />
            </li>
          ))}
          {hiddenCount > 0 && (
            <li>
              <span className="lh-chip">+{hiddenCount} more</span>
            </li>
          )}
        </ul>

        {reasons.length > 0 && (
          <div className="lh-why">
            <p className="lh-why__title">Why you might click</p>
            <ul>
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {onSayHello && (
          <div className="lh-profile-card__action">
            <button type="button" className="btn btn-berry w-100" onClick={onSayHello} disabled={helloSent}>
              {helloSent ? (
                <>
                  <i className="bi bi-check2-circle" aria-hidden="true"></i> Hello sent
                </>
              ) : (
                <>
                  <i className="bi bi-chat-heart" aria-hidden="true"></i> Say a little hello
                </>
              )}
              {/* Many cards = many identical buttons; this tells screen readers which one */}
              <span className="visually-hidden"> to {profile.displayName}</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}