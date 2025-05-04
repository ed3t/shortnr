import express, { Request, Response, NextFunction } from 'express';
import { encodeUrl } from '@app/controllers/encoder';
import { saveUrl } from '@app/models/url';
import { config } from '@config/config';
import { validateUrl } from '@app/utils';
import { EncodeRequest, EncodeResponse } from '@app/types/encoder';
import { createError } from '@app/utils/error';

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { longUrl }: EncodeRequest = req.body;

  if (!longUrl) {
    return next(createError(400, "URL is required"));
  }

  try {
    validateUrl(longUrl);
  } catch (error: any) {
    return next(createError(400, error.message));
  }

  const shortUrl = encodeUrl(longUrl);
  saveUrl(longUrl, shortUrl);

  const response: EncodeResponse = { longUrl, shortUrl: `${config.frontendDomain}/${shortUrl}` };

  return res.json(response);
});

export default router;
