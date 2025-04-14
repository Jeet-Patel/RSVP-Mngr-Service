import { isValidPlayer, isValidStatus } from '../src/utils/validation';

describe('Validation Helpers', () => {
  it('validates correct player object', () => {
    expect(isValidPlayer({ id: '1', name: 'Alice' })).toBe(true);
    expect(isValidPlayer({ id: 1, name: 'Alice' })).toBe(false);
    expect(isValidPlayer(null)).toBe(false);
    expect(isValidPlayer({ name: 'Alice' })).toBe(false);
  });

  it('validates RSVP status correctly', () => {
    expect(isValidStatus('Yes')).toBe(true);
    expect(isValidStatus('Maybe')).toBe(true);
    expect(isValidStatus('Yessir')).toBe(false);
    expect(isValidStatus(undefined)).toBe(false);
  });
});
