import express, { Request, Response, NextFunction } from 'express';  // Correctly import NextFunction
import { getOriginalUrl } from '@app/models/url';
import { DecodeResponse } from '@app/types/encoder';
import { createError } from '@app/utils/error';

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { urlPath } = req.body;

  if (!urlPath || typeof urlPath !== 'string') {
    return next(createError(400, "Url path is required"));
  }

  const longUrl = getOriginalUrl(urlPath);

  if (longUrl) {
    const response: DecodeResponse = { longUrl };
    res.json(response);
  } else {
    return next(createError(404, "Url path not found"));
  }
});

export default router;
