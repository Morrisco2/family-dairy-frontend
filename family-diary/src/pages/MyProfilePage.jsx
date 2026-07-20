import React, { use, useState } from "react";
import { PhoneInput } from "react-international-phone";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaEdit,
  FaUnlockAlt,
  FaPhoneAlt,
  FaRegEnvelope,
  FaTimes,
} from "react-icons/fa";
import ProfileCard from "../component/ProfileCard";
import PageTitleCard from "../component/PageTitleCard";
import { user } from "../utilities/userDemoData";
import ProfileCardSkeleton from "../component/loaders/skeletonComponent/ProfileCardSkeleton";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

const MyProfilePage = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(true);
  const [editPicture, setEditPicture] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [input, setInput] = useState({
    name: user[0].name || "",
    email: user[0].email || "",
    phone: user[0].phone || "",
    dob: user[0].dob || "",
    role: user[0].role || "",
  });
  const [loading, setLoading] = useState(false)

  const handleChangePassword = () => {
    const email = user[0].email;
    localStorage.setItem("email", email);
    navigate("/forget-password");
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="px-4 py-5 flex flex-col gap-5">
      <div>
        <div>
          <PageTitleCard forProfile title="My Profile" />
        </div>
        {loaded ? (
          <div className="-mt-13">
            {user.map((user) => {
              return (
                <ProfileCard
                  profile
                  user={user}
                  key={user.id}
                  onClick={() => setEditPicture(true)}
                />
              );
            })}
          </div>
        ) : (
          <div className="-mt-13">
            <ProfileCardSkeleton />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold text-[#2E5E99]">
            Account Details
          </h1>
          <button
            onClick={() => setEditDetail(true)}
            className="bg-amber-300 p-2 px-3 text-xl">
            <FaEdit />
          </button>
        </div>
        {user.map((item, index) => {
          return (
            <div
              key={item.id}
              className="bg-[#D0DDED] flex flex-col gap-2 px-4 py-5 rounded-2xl">
              <p className="flex items-center gap-3 text-gray-600">
                <span className="">
                  <FaRegEnvelope className="text-lg" />
                </span>
                {item.email}
              </p>
              <p className="flex items-center gap-3 text-gray-600">
                <span className="">
                  <FaPhoneAlt className="text-lg" />
                </span>
                {item.phone}
              </p>
              <p className="flex items-center gap-3 text-gray-600">
                <span className="">
                  <FaCalendarCheck className="text-lg" />
                </span>
                {item.dob}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold text-[#2E5E99]">
            Security Setting
          </h1>
        </div>
        <div className="bg-[#D0DDED] flex justify-between gap-2 px-4 py-5 rounded-2xl">
          <p className="flex items-center gap-3 text-gray-600">
            <span className="">
              <FaUnlockAlt className="text-lg" />
            </span>
            Change Password
          </p>
          <div>
            <Button
              long={false}
              primary
              text="Change"
              onClick={handleChangePassword}
            />
          </div>
        </div>
      </div>

      {/* MY PRECIOUS MODALS STARTS FROM HERE */}
      {editPicture && (
        <div className="fixed inset-0 bg-black/50 md:px-98 z-999 animate-modal px-4 flex justify-center items-center ">
          <div className="bg-[#E9F1FA] md:w-full rounded-2xl px-4 py-5 flex flex-col gap-5">
            <div className="text-2xl flex justify-between mb-4">
              <h1 className="text-xl font-semibold text-[#2E5E99]">
                Update Profile Picture
              </h1>
              <button onClick={() => setEditPicture(false)}>
                <FaTimes />
              </button>
            </div>
            <form className="flex flex-col gap-6">
              <div className="relative w-80">
                <label className="font-semibold " htmlFor="image">
                  Upload Image
                </label>

                <input
                  id="image"
                  type="file"
                  className="mt-2 w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md text-gray-400 flex "
                />
              </div>
              <div>
                <Button primary text="Upload" loading={loading} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT DETAIL MODAL */}

      {editDetail && (
        <div className="fixed inset-0 bg-black/50 md:px-98 z-999 animate-modal px-4 flex justify-center items-center ">
          <div className="bg-[#E9F1FA] md:justify-center md:items-center md:w-full rounded-2xl px-4 py-5 flex flex-col gap-5">
            <div className="text-2xl  w-full flex justify-between mb-4">
              <h1 className="text-xl font-semibold text-[#2E5E99]">
                Update Details
              </h1>
              <button onClick={() => setEditDetail(false)}>
                <FaTimes />
              </button>
            </div>
            <form className="flex flex-col gap-6">
              <div className="relative w-80">
                <input
                  type="text"
                  id="fullName"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
                />

                <label
                  htmlFor="fullName"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                  Full Name
                </label>
              </div>
              <div className="relative w-80">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
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
              <div className="relative w-80">
                <label className="font-semibold" htmlFor="phone">
                  Phone
                </label>
                <PhoneInput
                  defaultCountry="ng"
                  id="phone"
                  name="phone"
                  value={input.phone}
                  onChange={handleInputChange}
                  inputClassName="!w-full !h-12 !bg-[#D0DDED] !border-none !outline-none !pl-3 !text-sm"
                  countrySelectorStyleProps={{
                    buttonClassName: "!bg-[#D0DDED] !border-none !h-12",
                  }}
                />
              </div>
              <div className="flex w-80 justify-between gap-4  items-end">
                <div className="relative flex-1">
                  <label className="font-semibold" htmlFor="dob">
                    D.O.B
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={input.dob}
                    onChange={handleInputChange}
                    className="bg-[#D0DDED] h-12 px-3 "
                    id="dob"
                  />
                </div>

                <div className="relative flex-1">
                  <select
                    id="role"
                    defaultValue=""
                    name="role"
                    value={input.role}
                    onChange={handleInputChange}
                    required
                    className=" peer w-full h-12 px-3 bg-[#D0DDED] rounded-md outline-none appearance-none">
                    <option value="" disabled></option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="daughter">Daughter</option>
                    <option value="grandchild">Grand Child</option>
                  </select>

                  <label
                    htmlFor="role"
                    className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200
                    peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 peer-focus:px-1
                    peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold peer-valid:text-blue-500  peer-valid:px-1 ">
                    Role
                  </label>

                  {/* Dropdown arrow */}
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <Button primary text="Save Change" loading={loading} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
