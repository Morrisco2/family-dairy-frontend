import { NavLink } from "react-router-dom";

import Button from "../component/Button";
import EventCard from "../component/EventCard";
import EventList from "../component/EventList";
import FamilyListCard from "../component/FamilyListCard";
import Login from "../component/forms/Login";
import RegistrationForm from "../component/forms/RegistrationForm";
import Navbar from "../component/staticComponents/Navbar";
import MemberCard from "../component/MemberCard";
import { useState } from "react";
import SpinLoader from "../component/loaders/SpinLoader";

const LandingPage = () => {
  const [display, setDisplay] = useState(false)
  setTimeout(() => {
    setDisplay(true)
  }, 2000);
  return (
    <section className="relative min-h-screen overflow-hidden">
      {display ? (
        <div className="relative min-h-screen overflow-hidden ">
          {/* Top Left Blob */}
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

          {/* Your Content */}
          <div className="relative z-10 py-5 px-5">
            <div className="flex justify-center">
              <img
                src="./public/images/family-illustraytion.png"
                className="h-72"
                alt=""
              />
            </div>
            <div className="mt-4">
              <h1 className="text-3xl text-[#2E5E99] mb-4">
                Stay connected with what matters most.
              </h1>
              <p className="text-sm text-gray-500">
                Family Diary helps you manage family members, track birthdays,
                and organize events, all in one simple, shared space.
              </p>
            </div>
            <div className="flex flex-col gap-5 mt-8">
              <NavLink to={"/login"}>
                <Button primary />
              </NavLink>
              <NavLink to={"/register"}>
                <Button text="Register" />
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <SpinLoader />
        </div>
      )}
    </section>
  );
};

export default LandingPage;
