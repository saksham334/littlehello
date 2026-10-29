// Avatar.jsx — a round doodle avatar.
// It's decorative because the person's name is always shown right next to it.
import Doodle from '../brand/Doodle.jsx';
import { AVATARS, DEFAULT_AVATAR } from '../../utils/avatars.js';

export default function Avatar({ avatarKey, size = '3.5rem', className = '' }) {
  // Unknown or missing key? Fall back to the default flower instead of crashing.
  const avatar = AVATARS[avatarKey] ?? AVATARS[DEFAULT_AVATAR];

  return (
    <span
      className={`lh-avatar ${className}`}
      // CSS custom properties can be set from React's style prop like this.
      style={{ '--size': size, '--from': avatar.from, '--to': avatar.to }}
      aria-hidden="true"
    >
      <Doodle name={avatar.doodle} />
    </span>
  );
}