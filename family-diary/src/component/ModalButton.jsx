import React from "react";

const ModalButton = ({ text = "Create", loading }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        className={`bg-[#2E5E99] text-white shadow-lg w-full  shadow-[#a8bed9] rounded-3xl py-3 font-bold text-xl flex gap-3 justify-center items-center ${loading ? "opacity-60" : ""}`}>
        {loading && (
          <div className="h-5 w-5 border-4 border-white rounded-full border-r-transparent animate-spin"></div>
        )}
        {text}
      </button>
    </div>
  );
};

export default ModalButton;
