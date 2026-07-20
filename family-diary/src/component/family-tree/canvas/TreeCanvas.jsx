import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  applyNodeChanges,
} from "@xyflow/react";

import FamilyNode from "../nodes/FamilyNode";
import RootNode from "../nodes/RootNode";

import { familyMembers } from "../data/dummyTree";
import { buildHierarchy } from "../builders/buildHierarchy";
import { calculateWidths } from "../builders/calculateWidths";
import { positionTree } from "../builders/positionTree";
import { buildEdges } from "../utils/buildEdges";

// Debug (remove later)
import { printPositions } from "../utils/printPositions";

const nodeTypes = {
  family: FamilyNode,
  root: RootNode,
};

// 1. Build hierarchy
const hierarchy = buildHierarchy(familyMembers);

// 2. Calculate subtree widths
calculateWidths(hierarchy);

// 3. Position every node
const positionedNodes = positionTree(hierarchy);

// Debug
printPositions(positionedNodes);

// 4. Generate edges
const initialEdges = buildEdges(familyMembers);

const TreeCanvas = () => {
  const [nodes, setNodes] = useState(positionedNodes);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  return (
    <div className="h-full w-full">
      <ReactFlow
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
