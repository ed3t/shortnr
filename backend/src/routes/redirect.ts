import express, { Request, Response, NextFunction } from 'express';
import { getOriginalUrl } from '@app/models/url';
import { createError } from '@app/utils/error';
import { logger } from '@config/logger';

const router = express.Router();

router.get('/:urlPath', async (req: Request, res: Response, next: NextFunction) => {
  const { urlPath } = req.params;

  try {
    const longUrl = getOriginalUrl(urlPath);

    if (longUrl) {
      return res.redirect(longUrl);
    } else {
      return next(createError(404, 'Short URL not found'));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logger.error('Internal Server Error',err);
    return next(createError(500, 'Internal Server Error'));
  }
});

export default router;
