import MaleAvatar from "../assets/male-avatar.svg";
import FemaleAvatar from "../assets/female-avatar.svg";

const RootNode = ({ data, selected }) => {
  const avatar = data.gender === "female" ? FemaleAvatar : MaleAvatar;

  return (
    <div className="flex min-w-[170px] flex-col items-center">
      <div
        className={`
          flex h-28 w-28 items-center justify-center rounded-full transition-all duration-200
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

      <p className="mt-3 text-center text-2xl font-semibold text-[#2E5FA7]">
        {data.name}
      </p>

      <p className="text-lg text-gray-500">{data.birthYear}</p>
    </div>
  );
};

export default RootNode;
