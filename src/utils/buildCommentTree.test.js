import { describe, it, expect } from 'vitest';
import { buildCommentTree } from './buildCommentTree.js';

// small helper so each fake comment only needs an id and a path
const c = (id, path) => ({ comment: { id, path } });

describe('buildCommentTree', () => {
  it('nests replies under their parents', () => {
    const tree = buildCommentTree([c(1, '0.1'), c(2, '0.1.2'), c(3, '0.1.2.3'), c(4, '0.4')]);

    expect(tree.map((n) => n.comment.id)).toEqual([1, 4]);
    expect(tree[0].replies[0].comment.id).toBe(2);
    expect(tree[0].replies[0].replies[0].comment.id).toBe(3);
  });

  it('keeps a reply whose parent is missing at the top level', () => {
    const tree = buildCommentTree([c(5, '0.99.5')]);
    expect(tree.map((n) => n.comment.id)).toEqual([5]);
  });
});
