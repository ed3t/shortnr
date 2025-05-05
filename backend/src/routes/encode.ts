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

  let normalizedUrl: string;
  try {
    normalizedUrl = validateUrl(longUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(createError(400, error.message));
  }

  const urlPath = encodeUrl(normalizedUrl);
  saveUrl(normalizedUrl, urlPath);

  const response: EncodeResponse = { longUrl: normalizedUrl, shortUrl: `${config.frontendDomain}/${urlPath}` };

  return res.json(response);
});

export default router;
