import { URL } from 'url';

export const validateUrl = (raw: string) => {
  let urlString = raw.trim();

  // If there's no scheme, default to http://
  if (!/^[a-z][a-z\d+\-.]*:\/\//i.test(urlString)) {
    urlString = 'http://' + urlString;
  }

  // Try to parse
  let parsed: URL;
  try {
    parsed = new URL(urlString);
  } catch {
    throw new Error('Invalid URL format');
  }

  // Only allow certain schemes
  const allowed = ['http:', 'https:', 'ftp:', 'mailto:', 'tel:', 'file:'];
  if (!allowed.includes(parsed.protocol)) {
    throw new Error(
      `Unsupported URL scheme: "${parsed.protocol}". ` +
      `Use one of ${allowed.join(', ')}`
    );
  }

  if (['http:', 'https:', 'ftp:'].includes(parsed.protocol)) {
    // at least one dot and a 2-letter+ TLD
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(parsed.hostname)) {
      throw new Error(`Invalid domain name: "${parsed.hostname}"`);
    }
  }

  return parsed.href;
};
