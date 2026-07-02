import React, { useState } from 'react'
import WelcomeHeader from '../component/WelcomeHeader'
import PageTitleCard from '../component/PageTitleCard'
import ProfileCard from '../component/ProfileCard'
import { FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";

const MemberProfilePage = ({ setSelectedUser }) => {
 const [openDelete, setOpenDelete] = useState(false)
  
  return (
    <div className="flex flex-col gap-4 mb-72  min-h-screen ">
      <div>
        <PageTitleCard title="Member Profile" forProfile />
      </div>
      <div>
        <div>
          <ProfileCard
            memberProfile
           user={setSelectedUser}
          />
        </div>
        <div className="flex flex-col gap-4 -mt-10">
          <h1 className="text-[#2E5E99] text-xl font-semibold">
            Additional Information
          </h1>
          <div className="bg-[#D0DDED] py-4 px-3 rounded-2xl flex justify-between text-gray-600">
            <p className="font-semibold">Birthday</p>
            <p>{setSelectedUser.dob}</p>
          </div>

          <div className="py-4 flex gap-4 flex-col ">
            <h1 className="text-[#2E5E99] text-xl font-semibold">
              Contact Information
            </h1>
            <div className="bg-[#D0DDED] py-4 px-3 rounded-2xl flex flex-col gap-4  text-gray-600">
              <div className="flex justify-between">
                <p className="font-semibold flex items-center gap-2">
                  <FaEnvelope className="text-[#2E5E99] text-lg" />{" "}
                </p>
                <p>{setSelectedUser.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">
                  <FaPhone className="text-[#2E5E99] text-lg " />
                </p>
                <p>{setSelectedUser.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenDelete(true)}
              className="bg-red-500 px-3 py-1 text-gray-100 font-semibold rounded-lg">
              Remove
            </button>
            <p className="text-gray-500 font-semibold">From Family</p>
          </div>
        </div>
      </div>

      {openDelete && (
        <div className="fixed inset-0 bg-black/50 animate-modal flex justify-center items-center px-4">
          <div className="bg-[#E9F1FA] py-3 px-4 w-full rounded-2xl flex flex-col gap-5">
            <div className="flex justify-end">
              <button
                onClick={() => setOpenDelete(false)}
                className="text-2xl ">
                <FaTimes />
              </button>
            </div>
            <div>
              <h1 className="text-gray-600">
                Are you sure you want to remove{" "}
                <span className="text-[#2E5E99] font-semibold">
                  {setSelectedUser.name}
                </span>{" "}
                from your family?
              </h1>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenDelete(false)}
                className="bg-[#D0DDED] text-[#2E5E99] px-3 py-1  font-semibold rounded-lg">
                Cancel
              </button>
              <button
                onClick={() => setOpenDelete(false)}
                className="bg-red-500 px-3 py-1 text-gray-100 font-semibold rounded-lg">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberProfilePage