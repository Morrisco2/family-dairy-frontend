// // import { BaseEdge, getStraightPath } from "@xyflow/react";

// // const FamilyEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
// //   const [edgePath] = getStraightPath({
// //     sourceX,
// //     sourceY,
// //     targetX,
// //     targetY,
// //   });

// //   return (
// //     <BaseEdge
// //       id={id}
// //       path={edgePath}
// //       style={{
// //         stroke: "#8E8E93",
// //         strokeWidth: 2,
// //       }}
// //     />
// //   );
// // };

// // export default FamilyEdge;

// // VERSION 2

// import { BaseEdge, getBezierPath } from "@xyflow/react";
// console.log(BaseEdge, getBezierPath);
// const FamilyEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
//   const [path] = getBezierPath({
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//   });

//   return (
//     <BaseEdge
//       id={id}
//       path={path}
//       style={{
//         stroke: "#7d7d7d",
//         strokeWidth: 2,
//       }}
//     />
//   );
// };

// export default FamilyEdge;

// VERSION 2 (SPOUSE FEATURE)

import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

const ROOT_NODE_WIDTH = 170;
const FAMILY_NODE_WIDTH = 120;

export default function FamilyEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}) {
  // SPOUSE CONNECTION
  if (data?.relationship === "spouse") {
    // Position the line at the vertical center
    const spouseY = (sourceY + targetY) / 2;

    // Move the line outside the node boundaries
    const startX = sourceX + ROOT_NODE_WIDTH / 2;
    const endX = targetX - ROOT_NODE_WIDTH / 2;

    const path = `
      M ${startX} ${spouseY}
      L ${endX} ${spouseY}
    `;

    return (
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: "#111827",
          strokeWidth: 2.5,
        }}
      />
    );
  }

  // PARENT → CHILD CONNECTION
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    borderRadius: 12,
  });

  return (
    <BaseEdge
      id={id}
      path={path}
      style={{
        stroke: "#7d7d7d",
        strokeWidth: 2,
      }}
    />
  );
}