import React, { useState } from "react";
import BackgroundGradient from "../utilities/BackgroundGradient";
import WelcomeHeader from "../component/WelcomeHeader";
import PageTitleCard from "../component/PageTitleCard";
import { useNavigate } from "react-router-dom";
import AddFamilyMember from "../component/AddFamilyMember";
import TotalValueCard from "../component/TotalValueCard";
import { FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "../component/SearchBar";
import MemberCard from "../component/MemberCard";
import PageTitleSkeleton from "../component/loaders/skeletonComponent/PageTitleSkeleton";
import TotalCardSkeleton from "../component/loaders/skeletonComponent/TotalCardSkeleton";
import MemberCardLoader from "../component/loaders/skeletonComponent/MemberCardLoader";
import EmptyFamilySearch from "../component/EmptyFamilySearch";
import MemberProfilePage from "./MemberProfilePage";
import {users} from "../utilities/userDemoData";

import { FaArrowLeft } from "react-icons/fa";

const FamilyMemberPage = () => {
  const [loaded, setLoaded] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [openMemberProfile, setOpenMemberProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null)

  const navigate = useNavigate();
  return (
    <div className=" z-20 ">
      <div></div>
      <div className="py-3 px-4 flex flex-col gap-5 pb-52 ">
        <div className="">
          <WelcomeHeader />
        </div>
        {loaded ? (
          <div className="">
            <PageTitleCard addBtn onClick={() => setAddModal(true)} />
          </div>
        ) : (
          <div className="mb-5">
            <PageTitleSkeleton />
          </div>
        )}
        {loaded ? (
          <div className="flex w-full gap-2 -mt-8 ">
            <div className="w-full ">
              <TotalValueCard />
            </div>
          </div>
        ) : (
          <div className="-mt-8 ">
            <TotalCardSkeleton />
          </div>
        )}
        <div>
          <SearchBar placeholder="Search Member..." />
        </div>
        <div className="mt-3 flex flex-col gap-3 ">
          <h1 className="text-2xl font-semibold text-[#2E5E99]">All Members</h1>
          {empty ? (
            <div className=" flex flex-col items-center">
              <EmptyFamilySearch text={"No Family Member"} />
              <p className="text-gray-500">
                {" "}
                Click on the + button to add member
              </p>
            </div>
          ) : (
            <div>
              {loaded ? (
                <div className="flex flex-col gap-5">
                    {users.map((user, index) => {
                      return (
                        <MemberCard
                          key={index}
                          user={user}
                        
                          onClick={() => { setOpenMemberProfile(true), setSelectedUser(user) }}
                        />
                      );
                   })}
                  
                </div>
              ) : (
                <div>
                  <MemberCardLoader />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {addModal && (
        <div className="fixed inset-0 bg-black/50 z-999 animate-modal">
          <AddFamilyMember
            setAddMember={setAddModal}
            setConfirmAdd={setConfirmAdd}
          />
          {confirmAdd && (
            <div className="fixed  overflow-scroll  z-9999 inset-0 bg-black/50 w-full animate-modal">
              <div className="min-h-screen flex justify-center items-center px-5">
                <div className="bg-[#E9F1FA] px-4 py-5 rounded-2xl flex flex-col gap-5">
                  <div className="text-xl flex justify-end font-semibold text-[#2E5E99]">
                    <button onClick={() => setConfirmAdd(false)}>X</button>
                  </div>
                  <div className="flex flex-col gap-6">
                    <p>
                      Are you sure you want to add {"Morrisco Tech"} to your
                      family?
                    </p>
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() => {
                          setConfirmAdd(false);
                        }}
                        className="flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-2 rounded-md ">
                        cancel
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-[#2E5E99] text-white px-3 py-2 rounded-md ">
                        continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {openMemberProfile && (
        <div className="bg-[#E9F1FA] fixed inset-0 animate-modal px-4 py-4 overflow-scroll md:px-72">
          <div className="text-[#2E5E99] mb-1">
            <button onClick={() => setOpenMemberProfile(false)}>
              <FaArrowLeft />
            </button>
          </div>
          <MemberProfilePage setSelectedUser = {selectedUser} />
        </div>
      )}
    </div>
  );
};

export default FamilyMemberPage;
