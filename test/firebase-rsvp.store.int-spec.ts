import { FirebaseRsvpStore } from '../src/store/firebase-rsvp.store';
import { Player } from '../src/interfaces/types';
import { db } from '../src/firebase/firebase-config';
import { Logger } from '../src/logger/logger.interface';

class MockLogger implements Logger {
  info(_: string): void {}
  warn(_: string): void {}
  error(_: string, __?: any): void {}
  debug?(_: string, __?: any): void {}
}

describe('FirebaseRsvpStore Integration Test', () => {
  const store = new FirebaseRsvpStore(new MockLogger());
  const testCollection = db.collection('rsvps');

  const players: Player[] = [
    { id: 'test1', name: 'Alice' },
    { id: 'test2', name: 'Bob' },
  ];

  beforeAll(async () => {
    await testCollection.doc(players[0].id).delete();
    await testCollection.doc(players[1].id).delete();
  });

  afterAll(async () => {
    await testCollection.doc(players[0].id).delete();
    await testCollection.doc(players[1].id).delete();
  });

  it('should add and retrieve RSVPs', async () => {
    await store.addOrUpdateRsvp(players[0], 'Yes');
    await store.addOrUpdateRsvp(players[1], 'No');

    const confirmed = await store.getConfirmedAttendees();
    const stats = await store.getResponseCounts();

    expect(confirmed.map((p) => p.id)).toContain(players[0].id);
    expect(stats.total).toBeGreaterThanOrEqual(2);
  });
});
