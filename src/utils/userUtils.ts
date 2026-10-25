/**
 * User state and identity utilities for UniHive.
 */

/**
 * Derives a clean, readable display name from a user's email address.
 * 
 * Rules:
 * 1. Takes the part of the authenticated user's email address before the '@' symbol.
 * 2. Converts it into a readable display name.
 * 3. Capitalizes the first letter and makes the remaining letters lowercase where appropriate.
 * 4. Handles missing or invalid email addresses gracefully.
 * 
 * Examples:
 * - archana@gmail.com -> Archana
 * - bhadra08@gmail.com -> Bhadra08
 * - ANJALI@GMAIL.COM -> Anjali
 * - john.doe@campus.edu -> John Doe
 */
export function deriveDisplayNameFromEmail(email?: string | null): string {
  if (!email || typeof email !== 'string') {
    return 'Student';
  }

  const trimmed = email.trim();
  if (!trimmed) {
    return 'Student';
  }

  // Extract the part before the '@' symbol
  const atIndex = trimmed.indexOf('@');
  const localPart = (atIndex >= 0 ? trimmed.slice(0, atIndex) : trimmed).trim();

  if (!localPart) {
    return 'Student';
  }

  // Handle dot, underscore, or hyphen separated names (e.g. "john.doe" -> "John Doe")
  if (/[._-]/.test(localPart)) {
    const parts = localPart.split(/[._-]+/).filter(Boolean);
    if (parts.length > 0) {
      return parts
        .map(part => formatWord(part))
        .join(' ');
    }
  }

  return formatWord(localPart);
}

function formatWord(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
