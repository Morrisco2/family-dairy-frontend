// /**
//  * Converts a flat family array into
//  * a hierarchical tree with spouse support.
//  */

// export function buildHierarchy(members) {
//   const map = {};

//   // Build lookup table
//   members.forEach((member) => {
//     map[member.id] = {
//       ...member,
//       childrenNodes: [],
//       spouseNode: null,
//     };
//   });

//   // Link spouses
//   members.forEach((member) => {
//     if (member.spouses && member.spouses.length > 0 && map[member.spouses[0]]) {
//       map[member.id].spouseNode = map[member.spouses[0]];
//     }
//   });

//   let root = null;

//   members.forEach((member) => {
//     // Root
//     if (member.parents.length === 0) {
//       // Prefer male root if a couple exists
//       if (!root || member.gender === "male") {
//         root = map[member.id];
//       }
//       return;
//     }

//     member.parents.forEach((parentId) => {
//       if (map[parentId]) {
//         map[parentId].childrenNodes.push(map[member.id]);
//       }
//     });
//   });

//   return root;
// }



// VERSION 2 (SPOUSE FEATURE IMPLEMENTATION)

/**
 * Converts a flat family array into
 * a hierarchical tree while preserving
 * spouse relationships.
 */

export function buildHierarchy(members) {
  const map = {};

  // Create lookup table
  members.forEach((member) => {
    map[member.id] = {
      ...member,
      childrenNodes: [],
    };
  });

  // Link children to parents
  members.forEach((member) => {
    member.parents.forEach((parentId) => {
      if (map[parentId]) {
        map[parentId].childrenNodes.push(map[member.id]);
      }
    });
  });

  // Find the explicit root first
  let root = members.find((member) => member.isRoot);

  // Fallback to the first member without parents
  if (!root) {
    root = members.find((member) => member.parents.length === 0);
  }

  return root ? map[root.id] : null;
}