import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../Button";
import BackgroundGradient from "../../utilities/BackgroundGradient";
import { useNavigate } from "react-router-dom";

const CreateFamilyForm = ({ setCreateFamily }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("success");
  const [message, setMessage] = useState("");
  const [created, setCreated] = useState(false);
  const [input, setInput] = useState({ familyName: "" });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setCreated(true);

    navigate("/dashboard");
  };
  return (
    <div
      className={`bg-[#E9F1FA] py-5 flex flex-col gap-6 px-5 rounded-2xl overflow-hidden `}>
      <div className="text-[#2E5E99] text-xl  flex items-center justify-end">
        {created && (
          <div
            className={`fixed top-10  min-w-80 max-w-screen py-1 px-2  ${status === "success" ? "text-green-800 bg-green-200 " : "bg-red-200 text-red-800"}`}>
            <p className="flex w-full  justify-center items-center">
              Created <span className="ml-5"> Loading...</span>{" "}
              <div className="h-4 w-4 border-2 border-r-transparent rounded-full animate-spin"></div>
            </p>
          </div>
        )}
        <button onClick={() => setCreateFamily(false)}>
          <FaTimes />
        </button>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl text-[#2E5E99] font-semibold">
          Create New Family
        </h1>
        <img
          src="./public/images/happy-big-family-standing-together-illustration_179970-403-removebg-preview.png"
          alt=""
          className="h-46"
        />
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="relative w-80 mt-4 mb-3">
          <input
            onChange={handleChange}
            value={input.familyName}
            name="familyName"
            // value={}
            // onChange={}
            type="text"
            id="familyName"
            placeholder=" "
            className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
          />

          <label
            htmlFor="familyName"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
            Family Name. (e.g: Morrison's Family)
          </label>
        </div>
        <div>
          <Button
            primary
            text={`${loading ? "Creating.." : "Create"}`}
            icon
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateFamilyForm;
