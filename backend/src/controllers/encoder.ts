import { UrlDatabase, ShortenedUrl } from '@app/types/url';
import { saveUrl } from '@app/models/url';
import { SHORT_URL_CHAR_SET } from '@app/constants';

const urlDatabase: UrlDatabase = {};

const generateShortUrl = (): string => {
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += SHORT_URL_CHAR_SET.charAt(Math.floor(Math.random() * SHORT_URL_CHAR_SET.length));
  }
  return result;
};

export const encodeUrl = (longUrl: string): string => {
  const shortUrl = generateShortUrl();
  // Save the long URL to the in-memory bd
  saveUrl(longUrl, shortUrl);
  return shortUrl;
};
