import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import EventForm from "../forms/EventForm";
import RegistrationForm from "../forms/RegistrationForm";
import SearchBar from "../SearchBar";
import AddFamilyMember from "../AddFamilyMember";
const AddButton = () => {
  const [add, setAdd] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [confirmAdd, setConfirmAdd] = useState(false);
  return (
    <div className=" ">
      <button onClick={() => setAdd(!add)}>
        <div className="bg-blue-800 text-2xl fixed text-gray-50 p-4 rounded-full bottom-28 right-5 md:right-52 md:bottom-6  shadow-lg shadow-blue-500">
          <FaPlus />
        </div>
      </button>
      {add && (
        <div className="bg-gray-200 fixed shadow-2xl animate-modal shadow-gray-400 text-[#2E5E99] text-xl  px-5 py-2 bottom-28 right-20">
          <div className="flex justify-end mb-2 ">
            {" "}
            <button onClick={() => setAdd(false)}>X</button>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button onClick={() => setAddEvent(true)}>Add Event</button>
            <button onClick={() => setAddMember(true)}>Add Member</button>
          </div>
        </div>
      )}
      {addEvent && (
        <div className="fixed z-9999 inset-0 bg-black/50 w-full animate-modal">
          <div className="flex justify-center items-center w-full min-h-screen px-4">
            <EventForm setAddEvent={setAddEvent} />
          </div>
        </div>
      )}
      {addMember && (
        <div className="fixed  overflow-scroll z-9999 inset-0 bg-black/50 w-full animate-modal">
          <AddFamilyMember
            setAddMember={setAddMember}
            setConfirmAdd={setConfirmAdd}
          />
          {confirmAdd && (
            <div className="fixed  overflow-scroll z-9999 inset-0 bg-black/50 w-full animate-modal">
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
                        className="flex items-center justify-center gap-2 bg-[#2E5E99] text-white px-3 py-2 rounded-md ">
                        cancel
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-red-700 text-white px-3 py-2 rounded-md ">
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
    </div>
  );
};

export default AddButton;
