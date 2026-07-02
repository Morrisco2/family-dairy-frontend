import React, { useState } from "react";
import { FaListAlt } from "react-icons/fa";
import BackgroundGradient from "../utilities/BackgroundGradient";
import WelcomeHeader from "../component/WelcomeHeader";
import SearchBar from "../component/SearchBar";
import FamilyListCard from "../component/FamilyListCard";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import CreateFamilyForm from "../component/forms/CreateFamilyForm";
import ListSkeleton from "../component/loaders/skeletonComponent/ListSkeleton";
import EmptyFamilySearch from "../component/EmptyFamilySearch";

const JoinFamilyPage = () => {
  console.log("my page re-render");

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [createFamily, setCreateFamily] = useState(false);

  return (
    <div className="flex flex-col gap-8 px-4 overflow-hidden pb-40">

      <div className="w-full flex flex-col gap-2">
        <WelcomeHeader />
        <h1 className="text-lg text-[#2E5E99] mt-3">
          Join Or Create New Family
        </h1>
        <SearchBar list={data} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Available Families</h1>
        <div>
          {loaded ? (
            <div>
              {empty ? (
                <div className="flex flex-col items-center gap-2 mt-5">
                  <EmptyFamilySearch />
                  <div className="flex flex-col items-center gap-2">
                    <h1 className="text-3xl font-semibold text-[#2E5E99]">
                      No family Found
                    </h1>
                    <p className="text-lg text-gray-500">
                      Create New Family instead
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <FamilyListCard />
                  <FamilyListCard />
                  <FamilyListCard />
                  <FamilyListCard />
                </div>
              )}
            </div>
          ) : (
            <div>
              <ListSkeleton withIcon={false} isDouble={true} />
              <ListSkeleton withIcon={false} isDouble={true} />
              <ListSkeleton withIcon={false} isDouble={true} />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-4  left-0 flex justify-center  w-full  pb-2 overflow-scroll">
        <Button
          primary
          text={`${loading ? "Creating.." : "Create Family"}`}
          icon
          loading = {loading}
          onClick={() => {
            (setCreateFamily(true), console.log("hello"));
          }}
        />
      </div>

      {createFamily && (
        <div
          className="animate-modal fixed inset-0 bg-black/50 flex px-4 justify-center items-center">
          <div className="">
            <CreateFamilyForm setCreateFamily={setCreateFamily} />
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinFamilyPage;
