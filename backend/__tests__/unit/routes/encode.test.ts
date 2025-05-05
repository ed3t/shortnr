import supertest from 'supertest';
import { createServer } from '@config/express';
import { saveUrl, getOriginalUrl } from '@app/models/url';
import { config } from '@config/config';

// We will mock saveUrl to avoid writing to the database during tests.
jest.mock('@app/models/url', () => ({
  saveUrl: jest.fn(),
  getOriginalUrl: jest.fn(),
}));



describe('POST /api/encode', () => {
  const app = createServer();

  it('should return 400 if longUrl is missing', async () => {
    const response = await supertest(app).post('/api/encode').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('URL is required');
  });

  it('should return shortUrl if longUrl is provided', async () => {
    const longUrl = 'https://edet.dev/file/resume.pdf';
    const shortUrlPattern = `${config.frontendDomain}/[a-zA-Z0-9]+`;

    const response = await supertest(app).post('/api/encode').send({
      longUrl,
    });

    expect(response.status).toBe(200);
    expect(response.body.shortUrl).toMatch(new RegExp(shortUrlPattern));
    expect(response.body.longUrl).toBe(longUrl);
    expect(saveUrl).toHaveBeenCalledWith(longUrl, expect.any(String));
  });

  it('should return 404 if urlPath does not exist', async () => {
    const shortUrl = 'GeAi9K';

    // Mock the getOriginalUrl function to return null (not found)
    (getOriginalUrl as jest.Mock).mockReturnValue(null);

    const response = await supertest(app).post('/api/decode').send({
      urlPath: shortUrl,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Url path not found');  // Ensure the error message is consistent
  });
});
