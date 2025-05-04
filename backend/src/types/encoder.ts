export interface EncodeRequest {
  longUrl: string;
}

export interface EncodeResponse {
  longUrl: string;
  shortUrl: string;
}

export interface DecodeResponse {
  longUrl: string;
}
