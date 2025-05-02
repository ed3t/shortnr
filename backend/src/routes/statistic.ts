import express, { Request, Response, NextFunction } from 'express';
import { getUrlStat } from '@app/models/url';
import { ShortenedUrl } from '@app/types/url';
import { createError } from '@app/utils/error';

const router = express.Router();

router.get('/:shortUrl', (req: Request, res: Response, next: NextFunction) => {
  const { shortUrl } = req.params;
  const stats: ShortenedUrl = getUrlStat(shortUrl);

  if (stats) {
    res.json(stats)
  } else {
    return next(createError(404, "Short URL not found"));
  }
});

export default router;
