import { Logger } from './logger.interface';

export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[Logger] ${message}`);
  }
}
