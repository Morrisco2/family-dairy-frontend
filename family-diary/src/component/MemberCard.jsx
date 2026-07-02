const MemberCard = ({

  onClick,
  user = []
}) => {
  const backgroundImgStyle = {
    backgroundImage: `url(${user.image})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
  };
  return (
    <button className="w-full" onClick={onClick}>
      <div className="flex  gap-4 flex-wrap animate-modal">
        <div className="min-h-26 w-full bg-[#D0DDED] rounded-2xl px-4 py-5 flex flex-col gap-4 shadow-md shadow-gray-200">
          <div className="flex  items-center gap-3">
            <div
              className="h-15 w-15 bg-[#E9F1FA] rounded-full border-2 border-[#2E5E99] shadow-md shadow-gray-200"
              style={backgroundImgStyle}></div>

            <p className="font-semibold flex flex-col items-start text-gray-700">
              {user.name.slice(0, 30) + "..."}{" "}
              <span className="font-bold text-[#2E5E99]">({user.role})</span>
            </p>
          </div>
          <div className="flex justify-between text-gray-600 items-center">
            <p>{user.dob}</p>
            <p className="text-[#2E5E99] font-semibold bg-[#E9F1FA]  rounded-md px-2 flex justify-center items-center">
              {user.age} yrs
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default MemberCard