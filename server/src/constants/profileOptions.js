// profileOptions.js — the ALLOWED choices for profiles (the single source of truth).
// The database stores short ids ("cozy-games"); the app shows the labels.
// The React app will fetch these lists from the API (Part 8B), so it never needs its own copy.
//
// Rules for editing:
//   ✅ You can add new options or reword labels anytime.
//   ⚠️ Don't rename or delete an id that people may already have saved.

// ---- Interests (grouped, so the onboarding page can show them in sections) ----
export const INTERESTS = [
  // Cozy at home
  { id: 'reading', label: 'Reading', emoji: '📚', group: 'Cozy at home' },
  { id: 'tea', label: 'Tea', emoji: '🍵', group: 'Cozy at home' },
  { id: 'coffee', label: 'Coffee', emoji: '☕', group: 'Cozy at home' },
  { id: 'baking', label: 'Baking', emoji: '🧁', group: 'Cozy at home' },
  { id: 'cooking', label: 'Cooking', emoji: '🍲', group: 'Cozy at home' },
  { id: 'houseplants', label: 'Houseplants', emoji: '🌿', group: 'Cozy at home' },
  { id: 'puzzles', label: 'Puzzles', emoji: '🧩', group: 'Cozy at home' },
  { id: 'board-games', label: 'Board games', emoji: '🎲', group: 'Cozy at home' },

  // Creative
  { id: 'drawing', label: 'Drawing', emoji: '✏️', group: 'Creative' },
  { id: 'painting', label: 'Painting', emoji: '🎨', group: 'Creative' },
  { id: 'writing', label: 'Writing', emoji: '🖋️', group: 'Creative' },
  { id: 'journaling', label: 'Journaling', emoji: '📓', group: 'Creative' },
  { id: 'photography', label: 'Photography', emoji: '📷', group: 'Creative' },
  { id: 'crafts', label: 'Crafts & DIY', emoji: '✂️', group: 'Creative' },
  { id: 'knitting', label: 'Knitting & crochet', emoji: '🧶', group: 'Creative' },
  { id: 'making-music', label: 'Making music', emoji: '🎸', group: 'Creative' },

  // Games, music & stories
  { id: 'cozy-games', label: 'Cozy games', emoji: '🎮', group: 'Games, music & stories' },
  { id: 'video-games', label: 'Video games', emoji: '🕹️', group: 'Games, music & stories' },
  { id: 'anime', label: 'Anime & manga', emoji: '🌸', group: 'Games, music & stories' },
  { id: 'movies', label: 'Movies', emoji: '🎬', group: 'Games, music & stories' },
  { id: 'tv-series', label: 'TV series', emoji: '📺', group: 'Games, music & stories' },
  { id: 'podcasts', label: 'Podcasts', emoji: '🎧', group: 'Games, music & stories' },
  { id: 'lofi-music', label: 'Lo-fi music', emoji: '🎶', group: 'Games, music & stories' },
  { id: 'live-music', label: 'Concerts & live music', emoji: '🎤', group: 'Games, music & stories' },

  // Outdoors & movement
  { id: 'nature-walks', label: 'Nature walks', emoji: '🌳', group: 'Outdoors & movement' },
  { id: 'hiking', label: 'Hiking', emoji: '🥾', group: 'Outdoors & movement' },
  { id: 'gardening', label: 'Gardening', emoji: '🌻', group: 'Outdoors & movement' },
  { id: 'yoga', label: 'Yoga & stretching', emoji: '🧘', group: 'Outdoors & movement' },
  { id: 'cycling', label: 'Cycling', emoji: '🚲', group: 'Outdoors & movement' },
  { id: 'running', label: 'Running', emoji: '🏃', group: 'Outdoors & movement' },
  { id: 'animals', label: 'Animals & pets', emoji: '🐾', group: 'Outdoors & movement' },
  { id: 'birdwatching', label: 'Birdwatching', emoji: '🐦', group: 'Outdoors & movement' },

  // Curious minds
  { id: 'languages', label: 'Learning languages', emoji: '🗣️', group: 'Curious minds' },
  { id: 'science', label: 'Science & space', emoji: '🔭', group: 'Curious minds' },
  { id: 'history', label: 'History', emoji: '🏛️', group: 'Curious minds' },
  { id: 'tech', label: 'Tech & coding', emoji: '💻', group: 'Curious minds' },
  { id: 'philosophy', label: 'Philosophy', emoji: '💭', group: 'Curious minds' },
  { id: 'volunteering', label: 'Volunteering', emoji: '🤝', group: 'Curious minds' },
  { id: 'wellbeing', label: 'Mental wellbeing', emoji: '🌱', group: 'Curious minds' },
  { id: 'travel', label: 'Travel stories', emoji: '🗺️', group: 'Curious minds' },
];

// ---- Avatars (must match the keys in the client's utils/avatars.js) ----
export const AVATARS = [
  { id: 'flower', label: 'Little flower' },
  { id: 'cloud', label: 'Smiley cloud' },
  { id: 'star', label: 'Cozy star' },
  { id: 'heart', label: 'Soft heart' },
  { id: 'moon', label: 'Sleepy moon' },
  { id: 'bubbles', label: 'Chat bubbles' },
];

// ---- Languages people are happy to chat in ----
export const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'French' },
  { id: 'es', label: 'Spanish' },
  { id: 'pt', label: 'Portuguese' },
  { id: 'de', label: 'German' },
  { id: 'it', label: 'Italian' },
  { id: 'nl', label: 'Dutch' },
  { id: 'pl', label: 'Polish' },
  { id: 'uk', label: 'Ukrainian' },
  { id: 'ru', label: 'Russian' },
  { id: 'tr', label: 'Turkish' },
  { id: 'ar', label: 'Arabic' },
  { id: 'fa', label: 'Persian (Farsi)' },
  { id: 'hi', label: 'Hindi' },
  { id: 'pa', label: 'Punjabi' },
  { id: 'ur', label: 'Urdu' },
  { id: 'bn', label: 'Bengali' },
  { id: 'ta', label: 'Tamil' },
  { id: 'zh', label: 'Chinese' },
  { id: 'ja', label: 'Japanese' },
  { id: 'ko', label: 'Korean' },
  { id: 'vi', label: 'Vietnamese' },
  { id: 'tl', label: 'Tagalog / Filipino' },
  { id: 'sw', label: 'Swahili' },
];

// ---- How someone likes to chat (choose one) ----
export const CONVERSATION_STYLES = [
  { id: 'slow-thoughtful', label: 'Slow, thoughtful texter' },
  { id: 'short-easygoing', label: 'Short, easygoing messages' },
  { id: 'long-cozy', label: 'Long, cozy messages' },
  { id: 'voice-later', label: 'Happy to voice chat later' },
  { id: 'mix', label: 'A bit of everything' },
];

// ---- What kind of friendship they hope for (choose up to 3) ----
export const FRIENDSHIP_GOALS = [
  { id: 'chat-buddy', label: 'Someone to chat with' },
  { id: 'hobby-buddy', label: 'A hobby buddy' },
  { id: 'gaming-buddy', label: 'A gaming buddy' },
  { id: 'study-buddy', label: 'A study or co-working buddy' },
  { id: 'pen-pal', label: 'A pen pal' },
  { id: 'language-exchange', label: 'Language exchange' },
  { id: 'new-in-town', label: 'New in town, looking for friends' },
  { id: 'gentle-support', label: 'Gentle encouragement' },
];

// ---- Optional community spaces (self-chosen, private unless shown) ----
// Never used to judge anyone: only to help people who CHOOSE the same space find each other.
export const COMMUNITIES = [
  { id: 'lgbtq', label: 'LGBTQ+ friendly space' },
  { id: 'neurodivergent', label: 'Neurodivergent friendly' },
  { id: 'newcomers', label: 'Newcomers & immigrants' },
  { id: 'students', label: 'Students' },
  { id: 'working-adults', label: 'Working adults' },
  { id: 'parents', label: 'Parents' },
  { id: 'night-owls', label: 'Night owls' },
  { id: 'early-birds', label: 'Early birds' },
];

// ---- "Social energy today" (Milestone 10, optional and private by default) ----
export const SOCIAL_ENERGY = [
  { id: 'quiet', label: 'Quiet', emoji: '🌙' },
  { id: 'open', label: 'Open to chat', emoji: '🌤️' },
  { id: 'chatty', label: 'Chatty', emoji: '☀️' },
];

// ---- Privacy choices ----
export const HELLO_PERMISSIONS = [
  { id: 'everyone', label: 'Anyone can say hello' },
  { id: 'shared-interests', label: 'Only people who share an interest with me' },
  { id: 'nobody', label: 'Nobody right now (taking a break)' },
];

export const PHOTO_VISIBILITY = [
  { id: 'nobody', label: 'Nobody' },
  { id: 'connections', label: 'Only my connections' },
];

// ---- Limits (shared by the model and the validation in 8B) ----
export const PROFILE_LIMITS = Object.freeze({
  displayNameMax: 30,
  pronounsMax: 30,
  bioMax: 300,
  interestsMin: 1, // checked when onboarding is completed (Milestone 9), not on every save
  interestsMax: 10,
  languagesMax: 5,
  goalsMax: 3,
  communitiesMax: 5,
});

// ---- Plain id lists, handy for validation ----
const ids = (list) => list.map((item) => item.id);
export const INTEREST_IDS = ids(INTERESTS);
export const AVATAR_IDS = ids(AVATARS);
export const LANGUAGE_IDS = ids(LANGUAGES);
export const CONVERSATION_STYLE_IDS = ids(CONVERSATION_STYLES);
export const FRIENDSHIP_GOAL_IDS = ids(FRIENDSHIP_GOALS);
export const COMMUNITY_IDS = ids(COMMUNITIES);
export const SOCIAL_ENERGY_IDS = ids(SOCIAL_ENERGY);
export const HELLO_PERMISSION_IDS = ids(HELLO_PERMISSIONS);
export const PHOTO_VISIBILITY_IDS = ids(PHOTO_VISIBILITY);