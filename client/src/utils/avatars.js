// avatars.js — the doodle avatars people can choose instead of a photo.
// No photos in the MVP: less pressure about appearance, more privacy,
// and nothing to moderate or store.
//
// Each avatar = one doodle on a two-color pastel gradient.

export const AVATARS = {
  flower: { label: 'Little flower', doodle: 'flower', from: '#FFE4EA', to: '#FFD6C2' },
  cloud: { label: 'Smiley cloud', doodle: 'cloud', from: '#FCE6F3', to: '#F5C6E8' },
  star: { label: 'Cozy star', doodle: 'star', from: '#FFEDE3', to: '#FFB7C5' },
  heart: { label: 'Soft heart', doodle: 'heart', from: '#FFF9F2', to: '#F5C6E8' },
  moon: { label: 'Sleepy moon', doodle: 'moon', from: '#FCE6F3', to: '#FFD6C2' },
  bubbles: { label: 'Chat bubbles', doodle: 'bubbles', from: '#FFF9F2', to: '#FFD6C2' },
};

export const DEFAULT_AVATAR = 'flower';