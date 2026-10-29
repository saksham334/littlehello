// DoodleScatter.jsx — floats a few doodles around the edges of a section,
// like the shapes on the reference welcome screen.
// The parent element must have `position: relative` (Bootstrap: className="position-relative").
//
// Each item: { name, size, top/left/right/bottom, rotate, delay, hideOnMobile }
import Doodle from './Doodle.jsx';

export default function DoodleScatter({ items }) {
  return (
    // aria-hidden: purely decorative, so screen readers skip the whole group
    <div className="lh-scatter" aria-hidden="true">
      {items.map((item, index) => (
        <Doodle
          key={index}
          name={item.name}
          size={item.size}
          fill={item.fill}
          className={`lh-float ${item.hideOnMobile ? 'd-none d-md-block' : ''}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            '--rot': `${item.rotate ?? 0}deg`,      // read by the lh-float animation
            animationDelay: `${item.delay ?? 0}s`,   // so they don't all bob in sync
          }}
        />
      ))}
    </div>
  );
}