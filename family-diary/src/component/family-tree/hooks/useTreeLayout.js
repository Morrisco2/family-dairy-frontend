export const NODE_WIDTH = 170;
export const HORIZONTAL_SPACING = 80;
export const VERTICAL_SPACING = 180;

/**
 * Generates React Flow nodes from family relationships.
 */
export function buildTreeLayout(members) {
  const positionedNodes = [];

  /**
   * Find the root member.
   * For now, the root is simply the member without parents.
   */
  const root = members.find((member) => member.parents.length === 0);

  if (!root) return [];

  /**
   * Recursive function
   */
  function placeMember(member, level, x) {
    positionedNodes.push({
      id: member.id,
      type: member.isRoot ? "root" : "family",

      position: {
        x,
        y: level * VERTICAL_SPACING,
      },

      data: member,
    });

    const children = members.filter((m) => member.children.includes(m.id));

    if (!children.length) return;

    const totalWidth =
      (children.length - 1) * (NODE_WIDTH + HORIZONTAL_SPACING);

    let childX = x - totalWidth / 2;

    children.forEach((child) => {
      placeMember(child, level + 1, childX);

      childX += NODE_WIDTH + HORIZONTAL_SPACING;
    });
  }

  placeMember(root, 0, 400);

  return positionedNodes;
}
