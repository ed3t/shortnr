import supertest from 'supertest';
import { createServer } from '@config/express';
import { saveUrl } from '@app/models/url';

describe('GET /api/decode/:shortUrl', () => {
  const app = createServer();

  const longUrl = 'https://example.com';
  const shortUrl = 'JiYUY';

  beforeAll(() => {
    saveUrl(longUrl, shortUrl);
  });

  it('should return longUrl if shortUrl exists', async () => {
    const response = await supertest(app).get(`/api/decode/${shortUrl}`);
    expect(response.status).toBe(200);
    expect(response.body.longUrl).toBe(longUrl);
  });

  it('should return 404 if shortUrl does not exist', async () => {
    const response = await supertest(app).get(`/api/decode/GeAi9K`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Short URL not found');
  });
});