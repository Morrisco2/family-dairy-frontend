// // import { buildHierarchy } from "./buildHierarchy";
// // import { calculateWidths } from "./calculateWidths";
// // import { assignCoordinates } from "./assignCoordinates";
// // import { buildReactFlowNodes } from "./buildReactFlowNodes";
// // import { buildRelationshipGraph } from "./buildRelationshipGraph";
// // import { buildEdges } from "../edges/buildEdges";

// // export function buildFamilyTree(members) {
// //   const hierarchy = buildHierarchy(members);
// //   calculateWidths(hierarchy);
// //   assignCoordinates(hierarchy);
// //   const familyNodes = buildReactFlowNodes(hierarchy);

// //   const edges = buildEdges(familyNodes);

// //   return {
// //     nodes: familyNodes,
// //     edges,
// //   };
// // }

// // VERSION 2
// import { buildHierarchy } from "./buildHierarchy";
// import { calculateWidths } from "./calculateWidths";
// import { assignCoordinates } from "./assignCoordinates";
// import { buildReactFlowNodes } from "./buildReactFlowNodes";

// export function buildFamilyTree(members) {
//   const hierarchy = buildHierarchy(members);

//   calculateWidths(hierarchy);

//   assignCoordinates(hierarchy);

//   const nodes = buildReactFlowNodes(hierarchy);

//   const edges = [];

//   nodes.forEach((child) => {
//     child.data.parents.forEach((parentId) => {
//       edges.push({
//         id: `${parentId}-${child.id}`,
//         source: parentId,
//         target: child.id,
//         type: "family",
//       });
//     });
//   });

//   return {
//     nodes,
//     edges,
//   };
// }

// VERSION 2 (SPOUSE FEATURE)

import { buildHierarchy } from "./buildHierarchy";
import { calculateWidths } from "./calculateWidths";
import { assignCoordinates } from "./assignCoordinates";
import { buildReactFlowNodes } from "./buildReactFlowNodes";

export function buildFamilyTree(members) {
  // Create lookup table
  const memberMap = Object.fromEntries(
    members.map((member) => [member.id, member]),
  );

  const hierarchy = buildHierarchy(members);

  calculateWidths(hierarchy);

  assignCoordinates(hierarchy);

  const nodes = buildReactFlowNodes(hierarchy, memberMap);

  const edges = [];

  // Parent → Child edges
  nodes.forEach((child) => {
    const parents = child.data.parents || [];

    if (parents.length === 0) return;

    // Single parent
    if (parents.length === 1) {
      edges.push({
        id: `${parents[0]}-${child.id}`,
        source: parents[0],
        target: child.id,
        type: "family",
      });

      return;
    }

    // Two parents: connect only from the father
    const fatherId = parents.find(
      (parentId) => memberMap[parentId]?.gender === "male",
    );

    // Fallback if no male parent exists
    const sourceParent = fatherId || parents[0];

    edges.push({
      id: `${sourceParent}-${child.id}`,
      source: sourceParent,
      target: child.id,
      type: "family",
    });
  });

  // Spouse ↔ Spouse edges
  const spousePairs = new Set();

nodes.forEach((node) => {
  (node.data.spouses || []).forEach((spouseId) => {
    const spouse = memberMap[spouseId];
    if (!spouse) return;

    const pairKey = [node.id, spouseId].sort().join("-");

    if (spousePairs.has(pairKey)) return;

    spousePairs.add(pairKey);

    // Always draw from husband → wife
    let source = node.id;
    let target = spouseId;

    if (node.data.gender === "female" && spouse.gender === "male") {
      source = spouseId;
      target = node.id;
    }

    edges.push({
      id: `spouse-${pairKey}`,
      source,
      target,
      type: "family",
      data: {
        relationship: "spouse",
      },
    });
  });
});

  return {
    nodes,
    edges,
  };
}