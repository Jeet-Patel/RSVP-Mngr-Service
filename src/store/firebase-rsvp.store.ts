import { db } from '../firebase/firebase-config';
import { Player, RsvpStatus } from '../interfaces/types';
import { RsvpStore } from './rsvp.store';

export class FirebaseRsvpStore implements RsvpStore {
  private collection = db.collection('rsvps');

  async addOrUpdateRsvp(player: Player, status: RsvpStatus): Promise<void> {
    await this.collection.doc(player.id).set({ player, status });
  }

  async getConfirmedAttendees(): Promise<Player[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs
      .filter((doc) => doc.data().status === 'Yes')
      .map((doc) => doc.data().player);
  }

  async getResponseCounts(): Promise<{ total: number; confirmed: number; declined: number }> {
    const snapshot = await this.collection.get();
    let confirmed = 0;
    let declined = 0;

    snapshot.docs.forEach((doc) => {
      const status = doc.data().status;
      if (status === 'Yes') confirmed++;
      else if (status === 'No') declined++;
    });

    return { total: snapshot.size, confirmed, declined };
  }
}
