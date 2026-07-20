/**
 * Converts a flat family array into
 * a hierarchical tree.
 */

export function buildHierarchy(members) {
  // Create a lookup table
  const map = {};

  members.forEach((member) => {
    map[member.id] = {
      ...member,
      childrenNodes: [],
    };
  });

  let root = null;

  members.forEach((member) => {
    if (member.parents.length === 0) {
      root = map[member.id];
      return;
    }

    member.parents.forEach((parentId) => {
      if (map[parentId]) {
        map[parentId].childrenNodes.push(map[member.id]);
      }
    });
  });

  return root;
}
