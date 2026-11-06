import { mockPosts } from '../src/data/mockPosts.js';
import { mockComments } from '../src/data/mockComments.js';

// answers the app's lemmy requests with local data, so tests are fast and never flaky
// options.failFirst: how many requests fail with a rate limit before answering normally
export async function useFakeApi(page, { failFirst = 0 } = {}) {
  let failuresLeft = failFirst;

  // photo urls in the fake posts would hit the internet, so skip them
  await page.route('https://picsum.photos/**', (route) => route.abort());

  await page.route('https://lemmy.world/api/v3/**', (route) => {
    const url = new URL(route.request().url());
    const send = (status, body) => route.fulfill({ status, json: body });

    if (failuresLeft > 0) {
      failuresLeft -= 1;
      return send(429, { error: 'rate_limit_error' });
    }

    if (url.pathname.endsWith('/post/list')) {
      const community = url.searchParams.get('community_name');
      const posts = community ? mockPosts.filter((p) => p.community.name === community) : mockPosts;
      return send(200, { posts });
    }

    if (url.pathname.endsWith('/search')) {
      const q = url.searchParams.get('q').toLowerCase();
      return send(200, { posts: mockPosts.filter((p) => p.post.name.toLowerCase().includes(q)) });
    }

    if (url.pathname.endsWith('/post')) {
      const id = Number(url.searchParams.get('id'));
      const postView = mockPosts.find((p) => p.post.id === id);
      return postView ? send(200, { post_view: postView }) : send(404, { error: 'couldnt_find_post' });
    }

    if (url.pathname.endsWith('/comment/list')) {
      const id = Number(url.searchParams.get('post_id'));
      return send(200, { comments: mockComments.filter((c) => c.comment.post_id === id) });
    }

    return send(404, { error: 'not_found' });
  });
}
