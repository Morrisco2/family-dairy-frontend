import React from "react";
import { FaRegBell, FaImage } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { user } from "../utilities/userDemoData";

const WelcomeHeader = ({ name = "Morrisco Uffikairo Adibor" }) => {
  
  const navigate = useNavigate()

  const backgroundImageStyle = {
    backgroundImage:`url(${user[0].image})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "norepeat"
  }

  const currentUser = user?.[0];
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold">
        {currentUser?.name?.length > 22
          ? `${currentUser.name.slice(0, 22)}...`
          : currentUser?.name}
      </h1>
      <div className="flex items-center">
        <button onClick={() => navigate("/dashboard/notification")}>
          <div className="p-2 text-2xl text-[#2E5E99] font-semibold">
            <small className="text-sm bg-red-600 p-0.5 px-1 flex justify-center items-center text-gray-100 rounded-full relative top-2 right-2 ">
              10
            </small>
            <FaRegBell />
          </div>
        </button>
        <button
          className="flex justify-between items-center"
          onClick={() => navigate("/dashboard/my-profile")}>
          <div
            className="p-3 text-2xl h-10 w-10 bg-[#2E5E99] rounded-full text-gray-200 font-semibold"
            style={backgroundImageStyle}>
            {!user[0].image && <FaImage />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
