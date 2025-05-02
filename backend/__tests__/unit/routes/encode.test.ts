import supertest from 'supertest';
import { createServer } from '@config/express';

describe('POST /api/encode', () => {
  const app = createServer();

  it('should return 400 if longUrl is missing', async () => {
    const response = await supertest(app).post('/api/encode').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('URL is required');
  });

  it('should return shortUrl if longUrl is provided', async () => {
    const response = await supertest(app).post('/api/encode').send({
      longUrl: 'https://edet.dev/file/resume.pdf',
    });

    expect(response.status).toBe(200);
    expect(response.body.shortUrl).toMatch(/^http.*\/[a-zA-Z0-9]+$/);
  });
});