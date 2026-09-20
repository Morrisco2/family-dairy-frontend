import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import AlertToaster from "../toasters/AlertToaster";
import baseUrl from "../../utilities/BaseURL";

const CreateFamilyForm = ({ setCreateFamily }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ familyName: "" });
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    status: ""
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (!input.familyName) {
      setShowAlert((prev) => ({
        ...prev, show: true,
        message: "please enter family name!",
        status: "failed"
      }))
      setLoading(false);

      return
    }

    if (!input.familyName.toLowerCase().includes("family")) {
      setShowAlert((prev)=>({
        ...prev, show: true,
        message:"name must include the word 'Family' !",
        status: "failed"
      }))

      setLoading(false);
      return
    }

    if (input.familyName.toLowerCase() === "family") {
      setShowAlert((prev)=>({
        ...prev, show: true,
        message: "name can't be the word 'family' alone ",
        status:"failed"
      }))

      setLoading(false);
      return
    }


    const createFamily = async ()=>{
      try {
        const request = await fetch(`${baseUrl}/create-new-family`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(input)
        })

        const res = await request.json();

        if (res.status === "success") {
          setShowAlert((prev)=>({
            ...prev,
            show: true,
            message: res.message,
            status: "success"
          }))

          navigate("/dashboard")
          return
        }

        setShowAlert((prev)=>({
          ...prev, 
          show:true,
          message: res.message,
          status: "failed"
        }))
        setLoading(false)
        return
      } catch (error) {
        setShowAlert((prev)=>({
          ...prev, show: true,
          message: error.message,
          status: "failed"
        }))

        setLoading(false)
        return
      }
    }


    createFamily()

    // navigate("/dashboard");
  };
  return (
    <div
      className={`bg-[#E9F1FA] py-5 flex flex-col gap-6 px-5 rounded-2xl overflow-hidden `}>
      <div className="text-[#2E5E99] text-xl  flex items-center justify-end">

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
            type="submit"
          />
        </div>
      </form>
      {true && (
        <div>
          <AlertToaster
            show={showAlert.show}
            status={showAlert.status}
            message={showAlert.message}
            duration={5000}
            onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}
          />
        </div>
      )}
    </div>
  );
};

export default CreateFamilyForm;
