// const JunctionNode = () => {
//   return <div className="h-2 w-2 rounded-full opacity-0 pointer-events-none" />;
// };

// export default JunctionNode;

// VERSION 2

// import { Handle, Position } from "@xyflow/react";

//const JunctionNode = () => {
//   return (
//     <>
//       <Handle type="target" position={Position.Top} className="!opacity-0" />

//       <div className="h-1 w-1 rounded-full bg-transparent" />

//       <Handle type="source" position={Position.Bottom} className="!opacity-0" />
//     </>
//   );
// };

// export default JunctionNode;

// VERSION 3

import { Handle, Position } from "@xyflow/react";

const JunctionNode = () => {
  return (
    <div className="relative h-0 w-0">
      <Handle
        type="target"
        position={Position.Top}
        className="!h-0 !w-0 !border-0 !bg-transparent"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-0 !w-0 !border-0 !bg-transparent"
      />
    </div>
  );
};

export default JunctionNode;