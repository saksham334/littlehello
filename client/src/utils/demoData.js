// demoData.js — CLEARLY FAKE profiles for design previews only.
// These are not real people and are never saved to the database.
// Every card that uses them shows a "Demo profile" tag.

export const DEMO_PROFILES = [
  {
    id: 'demo-1',
    displayName: 'Mira (demo)',
    pronouns: 'she/her',
    avatar: 'moon',
    conversationStyle: 'Slow, thoughtful texter',
    intro: 'New to the city. I like quiet cafés, long walks and swapping book recommendations.',
    interests: ['Reading 📚', 'Tea 🍵', 'Journaling', 'Indie games', 'Houseplants 🌿', 'Baking'],
  },
  {
    id: 'demo-2',
    displayName: 'Jun (demo)',
    pronouns: 'he/they',
    avatar: 'cloud',
    conversationStyle: 'Happy to voice chat later',
    intro: 'Introvert who loves cozy games and finding new music. Talking about hobbies > small talk.',
    interests: ['Cozy games 🎮', 'Lo-fi music 🎧', 'Tea 🍵', 'Drawing ✏️'],
  },
  {
    id: 'demo-3',
    displayName: 'Sam (demo)',
    pronouns: 'they/them',
    avatar: 'bubbles',
    conversationStyle: 'Prefers short, easygoing messages',
    intro: 'Looking for a walking buddy and someone to share silly animal photos with.',
    interests: ['Nature walks 🌳', 'Animals 🐾', 'Photography 📷', 'Reading 📚'],
  },
];

// Pretend "you" like these, so the cards can show shared interests.
export const DEMO_MY_INTERESTS = ['Tea 🍵', 'Reading 📚', 'Cozy games 🎮'];