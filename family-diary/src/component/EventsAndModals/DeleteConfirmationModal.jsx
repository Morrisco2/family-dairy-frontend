import React, { memo } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmationModal = ({ event, onCancel, onContinue }) => {
  if (!event) return null;

  const eventName = event.title || `${event.celebrant}'s Birthday`;

  return (
    <div className="bg-[#E9F1FA] rounded-2xl w-full max-w-sm px-6 py-8 animate-modal shadow-xl">

      <div className="flex justify-center mb-5">
        {/* <div className="w-18 h-18 rounded-full bg-red-100 flex items-center justify-center">
          <FaExclamationTriangle className="text-red-600 text-4xl" />
        </div> */}
      </div>

      {/* Heading */}

      <div className="">
        <h2 className="text-2xl font-bold text-[#2E5E99]">
          Delete {event.type}
        </h2>

        <p className="text-gray-600 mt-4 leading-relaxed">
          Are you sure you want to permanently delete
          <span className="font-semibold text-black ml-3">"{eventName}"</span>?
        </p>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-md border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white transition">
          Cancel
        </button>

        <button
          onClick={onContinue}
          className="px-5 py-2 rounded-md bg-red-700 text-white hover:bg-red-800 transition">
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(DeleteConfirmationModal);
