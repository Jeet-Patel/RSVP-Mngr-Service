import { Player, RsvpStatus } from '../interfaces/types';

export interface RsvpStore {
  addOrUpdateRsvp(player: Player, status: RsvpStatus): Promise<void>;
  getConfirmedAttendees(): Promise<Player[]>;
  getResponseCounts(): Promise<{ total: number; confirmed: number; declined: number }>;
}
