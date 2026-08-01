// import { useCallback, useState } from "react";
// import {
//   Background,
//   Controls,
//   ReactFlow,
//   applyNodeChanges,
// } from "@xyflow/react";

// import FamilyNode from "../nodes/FamilyNode";
// import RootNode from "../nodes/RootNode";
// import JunctionNode from "../nodes/JunctionNode";
// import { edgeTypes } from "../edges/edgeTypes";

// import { familyMembers } from "../data/dummyTree";

// import { buildFamilyTree } from "../builders/buildFamilyTree";

// const nodeTypes = {
//   family: FamilyNode,
//   root: RootNode,
//   junction: JunctionNode,
// };

// const { nodes: initialNodes, edges: initialEdges } = buildFamilyTree(familyMembers);

// const TreeCanvas = () => {
//   const [nodes, setNodes] = useState(initialNodes);

//   const onNodesChange = useCallback((changes) => {
//     setNodes((nds) => applyNodeChanges(changes, nds));
//   }, []);

//   return (
//     <div className="relative h-full w-full">
//       <ReactFlow
//         edgeTypes={edgeTypes}
//         nodes={nodes}
//         edges={initialEdges}
//         onNodesChange={onNodesChange}
//         nodeTypes={nodeTypes}
//         fitView
//         minZoom={0.3}
//         maxZoom={2.5}
//         zoomOnScroll
//         zoomOnPinch
//         zoomOnDoubleClick={false}
//         panOnDrag
//         panOnScroll={false}
//         nodesDraggable={false}
//         nodesConnectable={false}
//         elementsSelectable>
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default TreeCanvas;

// VERSION 2 (SPOUSE FEATURE)

import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  applyNodeChanges,
} from "@xyflow/react";

import FamilyNode from "../nodes/FamilyNode";
import RootNode from "../nodes/RootNode";
import JunctionNode from "../nodes/JunctionNode";
import { edgeTypes } from "../edges/edgeTypes";

import { familyMembers } from "../data/dummyTree";

import { buildFamilyTree } from "../builders/buildFamilyTree";

const nodeTypes = {
  family: FamilyNode,
  root: RootNode,
  junction: JunctionNode,
};

const { nodes: initialNodes, edges: initialEdges } =
  buildFamilyTree(familyMembers);

const TreeCanvas = () => {
  const [nodes, setNodes] = useState(initialNodes);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={initialEdges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={2.5}
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        panOnDrag
        panOnScroll={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeCanvas;