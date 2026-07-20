import MaleAvatar from "../assets/male-avatar.svg";
import FemaleAvatar from "../assets/female-avatar.svg";

const FamilyNode = ({ data, selected }) => {
  const avatar = data.gender === "female" ? FemaleAvatar : MaleAvatar;

  return (
    <div className="flex min-w-[120px] flex-col items-center">
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
        {data.name}
      </p>

      <p className="text-center text-base text-gray-500">{data.birthYear}</p>
    </div>
  );
};

export default FamilyNode;
