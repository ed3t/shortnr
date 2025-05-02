import { UrlEntry, UrlDatabase, ShortenedUrl } from '@app/types/url';

const urlDatabase: UrlDatabase = {};

export const saveUrl = (longUrl: string, shortUrl: string): void => {
  urlDatabase[shortUrl] = { longUrl, createdAt: new Date(), visits: 0 };
};

export const getOriginalUrl = (shortUrl: string): string | null => {
  const urlEntry: UrlEntry = urlDatabase[shortUrl];
  if (urlEntry) {
    urlEntry.visits++;
    return urlEntry.longUrl;
  }
  return null;
};

export const getUrlStat = (shortUrl: string): { shortUrl: string, longUrl: string, visits: number, createdAt: Date } | null => {
  const urlEntry: UrlEntry = urlDatabase[shortUrl];
  if (urlEntry) {
    return {
      shortUrl,
      longUrl: urlEntry.longUrl,
      visits: urlEntry.visits,
      createdAt: urlEntry.createdAt
    };
  }
  return null;
};

export const listUrls = (): ShortenedUrl[] => {
  return Object.entries(urlDatabase).map(([shortUrl, { longUrl, createdAt, visits }]) => ({
    shortUrl,
    longUrl,
    createdAt,
    visits
  }));
};
