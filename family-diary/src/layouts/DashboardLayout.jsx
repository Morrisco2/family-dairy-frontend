import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBan } from "react-icons/fa";
import BackgroundGradient from "../utilities/BackgroundGradient";
import Button from "../component/Button";
import Navbar from "../component/staticComponents/Navbar";
import AddButton from "../component/staticComponents/AddButton";

const DashboardLayout = () => {
  const token = "h";
  const navigate = useNavigate();

  if (!token) {
    return (
      <div>
        <BackgroundGradient />
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
          <FaBan className="text-7xl text-red-600" />
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-[#2E5E99] font-semibold">
              Access Denied!
            </h1>
            <h2 className="text-gray-500 font-semibold">
              Please Login before accessing this page
            </h2>
          </div>
          <div className="mt-4">
            <Button primary onClick={() => navigate("/login")} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="pb-20">
      <Outlet />
      <div>
        <AddButton />
          <Navbar />
      </div>
    </div>
  );
};

export default DashboardLayout;
