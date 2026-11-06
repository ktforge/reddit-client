// turns lemmy's flat comment list into a tree using each comment's path
export function buildCommentTree(comments) {
  const byId = {};
  const roots = [];

  // first pass: copy every comment and give it an empty replies list
  comments.forEach((c) => {
    byId[c.comment.id] = { ...c, replies: [] };
  });

  // second pass: attach each comment to its parent, or to the top level
  comments.forEach((c) => {
    const ids = c.comment.path.split('.'); // "0.10.11" becomes ["0", "10", "11"]
    const parentId = ids[ids.length - 2]; // the id right before this one
    const node = byId[c.comment.id];
    if (parentId === '0' || !byId[parentId]) {
      roots.push(node);
    } else {
      byId[parentId].replies.push(node);
    }
  });

  return roots;
}
