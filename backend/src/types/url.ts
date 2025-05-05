export interface UrlEntry {
  longUrl: string;
  createdAt: Date;
  visits: number;
}

export interface UrlDatabase {
  [key: string]: UrlEntry;
}

export interface ShortenedUrl {
  shortUrlPath: string;
  longUrl: string;
  createdAt: Date;
  visits: number;
}
