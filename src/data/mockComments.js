// fake comments shaped like lemmy's /comment/list response
// path shows nesting: "0.10" is top level, "0.10.11" is a reply to comment 10
export const mockComments = [
  {
    comment: { id: 10, post_id: 1, content: 'Gorgeous shot. What camera did you use?', path: '0.10', published: '2026-11-06T02:00:00Z' },
    creator: { name: 'shutterbug' },
    counts: { score: 54 },
  },
  {
    comment: { id: 11, post_id: 1, content: 'Just my phone, believe it or not. **No edits.**', path: '0.10.11', published: '2026-11-06T02:10:00Z' },
    creator: { name: 'trailhiker' },
    counts: { score: 31 },
  },
  {
    comment: { id: 12, post_id: 1, content: 'That is wild for a phone camera.', path: '0.10.11.12', published: '2026-11-06T02:20:00Z' },
    creator: { name: 'pixelpeeper' },
    counts: { score: 9 },
  },
  {
    comment: { id: 13, post_id: 1, content: 'Adding this one to my hiking list.', path: '0.13', published: '2026-11-06T02:30:00Z' },
    creator: { name: 'weekendwalker' },
    counts: { score: 22 },
  },
  {
    comment: { id: 20, post_id: 2, content: 'Look for anything with hot-swap sockets. You can change switches later without soldering.', path: '0.20', published: '2026-11-05T23:00:00Z' },
    creator: { name: 'switchnerd' },
    counts: { score: 88 },
  },
  {
    comment: { id: 21, post_id: 2, content: 'This. Start cheap and upgrade the switches once you know what you like.', path: '0.20.21', published: '2026-11-05T23:15:00Z' },
    creator: { name: 'clacky' },
    counts: { score: 17 },
  },
  {
    comment: { id: 30, post_id: 3, content: 'Congrats! How many hours did it take?', path: '0.30', published: '2026-11-05T19:00:00Z' },
    creator: { name: 'speedrunner' },
    counts: { score: 41 },
  },
];
