// health.js - API calls related to server health.
// Later we'll ass auth.js, profiles.js, etc. in the same style.
import { api } from './client.js';

export function getHealth(options) {
  return api.get('/health', options);
}