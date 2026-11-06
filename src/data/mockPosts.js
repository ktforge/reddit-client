// fake posts shaped like lemmy's /post/list response, swapped for real data later
export const mockPosts = [
  {
    post: {
      id: 1,
      name: 'Sunrise over the Blue Ridge Mountains',
      url: 'https://picsum.photos/id/1018/800/500',
      body: null,
      published: '2026-11-06T01:00:00Z',
    },
    creator: { name: 'trailhiker' },
    community: { name: 'pics' },
    counts: { score: 1243, comments: 87 },
  },
  {
    post: {
      id: 2,
      name: 'What is the best budget mechanical keyboard right now?',
      url: null,
      body: 'Looking for something under $60. **Hot-swap** is a plus.',
      published: '2026-11-05T22:30:00Z',
    },
    creator: { name: 'clacky' },
    community: { name: 'technology' },
    counts: { score: 412, comments: 156 },
  },
  {
    post: {
      id: 3,
      name: 'Finally finished my first full playthrough',
      url: 'https://picsum.photos/id/1043/800/500',
      body: null,
      published: '2026-11-05T18:10:00Z',
    },
    creator: { name: 'pixelpusher' },
    community: { name: 'gaming' },
    counts: { score: 2890, comments: 342 },
  },
];
