import { ConsoleLogger } from '../logger/console.logger';
import { FirebaseRsvpStore } from '../store/firebase-rsvp.store';
import { RsvpService } from '../service/rsvp.service';
import { Player } from '../interfaces/types';

const logger = new ConsoleLogger();
const store = new FirebaseRsvpStore(logger);
const service = new RsvpService(store, logger);

const players: Player[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Carol' },
];

async function run() {
  try {
    await service.addOrUpdate(players[0], 'Yes');
    await service.addOrUpdate(players[1], 'No');
    await service.addOrUpdate(players[2], 'Maybe');

    const confirmed = await service.getConfirmed();
    logger.info(`Confirmed: ${JSON.stringify(confirmed)}`);

    const stats = await service.getStats();
    logger.info(`Stats: ${JSON.stringify(stats)}`);
  } catch (err) {
    logger.error('Fatal error during execution:', err);
  }
}

run();
