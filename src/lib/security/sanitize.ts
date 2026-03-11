// ============================================
// Input Sanitization Utilities
// Migrato da FarmaciaMozart/js/app.js → TypeScript
// ============================================

const MAX_TEXT_LEN = 200;
const MAX_DESC_LEN = 500;
const MAX_URL_LEN = 1000;
const MAX_PRICE_LEN = 10;
const ALLOWED_URL_PROTOCOLS = ['https:'];

/**
 * Sanitizza testo: rimuove tag HTML e taglia alla lunghezza massima.
 */
export function sanitizeText(str: unknown, maxLen = MAX_TEXT_LEN): string {
  if (!str) return '';
  return String(str)
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLen);
}

/**
 * Sanitizza descrizione (limite più alto).
 */
export function sanitizeDescription(str: unknown): string {
  return sanitizeText(str, MAX_DESC_LEN);
}

/**
 * Sanitizza URL: valida protocollo HTTPS e lunghezza.
 */
export function sanitizeUrl(str: unknown): string {
  if (!str) return '';
  const trimmed = String(str).trim().slice(0, MAX_URL_LEN);
  try {
    const url = new URL(trimmed);
    if (!ALLOWED_URL_PROTOCOLS.includes(url.protocol)) return '';
    return url.href;
  } catch {
    return '';
  }
}

/**
 * Sanitizza prezzo: valida tipo numerico e range.
 */
export function sanitizePrice(str: unknown): string {
  if (!str && str !== 0) return '';
  const trimmed = String(str).trim().slice(0, MAX_PRICE_LEN);
  const num = parseFloat(trimmed);
  if (isNaN(num) || num < 0 || num > 99999) return '';
  return num.toFixed(2);
}

/**
 * Escape HTML per rendering sicuro.
 */
export function escapeHtml(str: unknown): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
