// const NODE_WIDTH = 180;
// const LEVEL_HEIGHT = 290;

// /**
//  * Assign x and y coordinates to every member.
//  * This function mutates the hierarchy by adding
//  * x and y properties.
//  */
// export function assignCoordinates(node, startX = 0, level = 0) {
//   if (!node) return;

//   const subtreePixelWidth = node.subtreeWidth * NODE_WIDTH;

//   // Center this node inside its subtree
//   node.x = startX + subtreePixelWidth / 2;
//   node.y = level * LEVEL_HEIGHT ;

//   let childStartX = startX;

//   node.childrenNodes.forEach((child) => {
//     assignCoordinates(child, childStartX, level + 1);

//     childStartX += child.subtreeWidth * NODE_WIDTH;
//   });
// }

// VERSION 2 (SPOUSE FEATURE)

const NODE_WIDTH = 180;
const SPOUSE_GAP = 60;
const LEVEL_HEIGHT = 290;

/**
 * Assign x and y coordinates to every member.
 * Spouses are positioned side-by-side.
 */
export function assignCoordinates(
  node,
  startX = 0,
  level = 0,
  visited = new Set(),
) {
  if (!node || visited.has(node.id)) return;

  visited.add(node.id);

  const subtreePixelWidth = node.subtreeWidth * NODE_WIDTH;

  const centerX = startX + subtreePixelWidth / 2;
  const centerY = level * LEVEL_HEIGHT;

  const spouseId = node.spouses?.[0];

  // Position this member
  node.x = centerX;
  node.y = centerY;

  // Position spouse beside the member
  if (spouseId) {
    node.spouseX = centerX + NODE_WIDTH + SPOUSE_GAP;
    node.spouseY = centerY;
  }

  let childStartX = startX;

  node.childrenNodes.forEach((child) => {
    assignCoordinates(child, childStartX, level + 1, visited);

    childStartX += child.subtreeWidth * NODE_WIDTH;
  });
}