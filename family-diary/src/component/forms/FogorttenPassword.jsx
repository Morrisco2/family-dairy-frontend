import React from "react";
import Button from "../Button";
import { NavLink } from "react-router-dom";

const FogorttenPassword = () => {
  return (
    <div className="min-h-screen  flex justify-start flex-col py-5 items-center relative overflow-hidden ">
      <div
        className="
      absolute
      -top-24
      -left-24
      w-56
      h-56
      rounded-[45%_55%_50%_50%]
      bg-[#6BA8E5]
      blur-[70px]
      opacity-60
      animate-floating-blob
      pointer-events-none
      z-0
    ">
        <div
          className="
        absolute
        inset-5
        rounded-[50%_45%_55%_50%]
        bg-[#8CC6FF]
        blur-[40px]
        opacity-80
      "
        />
      </div>
      {/* Bottom Right Blob */}
      <div
        className="
      absolute
      -bottom-24
      -right-24
      w-56
      h-56
      rounded-[50%_45%_55%_45%]
      bg-[#6BA8E5]
      blur-[70px]
      opacity-60
      animate-floating-blob
      pointer-events-none
      z-0
    "
        style={{
          animationDelay: "2s",
        }}>
        <div
          className="
        absolute
        inset-5
        rounded-[45%_55%_50%_55%]
        bg-[#8CC6FF]
        blur-[40px]
        opacity-80
      "
        />
      </div>
      <div className="relative flex flex-col gap-5 items-center">
        <div className="p-5 bg-gray-50 w-30 rounded-full shadow-xl shadow-gray-100 flex justify-center items-center">
          <img src="./public/images/logo.png" alt="" className="h-16" />
        </div>

        <h1 className="text-[#2E5E99] mt-5 text-3xl font-semibold">
          Reset Password
        </h1>
        <div className="relative w-80 mt-10">
          <input
            type="email"
            id="email"
            placeholder=" "
            className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
          />

          <label
            htmlFor="email"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
            Email Address
          </label>
        </div>
        <div className="mt-5">
          <Button primary text="Submit" />
        </div>
        <div className="">
          <p className="text-gray-500 font-semibold">
            Continue to{" "}
            <NavLink to={"/login"} className={"text-[#2E5E99] font-bold ml-3"}>Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FogorttenPassword;
