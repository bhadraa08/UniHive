// Curated illustrated avatars in dreamy editorial 2D animated/hand-drawn aesthetic
import bhadraAvatar from '../assets/avatars/avatar_bhadra.png';
import ananyaAvatar from '../assets/avatars/avatar_ananya.png';
import arjunAvatar from '../assets/avatars/avatar_arjun.png';
import priyaAvatar from '../assets/avatars/avatar_priya.png';
import rithikAvatar from '../assets/avatars/avatar_rithik.png';
import diyaAvatar from '../assets/avatars/avatar_diya.png';
import snehaAvatar from '../assets/avatars/avatar_sneha.png';

export interface AvatarOption {
  id: string;
  name: string;
  src: string;
  description: string;
}

export const ILLUSTRATED_AVATARS: AvatarOption[] = [
  {
    id: 'bhadra',
    name: 'Bhadra',
    src: bhadraAvatar,
    description: 'Wavy layered dark hair, star earrings & lavender sweater'
  },
  {
    id: 'ananya',
    name: 'Ananya',
    src: ananyaAvatar,
    description: 'Winged eyeliner, gold hoop earring & stylish brown hair'
  },
  {
    id: 'arjun',
    name: 'Arjun',
    src: arjunAvatar,
    description: 'Curly dark hair, expressive eyes & soft beige crewneck'
  },
  {
    id: 'priya',
    name: 'Priya',
    src: priyaAvatar,
    description: 'Short black bob, round glasses & mustard yellow knit'
  },
  {
    id: 'rithik',
    name: 'Rithik',
    src: rithikAvatar,
    description: 'Textured dark hair, warm smile & navy college hoodie'
  },
  {
    id: 'diya',
    name: 'Diya',
    src: diyaAvatar,
    description: 'Wavy hair in loose bun & cozy terracotta peach sweater'
  },
  {
    id: 'sneha',
    name: 'Sneha',
    src: snehaAvatar,
    description: 'Silky hair with daisy clip & sage green knitted cardigan'
  }
];

export const AVATAR_MAP: Record<string, string> = {
  bhadra: bhadraAvatar,
  ananya: ananyaAvatar,
  arjun: arjunAvatar,
  priya: priyaAvatar,
  rithik: rithikAvatar,
  diya: diyaAvatar,
  sneha: snehaAvatar,
  default: bhadraAvatar
};

/**
 * Deterministically maps any user, name, or legacy URL to one of our
 * curated 2D illustrated student portraits.
 */
export function getIllustratedAvatar(avatarUrl?: string | null, name?: string | null): string {
  // If user uploaded a custom base64 image, keep it
  if (avatarUrl && avatarUrl.startsWith('data:image/')) {
    return avatarUrl;
  }

  // If already one of our local illustrated avatar assets, return it
  if (avatarUrl && (
    avatarUrl.includes('avatar_bhadra') ||
    avatarUrl.includes('avatar_ananya') ||
    avatarUrl.includes('avatar_arjun') ||
    avatarUrl.includes('avatar_priya') ||
    avatarUrl.includes('avatar_rithik') ||
    avatarUrl.includes('avatar_diya') ||
    avatarUrl.includes('avatar_sneha')
  )) {
    return avatarUrl;
  }

  const cleanName = (name || '').toLowerCase().trim();
  const cleanUrl = (avatarUrl || '').toLowerCase().trim();

  // Explicit name & keyword matching
  if (cleanName.includes('bhadra') || cleanUrl.includes('bhadra')) return bhadraAvatar;
  if (cleanName.includes('ananya') || cleanUrl.includes('ananya')) return ananyaAvatar;
  if (cleanName.includes('arjun') || cleanUrl.includes('arjun')) return arjunAvatar;
  if (cleanName.includes('priya') || cleanUrl.includes('priya')) return priyaAvatar;
  if (cleanName.includes('rithik') || cleanUrl.includes('rithik')) return rithikAvatar;
  if (cleanName.includes('diya') || cleanUrl.includes('diya')) return diyaAvatar;
  if (cleanName.includes('sneha') || cleanUrl.includes('sneha')) return snehaAvatar;
  if (cleanName.includes('meera') || cleanUrl.includes('meera')) return diyaAvatar;
  if (cleanName.includes('adithya') || cleanUrl.includes('adithya')) return arjunAvatar;

  // If name exists, deterministically hash to pick a stable avatar
  if (cleanName) {
    let hash = 0;
    for (let i = 0; i < cleanName.length; i++) {
      hash = (hash << 5) - hash + cleanName.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % ILLUSTRATED_AVATARS.length;
    return ILLUSTRATED_AVATARS[idx].src;
  }

  return bhadraAvatar;
}

export {
  bhadraAvatar,
  ananyaAvatar,
  arjunAvatar,
  priyaAvatar,
  rithikAvatar,
  diyaAvatar,
  snehaAvatar
};
