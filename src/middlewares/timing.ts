/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';

import { performance } from 'perf_hooks';
import { logger } from '../logger';
import { AuthRequest } from '../interfaces/AuthRequest';

function timing(req: AuthRequest, res: Response, next: NextFunction): void {
  const startTime = performance.now();
  const { end } = res;

  res.end = ((chunk: any, encoding: string): void => {
    const responseTime = Math.round(performance.now() - startTime);

    res.end = end;
    res.end(chunk, encoding);

    const logMessage = {
      statusCode: res.statusCode,
      url: req.originalUrl || req.url,
      method: req.method,
      responseTime
    };

    logger.log('info', JSON.stringify(logMessage));
  }) as any;

  next();
}

export default timing;
