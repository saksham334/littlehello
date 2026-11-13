// publicProfile.js — the ONLY shape of a profile that other members ever receive.
//
// ALLOWLIST, not blocklist: we build a brand-new object with chosen fields,
// instead of deleting private fields from the document. If someone adds a new
// private field to the model later, it can't leak, because it isn't on this list.
export function toPublicProfile(profile) {
  const { privacy } = profile;

  return {
    id: profile.id,
    displayName: profile.displayName ?? null,
    avatar: profile.avatar,
    bio: profile.bio ?? '',
    interests: profile.interests,
    languages: profile.languages,
    conversationStyle: profile.conversationStyle ?? null,
    friendshipGoals: profile.friendshipGoals,

    // Shown only if this person chose to show them
    pronouns: privacy.showPronouns ? profile.pronouns || null : null,
    communities: privacy.showCommunities ? profile.communities : [],
    socialEnergy: privacy.showSocialEnergy ? profile.socialEnergy?.level ?? null : null,

    // Deliberately NOT included: user id, privacy settings, isComplete,
    // createdAt/updatedAt (would reveal activity), and anything from the User account.
  };
}