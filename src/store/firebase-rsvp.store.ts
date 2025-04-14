import { db } from '../firebase/firebase-config';
import { Player, RsvpStatus } from '../interfaces/types';
import { RsvpStore } from './rsvp.store';
import { Logger } from '../logger/logger.interface';

export class FirebaseRsvpStore implements RsvpStore {
  private collection = db.collection('rsvps');

  constructor(private logger: Logger) {}

  async addOrUpdateRsvp(player: Player, status: RsvpStatus): Promise<void> {
    try {
      await this.collection.doc(player.id).set({ player, status });
      this.logger.info(`RSVP stored for ${player.name} as ${status}`);
    } catch (err) {
      this.logger.error(`Failed to store RSVP for ${player.name}`, err);
      throw new Error('Could not store RSVP');
    }
  }

  async getConfirmedAttendees(): Promise<Player[]> {
    try {
      const snapshot = await this.collection.get();
      return snapshot.docs
        .filter(doc => doc.data().status === 'Yes')
        .map(doc => doc.data().player);
    } catch (err) {
      this.logger.error('Failed to fetch confirmed attendees', err);
      throw new Error('Could not get confirmed RSVPs');
    }
  }

  async getResponseCounts(): Promise<{ total: number; confirmed: number; declined: number }> {
    try {
      const snapshot = await this.collection.get();
      let confirmed = 0;
      let declined = 0;

      snapshot.docs.forEach((doc) => {
        const status = doc.data().status;
        if (status === 'Yes') confirmed++;
        else if (status === 'No') declined++;
      });

      return { total: snapshot.size, confirmed, declined };
    } catch (err) {
      this.logger.error('Failed to count RSVP responses', err);
      throw new Error('Could not count RSVPs');
    }
  }
}
