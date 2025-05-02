import express, { Response } from 'express';
import { listUrls } from '@app/models/url';

const router = express.Router();

router.get('/', (_req, res: Response) => {
  const allUrls = listUrls();
  res.json(allUrls);
});

export default router;
