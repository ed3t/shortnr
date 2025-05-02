export interface UrlEntry {
  longUrl: string;
  createdAt: Date;
  visits: number;
}

export interface UrlDatabase {
  [key: string]: UrlEntry;
}

export interface ShortenedUrl {
  shortUrl: string;
  longUrl: string;
  createdAt: Date;
  visits: number;
}
