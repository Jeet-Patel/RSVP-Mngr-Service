import { RsvpService } from '../src/service/rsvp.service';
import { RsvpStore } from '../src/store/rsvp.store';
import { Player, RsvpStatus } from '../src/interfaces/types';

class InMemoryRsvpStore implements RsvpStore {
  private rsvpMap = new Map<string, RsvpStatus>();
  private players = new Map<string, Player>();

  async addOrUpdateRsvp(player: Player, status: RsvpStatus): Promise<void> {
    this.rsvpMap.set(player.id, status);
    this.players.set(player.id, player);
  }

  async getConfirmedAttendees(): Promise<Player[]> {
    return Array.from(this.rsvpMap.entries())
      .filter(([_, status]) => status === 'Yes')
      .map(([id]) => this.players.get(id)!)
      .filter(Boolean);
  }

  async getResponseCounts(): Promise<{ total: number; confirmed: number; declined: number }> {
    const values = Array.from(this.rsvpMap.values());
    const confirmed = values.filter(v => v === 'Yes').length;
    const declined = values.filter(v => v === 'No').length;
    return { total: values.length, confirmed, declined };
  }
}

describe('RsvpService', () => {
  let store: InMemoryRsvpStore;
  let service: RsvpService;
  let players: Player[];

  beforeEach(() => {
    store = new InMemoryRsvpStore();
    service = new RsvpService(store);

    players = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Carol' },
    ];
  });

  it('should add and update RSVPs correctly', async () => {
    await service.addOrUpdate(players[0], 'Yes');
    await service.addOrUpdate(players[1], 'No');
    await service.addOrUpdate(players[2], 'Maybe');

    const stats = await service.getStats();
    expect(stats).toEqual({ total: 3, confirmed: 1, declined: 1 });
  });

  it('should return correct confirmed attendees', async () => {
    await service.addOrUpdate(players[0], 'Yes');
    await service.addOrUpdate(players[1], 'No');
    await service.addOrUpdate(players[2], 'Yes');

    const confirmed = await service.getConfirmed(players);
    expect(confirmed).toEqual([players[0], players[2]]);
  });

  it('should overwrite RSVP if the same player is updated', async () => {
    await service.addOrUpdate(players[0], 'Maybe');
    await service.addOrUpdate(players[0], 'Yes');

    const stats = await service.getStats();
    expect(stats).toEqual({ total: 1, confirmed: 1, declined: 0 });
  });
});
