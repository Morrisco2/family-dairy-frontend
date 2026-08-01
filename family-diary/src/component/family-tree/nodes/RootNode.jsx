import MaleAvatar from "../assets/male-avatar.svg";
import { Handle, Position } from "@xyflow/react";
import FemaleAvatar from "../assets/female-avatar.svg";

export const ROOT_NODE_SIZE = {
  width: 170,
  height: 200,
};

const RootNode = ({ data, selected }) => {
  const avatar = data.gender === "female" ? FemaleAvatar : MaleAvatar;

  return (
    <div
      className="flex flex-col items-center"
      style={{
        width: ROOT_NODE_SIZE.width,
        height: ROOT_NODE_SIZE.height,
      }}>
      <div
        className={`
          flex h-32 w-32 items-center justify-center rounded-full transition-all duration-200
          ${selected ? "ring-4 ring-blue-500 ring-offset-2" : ""}
        `}>
        {data.photo ? (
          <img
            src={data.photo}
            alt={data.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <img
            src={avatar}
            alt={data.gender}
            className="h-full w-full object-contain"
          />
        )}
      </div>

      <p className="mt-3 text-center text-xl font-semibold text-[#2E5FA7]">
        {data.name}
      </p>

      <p className="text-lg text-gray-500">{data.birthYear}</p>
      <Handle type="target" position={Position.Top} className="!opacity-0" />

      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
    </div>
  );
};

export default RootNode;
