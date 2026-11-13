// navItems.js — the app's main destinations, defined ONCE and shared by
// the sidebar, the tablet rail and the phone tab bar, so they never drift apart.
export const APP_NAV_ITEMS = [
  { to: '/discover', label: 'Discover', icon: 'bi-compass' },
  { to: '/hellos', label: 'Hellos', icon: 'bi-envelope-heart' },
  { to: '/messages', label: 'Messages', icon: 'bi-chat-heart' },
  { to: '/profile', label: 'Profile', icon: 'bi-person-circle' },
];

export const SETTINGS_ITEM = { to: '/settings', label: 'Settings', icon: 'bi-gear' };