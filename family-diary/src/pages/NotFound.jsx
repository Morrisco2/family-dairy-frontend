import React from "react";
import { FaLowVision } from "react-icons/fa";
import Button from "../component/Button";
import BackgroundGradient from "../utilities/BackgroundGradient";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate()
  return (
      <div className="flex flex-col justify-center items-center h-screen gap-10">
          <BackgroundGradient />
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold text-[#2E5E99]">404</h1>
        <h1 className="text-2xl ">page not found</h1>
      </div>
      <Button primary onClick={()=>navigate("/login")} />
    </div>
  );
};

export default NotFound;
