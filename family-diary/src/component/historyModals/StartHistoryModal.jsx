import React, { useEffect, useState } from "react";
import Button from "../Button";

const StartHistoryModal = ({ submit = false }) => {
  const [startWith, setStartWith] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(submit);
  const alreadyStarted = localStorage.getItem("startWith");
  const created = localStorage.getItem("created")

  const handleSubmit = (event) => {
      event.preventDefault();
    
    const firstHistory = startWith;
    console.log(firstHistory);
    localStorage.setItem("startWith", startWith);
    localStorage.setItem("step", 1);
    setSubmitted(!submit);
    location.reload();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setStartWith(() => value);
  };

  useEffect(() => {
    if (submitted) {
      alert("submitted");
    }
  }, []);
  return (
    <div
      className={`${submitted || alreadyStarted || created=== "true" ? "hidden" : ""} inset-0 fixed bg-black/50 z-999 px-4 flex justify-center items-center animate-modal `}>
      <div className="bg-[#E9F1FA] py-5 px-3 rounded-2xl flex flex-col gap-5">
        <h1 className="font-semibold text-gray-600 text-lg">
          Who would you like your family story to begin with?
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="bg-[#D0DDED] px-2 py-4 flex flex-col gap-2">
            <div>
              <input
                type="radio"
                id="greatGrandfather"
                name="startHistory"
                value="Great-Grandfather"
                onChange={handleChange}
                className=""
              />{" "}
              <label htmlFor="greatGrandfather" className="text-gray-500">
                Great-Grandfather
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="greatGrandmother"
                value="Great-Grandmother"
                onChange={handleChange}
                name="startHistory"
              />{" "}
              <label htmlFor="greatGrandmother" className="text-gray-500">
                Great-Grandmother
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="grandFather"
                value="Grandfather"
                onChange={handleChange}
                name="startHistory"
              />{" "}
              <label htmlFor="grandFather" className="text-gray-500">
                Grandfather
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="grandmother"
                value="Grandmother"
                onChange={handleChange}
                name="startHistory"
              />{" "}
              <label htmlFor="grandmother" className="text-gray-500">
                Grandmother
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="father"
                value="Father"
                onChange={handleChange}
                name="startHistory"
              />{" "}
              <label htmlFor="father" className="text-gray-500">
                Father
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="mother"
                value="Mother"
                onChange={handleChange}
                name="startHistory"
              />{" "}
              <label htmlFor="mother" className="text-gray-500">
                Mother
              </label>
            </div>
          </div>

          <div className="mt-3">
            <Button primary text="Next" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartHistoryModal;
