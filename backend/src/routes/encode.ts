import express, { Request, Response } from 'express';
import { encodeUrl } from '@app/controllers/encoder';
import { saveUrl } from '@app/models/url';
import { config } from '@config/config';
import { EncodeRequest, EncodeResponse } from '@app/types/encoder';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { longUrl }: EncodeRequest = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortUrl = encodeUrl(longUrl);
  saveUrl(longUrl, shortUrl);

  const response: EncodeResponse = { shortUrl: `${config.frontendDomain}/${shortUrl}` };

  return res.json(response);
});

export default router;
