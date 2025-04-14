import { RsvpStore } from '../store/rsvp.store';
import { Player, RsvpStatus } from '../interfaces/types';
import { Logger } from '../logger/logger.interface';

export class RsvpService {
  constructor(private store: RsvpStore, private logger: Logger) {}

  async addOrUpdate(player: Player, status: RsvpStatus) {
    try {
      this.logger.debug?.(`Updating RSVP for ${player.name}`, { player, status });
      await this.store.addOrUpdateRsvp(player, status);
    } catch (err) {
      this.logger.error(`Service failed to update RSVP for ${player.name}`, err);
      throw new Error('Could not update RSVP');
    }
  }

  async getConfirmed(): Promise<Player[]> {
    try {
      return await this.store.getConfirmedAttendees();
    } catch (err) {
      this.logger.error('Service failed to fetch confirmed attendees', err);
      throw new Error('Could not fetch confirmed attendees');
    }
  }

  async getStats(): Promise<{ total: number; confirmed: number; declined: number }> {
    try {
      return await this.store.getResponseCounts();
    } catch (err) {
      this.logger.error('Service failed to compute RSVP stats', err);
      throw new Error('Could not fetch RSVP stats');
    }
  }
}
