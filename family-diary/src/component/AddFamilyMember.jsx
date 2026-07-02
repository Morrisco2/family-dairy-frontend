import { useNavigate } from "react-router-dom";
import Button from "./Button";
import SearchBar from "./SearchBar";

const AddFamilyMember = ({ setAddMember, setConfirmAdd }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center items-center w-full min-h-screen  px-4 ">
        <div className="bg-[#E9F1FA] overflow-scroll py-6 px-5 w-full rounded-xl md:w-96 flex flex-col gap-5">
          <div className="text-xl flex justify-end font-semibold text-[#2E5E99]">
            <button onClick={() => setAddMember(false)}>X</button>
          </div>
          <h1 className="text-xl text-[#2E5E99]">
            Search or create new member
          </h1>
          <div className="">
            <SearchBar />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-[#2E5E99] text-xl font-semibold">Members</h1>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 items-center">
                <div className="bg-[#D0DDED] w-full py-2 px-3 flex justify-between items-center">
                  <h2 className="text-gray-7\800">Morrisco Tech</h2>
                  <button
                    onClick={() => setConfirmAdd(true)}
                    className="bg-[#2E5E99] text-[#D0DDED] px-2 py-1 rounded-xl">
                    Add
                  </button>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-[#D0DDED] w-full py-2 px-3 flex justify-between items-center">
                  <h2 className="text-gray-7\800">Morrisco Tech</h2>
                  <button
                    onClick={() => setConfirmAdd(true)}
                    className="bg-[#2E5E99] text-[#D0DDED] px-2 py-1 rounded-xl">
                    Add
                  </button>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-[#D0DDED] w-full py-2 px-3 flex justify-between items-center">
                  <h2 className="text-gray-7\800">Morrisco Tech</h2>
                  <button
                    onClick={() => setConfirmAdd(true)}
                    className="bg-[#2E5E99] text-[#D0DDED] px-2 py-1 rounded-xl">
                    Add
                  </button>
                </div>
              </div>
              
              
              <div className="mt-5">
                <Button
                  onClick={() => navigate("/register")}
                  primary
                  className={"w-full "}
                  text="Create New"
                  icon
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFamilyMember;
