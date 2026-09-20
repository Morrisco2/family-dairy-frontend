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

import { useCallback, useMemo, useState } from "react";
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

import { familyMembers as initialMembers } from "../data/dummyTree";

import { buildFamilyTree } from "../builders/buildFamilyTree";

import PersonDrawer from "../drawer/PersonDrawer";
import AddMemberModal from "../modal/AddMemberModal";

const nodeTypes = {
  family: FamilyNode,
  root: RootNode,
  junction: JunctionNode,
};

const TreeCanvas = () => {
  const [members, setMembers] = useState(initialMembers);

  const [selectedPerson, setSelectedPerson] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [relationType, setRelationType] = useState("offspring");

  const { nodes: generatedNodes, edges } = useMemo(
    () => buildFamilyTree(members),
    [members],
  );

  const [nodes, setNodes] = useState(generatedNodes);

  // Keep nodes in sync when members change
  useMemo(() => {
    setNodes(generatedNodes);
  }, [generatedNodes]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const handleNodeClick = useCallback((_, node) => {
    setSelectedPerson(node.data);
  }, []);

  const handleDelete = useCallback(() => {
    if (!selectedPerson) return;

    setMembers((prev) =>
      prev.filter((member) => member.id !== selectedPerson.id),
    );

    setSelectedPerson(null);
  }, [selectedPerson]);

  const handleAddMember = useCallback(
    (formData) => {
      if (!selectedPerson) return;

      const newId = String(Date.now());

      const newMember = {
        id: newId,

        name: formData.name,

        birthYear: formData.birthYear,

        gender: formData.gender,

        parents: relationType === "offspring" ? [selectedPerson.id] : [],

        spouses: [],

        children: [],

        isRoot: false,

        photo: null,
      };

      setMembers((prev) => {
        // Add offspring
        if (relationType === "offspring") {
          return [
            ...prev.map((member) =>
              member.id === selectedPerson.id
                ? {
                    ...member,
                    children: [...member.children, newId],
                  }
                : member,
            ),
            newMember,
          ];
        }

        // Add parent
        return [
          ...prev.map((member) =>
            member.id === selectedPerson.id
              ? {
                  ...member,
                  parents: [...member.parents, newId],
                }
              : member,
          ),
          {
            ...newMember,
            children: [selectedPerson.id],
          },
        ];
      });

      setShowModal(false);
    },
    [selectedPerson, relationType],
  );

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={handleNodeClick}
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

      <PersonDrawer
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
        onAddOffspring={() => {
          setRelationType("offspring");
          setShowModal(true);
        }}
        onAddParent={() => {
          setRelationType("parent");
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

      <AddMemberModal
        open={showModal}
        relationType={relationType}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddMember}
      />
    </div>
  );
};

export default TreeCanvas;