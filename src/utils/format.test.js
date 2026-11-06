import { describe, it, expect } from 'vitest';
import { formatScore, timeAgo, stripMarkdown } from './format.js';

describe('formatScore', () => {
  it('leaves small numbers alone', () => {
    expect(formatScore(412)).toBe('412');
  });

  it('shortens thousands with one decimal', () => {
    expect(formatScore(1243)).toBe('1.2k');
  });

  it('drops a trailing .0', () => {
    expect(formatScore(2000)).toBe('2k');
  });
});

describe('timeAgo', () => {
  // a fixed "now" so the results never change
  const now = new Date('2026-11-06T12:00:00Z').getTime();

  it('shows hours', () => {
    expect(timeAgo('2026-11-06T07:00:00Z', now)).toBe('5 hours ago');
  });

  it('uses singular for one', () => {
    expect(timeAgo('2026-11-05T12:00:00Z', now)).toBe('1 day ago');
  });

  it('says just now under a minute', () => {
    expect(timeAgo('2026-11-06T11:59:30Z', now)).toBe('just now');
  });
});

describe('stripMarkdown', () => {
  it('removes formatting symbols', () => {
    expect(stripMarkdown('**Hot-swap** is _nice_')).toBe('Hot-swap is nice');
  });

  it('keeps link text and drops the url', () => {
    expect(stripMarkdown('see [Lemmy](https://join-lemmy.org)')).toBe('see Lemmy');
  });

  it('handles a missing body', () => {
    expect(stripMarkdown()).toBe('');
  });
});
