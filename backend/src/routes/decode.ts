import express, { Request, Response, NextFunction } from 'express';  // Correctly import NextFunction
import { getOriginalUrl } from '@app/models/url';
import { DecodeResponse } from '@app/types/encoder';
import { createError } from '@app/utils/error';

const router = express.Router();

router.get('/:shortUrl', (req: Request, res: Response, next: NextFunction) => {
  const { shortUrl } = req.params;
  const longUrl = getOriginalUrl(shortUrl);

  if (longUrl) {
    const response: DecodeResponse = { longUrl };
    res.json(response);
  } else {
    return next(createError(404, "Short URL not found"));
  }
});

export default router;
