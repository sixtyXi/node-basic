/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

import { performance } from 'perf_hooks';
import { logger } from '../logger';

function timing(req: Request, res: Response, next: NextFunction): void {
  const startTime = performance.now();
  // eslint-disable-next-line prefer-destructuring
  const end = res.end;

  res.end = ((chunk: any, encoding: string): void => {
    const responseTime = Math.round(performance.now() - startTime);

    res.end = end;
    res.end(chunk, encoding);

    logger.info({
      url: req.originalUrl || req.url,
      method: req.method,
      statusCode: res.statusCode,
      responseTime
    });
  }) as any;

  next();
}

export default timing;
