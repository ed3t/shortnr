import { UrlEntry, UrlDatabase, ShortenedUrl } from '@app/types/url';

const urlDatabase: UrlDatabase = {};

export const saveUrl = (longUrl: string, shortUrlPath: string): void => {
  urlDatabase[shortUrlPath] = { longUrl, createdAt: new Date(), visits: 0 };
};

export const getOriginalUrl = (shortUrlPath: string): string | null => {
  const urlEntry: UrlEntry = urlDatabase[shortUrlPath];
  if (urlEntry) {
    urlEntry.visits++;
    return urlEntry.longUrl;
  }
  return null;
};

export const getUrlStat = (shortUrlPath: string): { shortUrlPath: string, longUrl: string, visits: number, createdAt: Date } | null => {
  const urlEntry: UrlEntry = urlDatabase[shortUrlPath];
  if (urlEntry) {
    return {
      shortUrlPath,
      longUrl: urlEntry.longUrl,
      visits: urlEntry.visits,
      createdAt: urlEntry.createdAt
    };
  }
  return null;
};

export const listUrls = (): ShortenedUrl[] => {
  return Object.entries(urlDatabase).map(([shortUrlPath, { longUrl, createdAt, visits }]) => ({
    shortUrlPath,
    longUrl,
    createdAt,
    visits
  }));
};
