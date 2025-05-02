import { UrlDatabase } from '@app/types/url';

const urlDatabase: UrlDatabase = {};

export const saveUrl = (longUrl: string, shortUrl: string): void => {
  urlDatabase[shortUrl] = { longUrl, createdAt: new Date(), visits: 0 };
};
