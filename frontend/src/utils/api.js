import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const encodeUrl = (longUrl) =>
  API.post('/encode', { longUrl });

export const decodeUrl = (shortUrl) =>
  API.get(`/decode/${shortUrl}`);

export const listUrls = () =>
  API.get(`/list`);

export const statistic = (shortUrl) =>
  API.get(`/statistic/${shortUrl}`);