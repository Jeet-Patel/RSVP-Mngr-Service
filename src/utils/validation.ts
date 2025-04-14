import { Player, RsvpStatus } from '../interfaces/types';

const VALID_STATUSES: RsvpStatus[] = ['Yes', 'No', 'Maybe'];

export function isValidPlayer(player: any): player is Player {
  return (
    typeof player === 'object' &&
    player !== null &&
    typeof player.id === 'string' &&
    typeof player.name === 'string'
  );
}

export function isValidStatus(status: any): status is RsvpStatus {
  return typeof status === 'string' && VALID_STATUSES.includes(status as RsvpStatus);
}
