import { Logger } from './logger.interface';

const isDebug = process.env.NODE_ENV !== 'production';

export class ConsoleLogger implements Logger {
  info(message: string): void {
    console.log(`INFO: ${message}`);
  }

  warn(message: string): void {
    console.warn(`WARNING: ${message}`);
  }

  error(message: string, meta?: any): void {
    console.error(`ERROR: ${message}`);
    if (meta && isDebug) {
      console.error('Debug Info:', meta);
    }
  }

  debug(message: string, meta?: any): void {
    if (isDebug) {
      console.debug(`DEBUG: ${message}`);
      if (meta) console.debug(meta);
    }
  }
}
