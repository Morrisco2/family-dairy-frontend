// import { FAMILY_NODE_SIZE } from "../nodes/FamilyNode";

// import { ROOT_NODE_SIZE } from "../nodes/RootNode";

// const FamilyTreeConnectors = ({ nodes }) => {
//   const lines = [];

//   nodes.forEach((parent) => {
//     const children = nodes.filter((node) =>
//       node.data.parents.includes(parent.id),
//     );

//     if (!children.length) return;

//     const size = parent.type === "root" ? ROOT_NODE_SIZE : FAMILY_NODE_SIZE;

//     const parentCenterX = parent.position.x + size.width / 2;

//     const parentBottomY = parent.position.y + size.height;

//     lines.push(
//       <line
//         key={`vertical-${parent.id}`}
//         x1={parentCenterX}
//         y1={parentBottomY}
//         x2={parentCenterX}
//         y2={parentBottomY + 35}
//         stroke="#808080"
//         strokeWidth={2}
//       />,
//     );
//   });

//   return (
//     <svg
//       className="absolute inset-0 pointer-events-none z-0"
//       width="100%"
//       height="100%">
//       {lines}
//     </svg>
//   );
// };

// export default FamilyTreeConnectors;

//  VERSION 2

const FamilyTreeConnectors = ({ nodes }) => {
  if (!nodes || nodes.length === 0) return null;

  const lines = [];

  nodes.forEach((child) => {
    const parents = child.data.parents || [];

    parents.forEach((parentId) => {
      const parent = nodes.find((n) => n.id === parentId);

      if (!parent) return;

      // measured is only available after React Flow measures the node.
      const parentWidth =
        parent.measured?.width ?? (parent.type === "root" ? 170 : 120);
      const parentHeight =
        parent.measured?.height ?? (parent.type === "root" ? 190 : 130);

      const childWidth =
        child.measured?.width ?? (child.type === "root" ? 170 : 120);

      const x1 = parent.position.x + parentWidth / 2;
      const y1 = parent.position.y + parentHeight;

      const x2 = child.position.x + childWidth / 2;
      const y2 = child.position.y;

      lines.push(
        <line
          key={`${parent.id}-${child.id}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#222"
          strokeWidth="2"
        />,
      );
    });
  });

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      {lines}
    </svg>
  );
};

export default FamilyTreeConnectors;