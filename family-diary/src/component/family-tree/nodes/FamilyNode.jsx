import MaleAvatar from "../assets/male-avatar.svg";
import { Handle, Position } from "@xyflow/react";
import FemaleAvatar from "../assets/female-avatar.svg";

export const FAMILY_NODE_SIZE = {
  width: 120,
  height: 130,
};

const FamilyNode = ({ data, selected }) => {
  const avatar = data.gender === "female" ? FemaleAvatar : MaleAvatar;

  return (
    <div
      className="flex flex-col items-center"
      style={{
        width: FAMILY_NODE_SIZE.width,
        height: FAMILY_NODE_SIZE.height,
      }}>
      <div
        className={`
          flex h-20 w-20 items-center justify-center rounded-full
          transition-all duration-200
          ${
            selected
              ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent"
              : ""
          }
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

      <p className="text-center text-lg font-medium text-[#2E5FA7]">
        {data.name.length> 20 ? data.name.slice(0, 28)+"..." :data.name}
      </p>

      <p className="text-center text-base text-gray-500">{data.birthYear}</p>
      <Handle type="target" position={Position.Top} className="!opacity-0" />

      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
    </div>
  );
};

export default FamilyNode;
