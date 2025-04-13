import { ConsoleLogger } from '../logger/console.logger';
import { FirebaseRsvpStore } from '../store/firebase-rsvp.store';
import { RsvpService } from '../service/rsvp.service';
import { Player } from '../interfaces/types';

const logger = new ConsoleLogger();
const store = new FirebaseRsvpStore(); 
const service = new RsvpService(store);

const players: Player[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Carol' },
];

async function run() {
  await service.addOrUpdate(players[0], 'Yes');
  await service.addOrUpdate(players[1], 'No');
  await service.addOrUpdate(players[2], 'Maybe');

  const confirmed = await service.getConfirmed(players);
  console.log('✅ Confirmed:', confirmed);

  const stats = await service.getStats();
  console.log('📊 Stats:', stats);
}

run();
