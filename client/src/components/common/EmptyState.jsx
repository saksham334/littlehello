// EmptyState.jsx — what we show when a list is empty ("No hellos yet").
// An empty screen is a moment to be kind, not a dead end: a doodle,
// a gentle sentence, and (optionally) one clear next step.
//
// Usage:
//   <EmptyState doodle="cloud" title="No hellos yet" action={<Link ...>Discover</Link>}>
//     When someone says hello, it'll wait for you here. No rush.
//   </EmptyState>
import Doodle from '../brand/Doodle.jsx';

export default function EmptyState({ doodle = 'cloud', title, children, action, headingLevel = 'h2' }) {
  const Heading = headingLevel; // lets each page keep its heading order correct

  return (
    <div className="lh-empty">
      <div className="lh-empty__art">
        <Doodle name={doodle} size={88} className="lh-float" />
        <Doodle name="sparkle" size={26} className="lh-empty__sparkle" />
      </div>
      <Heading className="lh-empty__title">{title}</Heading>
      {children && <p className="text-soft">{children}</p>}
      {action}
    </div>
  );
}