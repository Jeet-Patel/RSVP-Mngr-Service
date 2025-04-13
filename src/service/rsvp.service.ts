import { RsvpStore } from '../store/rsvp.store';
import { Player, RsvpStatus } from '../interfaces/types';

export class RsvpService {
  constructor(private store: RsvpStore) {}

  async addOrUpdate(player: Player, status: RsvpStatus) {
    return this.store.addOrUpdateRsvp(player, status);
  }

  async getConfirmed(players: Player[]): Promise<Player[]> {
    return this.store.getConfirmedAttendees();
  }

  async getStats(): Promise<{ total: number; confirmed: number; declined: number }> {
    return this.store.getResponseCounts();
  }
}
