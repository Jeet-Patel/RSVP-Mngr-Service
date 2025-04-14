import { Logger } from './logger.interface';

const isDebug = process.env.NODE_ENV !== 'production';

export class ConsoleLogger implements Logger {
  info(message: string, meta?: any): void {
    console.log(`INFO: ${message}`);
    if (meta && isDebug) {
      console.log('Debug Info:', meta);
    }
  }

  warn(message: string, meta?: any): void {
    console.warn(`WARNING: ${message}`);
    if (meta && isDebug) {
      console.warn('Debug Info:', meta);
    }
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
