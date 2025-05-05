import supertest from 'supertest';
import { createServer } from '@config/express';
import { getOriginalUrl } from '@app/models/url';

jest.mock('@app/models/url', () => ({
  getOriginalUrl: jest.fn(),
}));

describe('POST /api/decode', () => {
  const app = createServer();

  it('should return 400 if urlPath is missing or invalid', async () => {
    const response = await supertest(app).post('/api/decode').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Url path is required');
  });

  it('should return longUrl if urlPath exists', async () => {
    const shortUrl = 'JiYUY';
    const longUrl = 'https://example.com';

    (getOriginalUrl as jest.Mock).mockReturnValue(longUrl);

    const response = await supertest(app).post('/api/decode').send({
      urlPath: shortUrl,
    });

    expect(response.status).toBe(200);
    expect(response.body.longUrl).toBe(longUrl);
    expect(getOriginalUrl).toHaveBeenCalledWith(shortUrl);
  });

  it('should return 404 if urlPath does not exist', async () => {
    const shortUrl = 'GeAi9K';

    (getOriginalUrl as jest.Mock).mockReturnValue(null);

    const response = await supertest(app).post('/api/decode').send({
      urlPath: shortUrl,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Url path not found');
  });
});
