import { logger } from '../logger';

export function handleProcessError(msg: string): void {
  logger.error(msg);
  process.exit(1);
}
