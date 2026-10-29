// Doodle.jsx — LittleHello's hand-drawn decorations, drawn as inline SVG.
//
// Why inline SVG instead of image files?
//  - Crisp at any size (vector), tiny file size, no extra network requests.
//  - Colors can be changed with props, so one doodle works in many places.
//
// Every doodle is drawn on a 48×48 grid (the viewBox). The outline settings
// are set once on the <svg> and inherited by every shape inside it.
//
// Usage:  <Doodle name="flower" size={40} />
//         <Doodle name="heart" fill="#F5C6E8" title="A tiny heart" />

const OUTLINE = '#A85D79'; // berry outlines on every doodle

// Default colors for each doodle (they can be overridden with props)
const DEFAULT_COLORS = {
  flower: { fill: '#FFB7C5', accent: '#FFD6C2' },
  cloud: { fill: '#FFFFFF', accent: '#FFB7C5' },
  star: { fill: '#FFD6C2' },
  heart: { fill: '#FFB7C5' },
  sparkle: { fill: '#F5C6E8' },
  moon: { fill: '#FFD6C2' },
  bubbles: { fill: '#FFB7C5', accent: '#F5C6E8' },
  squiggle: { fill: '#FFB7C5' },
};

// Each entry is a small function that receives colors and returns SVG shapes.
const DRAWINGS = {
  // Five slightly plump petals around a peach center
  flower: (c) => (
    <>
      <path d="M24 22 C 18.5 17, 18.5 7.5, 24 5.5 C 29.5 7.5, 29.5 17, 24 22 Z" fill={c.fill} />
      <path d="M24 22 C 18.5 17, 18.5 7.5, 24 5.5 C 29.5 7.5, 29.5 17, 24 22 Z" fill={c.fill} transform="rotate(72 24 24)" />
      <path d="M24 22 C 18.5 17, 18.5 7.5, 24 5.5 C 29.5 7.5, 29.5 17, 24 22 Z" fill={c.fill} transform="rotate(144 24 24)" />
      <path d="M24 22 C 18.5 17, 18.5 7.5, 24 5.5 C 29.5 7.5, 29.5 17, 24 22 Z" fill={c.fill} transform="rotate(216 24 24)" />
      <path d="M24 22 C 18.5 17, 18.5 7.5, 24 5.5 C 29.5 7.5, 29.5 17, 24 22 Z" fill={c.fill} transform="rotate(288 24 24)" />
      <circle cx="24" cy="24" r="5" fill={c.accent} />
    </>
  ),

  // A smiling cloud with rosy cheeks
  cloud: (c) => (
    <>
      <path d="M14 35 C 7 35, 5.5 26, 12.5 24.5 C 12 16, 22 13, 25.5 19.5 C 28.5 13.5, 39 15, 37.5 23.5 C 44 23.5, 44.5 35, 36.5 35 Z" fill={c.fill} />
      <circle cx="17.5" cy="30" r="1.9" fill={c.accent} stroke="none" />
      <circle cx="30.5" cy="30" r="1.9" fill={c.accent} stroke="none" />
      <circle cx="20.5" cy="27" r="1.3" fill={OUTLINE} stroke="none" />
      <circle cx="27.5" cy="27" r="1.3" fill={OUTLINE} stroke="none" />
      <path d="M21.8 30.6 Q 24 32.8 26.2 30.6" fill="none" />
    </>
  ),

  // A soft five-point star (round line joins keep the points friendly)
  star: (c) => (
    <path d="M24 7 L29 18.1 L41.1 19.4 L32.1 27.6 L34.6 39.6 L24 33.5 L13.4 39.6 L15.9 27.6 L6.9 19.4 L19 18.1 Z" fill={c.fill} />
  ),

  heart: (c) => (
    <path d="M24 39 C 12 31, 6 23, 11 15 C 15 9, 22 11, 24 17 C 26 11, 33 9, 37 15 C 42 23, 36 31, 24 39 Z" fill={c.fill} />
  ),

  // A four-point twinkle
  sparkle: (c) => (
    <path d="M24 6 C 25 18, 30 23, 42 24 C 30 25, 25 30, 24 42 C 23 30, 18 25, 6 24 C 18 23, 23 18, 24 6 Z" fill={c.fill} />
  ),

  moon: (c) => (
    <path d="M29 7 A 17 17 0 1 0 41 33 A 13 13 0 1 1 29 7 Z" fill={c.fill} />
  ),

  // Two speech bubbles: a little hello, and a little hello back
  bubbles: (c) => (
    <>
      <path d="M8 6 H27 A5 5 0 0 1 32 11 V20 A5 5 0 0 1 27 25 H16 L9 30.5 V25 H8 A5 5 0 0 1 3 20 V11 A5 5 0 0 1 8 6 Z" fill={c.fill} />
      <circle cx="11.5" cy="15.5" r="1.4" fill={OUTLINE} stroke="none" />
      <circle cx="17.5" cy="15.5" r="1.4" fill={OUTLINE} stroke="none" />
      <circle cx="23.5" cy="15.5" r="1.4" fill={OUTLINE} stroke="none" />
      <path d="M22 20 H40 A5 5 0 0 1 45 25 V33 A5 5 0 0 1 40 38 H38.5 V43.5 L32 38 H22 A5 5 0 0 1 17 33 V25 A5 5 0 0 1 22 20 Z" fill={c.accent} />
      <path d="M31 33 C 28 31, 27.5 28.4, 29.3 27.4 C 30.2 26.9, 31 27.6, 31 28.4 C 31 27.6, 31.8 26.9, 32.7 27.4 C 34.5 28.4, 34 31, 31 33 Z" fill={OUTLINE} stroke="none" />
    </>
  ),

  // A loose hand-drawn wave (outline only)
  squiggle: (c) => (
    <path d="M4 30 C 10 18, 16 18, 20 28 S 30 38, 34 26 S 42 16, 46 22" fill="none" stroke={c.fill} strokeWidth="3.2" />
  ),
};

// Exported so the style guide (and later the avatar picker) can list them all
export const DOODLE_NAMES = Object.keys(DRAWINGS);

export default function Doodle({
  name,
  size = 48,
  fill,
  accent,
  title,
  className = '',
  style,
}) {
  const draw = DRAWINGS[name];

  // A typo in "name" shouldn't crash the page: warn developers and draw nothing.
  if (!draw) {
    if (import.meta.env.DEV) console.warn(`Doodle: unknown name "${name}"`);
    return null;
  }

  // Props win over defaults: { ...defaults, ...only the props that were given }
  const colors = {
    ...DEFAULT_COLORS[name],
    ...(fill && { fill }),
    ...(accent && { accent }),
  };

  // Decorative by default (hidden from screen readers).
  // If a title is passed, the doodle becomes a meaningful image with a name.
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      style={style}
      stroke={OUTLINE}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {draw(colors)}
    </svg>
  );
}