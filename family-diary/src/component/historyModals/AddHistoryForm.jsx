import React, { useState } from "react";
import Button from "../Button";
import AlertToaster from "../toasters/AlertToaster";

const AddHistoryForm = () => {
  const [isLoading, setIsLoading ] = useState(false)
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    status: "",
  });
  const [input, setInput] = useState({
    name: "",
    birthYear: "",
    deathYear: null,
    description: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {name,birthYear, description} = input
    if (
      !name ||
      !birthYear ||
      !description
    ) {
      setShowAlert((prev) => ({
        ...prev,
        show: true,
        message: "complete the form filling",
        status: "failed",
      }));
      return;
    }
    setIsLoading(true);
    const payload = input;
    setShowAlert((prev) => ({
      ...prev, show: true,
      status: "success",
      message:"History Created"
    }))
    setIsLoading(false)

    localStorage.removeItem("startWith");
    localStorage.setItem("created", true)
    location.reload()
  };

  return (
    <div className="animate-modal inset-0 fixed px-4 bg-black/50 z-999 flex justify-center items-center">
      <form action="" className="w-full" onSubmit={handleSubmit}>
        <div className="bg-[#E9F1FA] py-5 px-4 rounded-2xl w-full flex flex-col gap-5">
          <h1 className="text-xl font-semibold text-[#2E5E99]">
            Add The Person
          </h1>

          <>
            <div className="relative w-full">
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
              />

              <label
                htmlFor="name"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                Full Name
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="number"
                id="birth"
                name="birthYear"
                value={input.birthYear}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
              />

              <label
                htmlFor="name"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                Birth Year
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="number"
                id="death"
                name="deathYear"
                value={input.deathYear}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
              />

              <label
                htmlFor="death"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                Death Year (Optional)
              </label>
            </div>

            <div className="relative w-full">
              <textarea
                type="text"
                id="description"
                name="description"
                value={input.description}
                onChange={handleChange}
                placeholder=" "
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="peer w-full min-h-20 px-3 py-5 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
              />

              <label
                htmlFor="description"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                Short Description here...
              </label>
            </div>
          </>
          <Button
            primary
            icon
            text={`${isLoading ? "Creating..." : "Create"}`}
            type="submit"
            loading={isLoading}
          />
        </div>
      </form>

      <div>
        <AlertToaster
          show={showAlert.show}
          message={showAlert.message}
          status={showAlert.status}
          duration={5000}
          onClose={(prev) => setShowAlert({ ...prev, show: false })}
        />
      </div>
    </div>
  );
};

export default AddHistoryForm;
