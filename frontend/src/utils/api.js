import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
});

export const encodeUrl = (longUrl) =>
  API.post('/encode', { longUrl });

export const decodeUrl = (shortUrl) =>
  API.get(`/decode/${shortUrl}`);