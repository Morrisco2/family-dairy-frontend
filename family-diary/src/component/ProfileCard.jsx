import { FaEdit, FaRegImage } from "react-icons/fa";

const ProfileCard = ({
  homePage = false,
  memberProfile = false,
  profile = false,
  today = false,
  user =[],
  onClick,
}) => {
  const backgroundImgStyle = {
    backgroundImage: `url(${user.image})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
  };
  return (
    <section className="min-h-36  ">
      <div
        className={` ${memberProfile ? "bg-transparent" : "bg-[#2E5E99]"} min-h-20 rounded-2xl  py-5`}>
        {homePage && (
          <div className="flex flex-col gap-2 px-4">
            <div className="flex gap-2 items-center">
              <div
                className="h-12 w-12 bg-[#E9F1FA] rounded-full border-2 border-[#E9F1FA] flex justify-center items-center text-3xl text-[#2E5E99]"
                style={backgroundImgStyle}>
                {!user.image && <FaRegImage />}
              </div>
              <div>
                <h1 className="font-semibold  text-white text-lg">{user.name}</h1>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2 text-gray-300">
                <p className=" font-">He's turning {user.age} next month</p>
                <small className="font-light">{user.dob}</small>
              </div>
              {today && (
                <button onClick={onClick} className="text-sm bg-[#E9F1FA] px-2 py-0.5 rounded-lg font-semibold text-[#2E5E99]">
                  send wish
                </button>
              )}
            </div>
          </div>
        )}

        {profile && (
          <div className="py-5 flex items-center gap-4 px-4">
            <div
              className="h-20 w-20 bg-[#E9F1FA] rounded-full  border-2 border-[#E9F1FA]"
              style={backgroundImgStyle}>
              <button onClick={onClick} className="bg-[#E9F1FA] p-1 rounded-full h-8 w-8 relative top-12 left-12 shadow-sm shadow-gray-600 flex text-xl justify-center items-center">
                <FaEdit />
              </button>
            </div>
            <div>
              <h1 className="font-semibold text-lg text-[#E9F1FA]">{user.name}</h1>
              <p className="text-gray-300 font-light">{user.email}</p>
            </div>
          </div>
        )}
        {memberProfile && (
          <div className=" flex items-center gap-4 -mt-8">
            <div
              className="h-20 w-20 bg-[#2E5E99] rounded-full  border-2 border-[#2E5E99]"
              style={backgroundImgStyle}></div>
            <div>
              <h1 className="font-bold text-lg text-[#2E5E99]">{user.name}</h1>
              <p className="text-gray-600 font-normal">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileCard;
