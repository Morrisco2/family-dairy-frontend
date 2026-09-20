import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Button from "../Button";
import { NavLink, useNavigate } from "react-router-dom";
import { PasswordStrength } from "../../utilities/PasswordStrength";
import PasswordShowSheet from "../../utilities/PasswordShowSheet";
import AlertToaster from "../toasters/AlertToaster";
import baseUrl from "../../utilities/BaseURL";
import { handleImageUpload } from "../../utilities/imageUpload";

const RegistrationForm = () => {
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [showPasswordSheet, setShowPasswordSheet] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("")
  const [cPassword, setCpassword] = useState("");
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    status: ""
  })
  const [input, setInput] = useState({
    name: "".toString().trim(),
    email: "".toString().trim(),
    phoneNumber: "".toString().trim(),
    dob: "".toString().trim(),
    role: "".toString().trim(),
    password: "".toString().trim(),
    image: null
  })

  const navigate = useNavigate()

  // password strength check
  const { checks, strength } = PasswordStrength(password);


  // handle input change
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInput((prev) => ({ ...prev, [name]: value }))

  }

  // Validate the input fields
  const inputValidator = () => {

    if (
      !input.name ||
      !input.email || !phone || !input.dob || !password ||
      !input.role
    ) {
      setShowAlert((prev) => ({
        ...prev, show: true,
        message: "Please fill all required field!",
        status: "failed"
      }))
      return ({ pass: false })
    } else {
      if (PasswordStrength(password).strength < 5) {
        setShowAlert((prev) => ({
          ...prev, show: true,
          message: "Create a stronger password",
          status: "failed"

        }))
        return ({ pass: false })
      } else {
        if (password.toString().trim() !== cPassword.toString().trim()) {
          setShowAlert((prev) => ({
            ...prev,
            show: true,
            message: "Password mismatch!",
            status: "failed",

          }))
          return ({ pass: false })
        }

      }

      return ({ pass: true })
    }



  }

  // handle form submission
  const handleSubmit = (event) => {
    setInput((prev) => ({
      ...prev, phoneNumber: phone, password: password
    }))
    event.preventDefault();

    const validatorResult = inputValidator()

    if (validatorResult.pass !== true) {
      return
    }

    console.log("the input is : ", input)

    const request = async () => {
      try {
        const req = await fetch(`${baseUrl}/register`, {
          method: "POST",
          headers: {
            'content-Type': "application/json",

          },
          body: JSON.stringify(input)

        })

        const res = await req.json()

        if (res.status !== "success") {
          setShowAlert((prev) => ({
            ...prev, show: true,
            message: res.message,
            status: "failed",
          }))

          return;
        }

        setShowAlert((prev) => ({
          ...prev, show: true,
          message: res.message,
          status: "success"
        }))

        navigate("/login")


      } catch (error) {
        setShowAlert((prev)=>({
          ...prev, show:true,
          message: error.message,
          status: "failed"
        }))


      }
    }


    request()
  }


  return (
    <div className="min-h-screen relative overflow-hidden flex justify-start flex-col py-5 items-center">
      <div
        className="
      fixed
      -top-24
      -left-24
      w-56
      h-56
      rounded-[45%_55%_50%_50%]
      bg-[#6BA8E5]
      blur-[70px]
      opacity-60
      animate-floating-blob
      pointer-events-none
      z-0
    ">
        <div
          className="
        absolute
        inset-5
        rounded-[50%_45%_55%_50%]
        bg-[#8CC6FF]
        blur-[40px]
        opacity-80
      "
        />
      </div>
      <div className="p-5 bg-gray-50 w-30 rounded-full shadow-xl shadow-gray-100 flex justify-center items-center">
        <img src="./public/images/logo.png" alt="" className="h-16" />
      </div>
      <div className="mt-10">
        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
          <legend className="text-[#2E5E99] text-2xl font-bold">
            Register
          </legend>
          <div className="flex flex-col gap-7">
            <div className="relative w-80">
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                placeholder=" "
                onChange={handleChange}
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
            <div className="relative w-80">
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
              />

              <label
                htmlFor="email"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                Email Address
              </label>
            </div>
            <div className="relative w-80">
              <label className="font-semibold" htmlFor="phone">
                Phone
              </label>
              <PhoneInput
                defaultCountry="ng"
                id="phone"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputClassName="!w-full !h-12 !bg-[#D0DDED] !border-none !outline-none !pl-3 !text-sm"
                countrySelectorStyleProps={{
                  buttonClassName: "!bg-[#D0DDED] !border-none !h-12",
                }}
              />
            </div>

            <div className="flex w-80 justify-between gap-4  items-end">
              <div className="relative flex-1">
                <label className="font-semibold" htmlFor="dob">
                  D.O.B
                </label>
                <input
                  type="date"
                  onChange={handleChange}
                  value={input.dob}
                  className="bg-[#D0DDED] h-12 px-3 "
                  id="dob"
                  name="dob"
                />
              </div>

              <div className="relative flex-1">
                <select
                  id="role"
                  name="role"
                  onChange={handleChange}
                  value={input.role}
                  required
                  className=" peer w-full h-12 px-3 bg-[#D0DDED] rounded-md outline-none appearance-none">
                  <option value="" disabled></option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="grandchild">Grand Child</option>
                  <option value="in-law">In-law</option>
                  <option value="grandfather">Grandfather</option>
                  <option value="grandmother">Grandmother</option>
                </select>

                <label
                  htmlFor="role"
                  className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200
                    peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 peer-focus:px-1
                    peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold peer-valid:text-blue-500  peer-valid:px-1 ">
                  Role
                </label>

                {/* Dropdown arrow */}
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-80">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordSheet(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowPasswordSheet(false);
                  }, 200);
                }}
                placeholder=" "
                className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none rounded-md"
              />

              <label
                htmlFor="password"
                className="
                absolute left-3 top-1/2 -translate-y-1/2
                text-gray-500 transition-all duration-200
                pointer-events-none
                peer-focus:top-0
                peer-focus:text-xs
                peer-focus:font-semibold
                peer-focus:text-blue-500
                peer-not-placeholder-shown:top-0
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:font-semibold
                peer-not-placeholder-shown:text-blue-500
              ">
                Create Password
              </label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>

              {showPasswordSheet && (
                <PasswordShowSheet password={password} />
              )}
            </div>

            <div className="relative w-80">
              <input
                type={showCPassword ? `text` : `password`}
                id="confirmPassword"
                onChange={(e) => setCpassword(e.target.value)}
                placeholder=" "
                className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
              />

              <label
                htmlFor="confirmPassword"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
                Confirm Password
              </label>

              <button
                type="button"
                onClick={() => setShowCPassword(!showCPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showCPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <div className="relative w-80">
              <label className="font-semibold " htmlFor="image">
                Profile Image(optional)
              </label>

              <input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => handleImageUpload(e, setInput, setShowAlert)}
                className="mt-2 w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md text-gray-400 flex "
              />
            </div>

            <div className=" w-80">
              <Button text="Register" primary type="submit" />
            </div>

            <p className="text-gray-500">
              Already have an account?{" "}
              <NavLink
                to={"/login"}
                className={"text-[#2E5E99] font-semibold ml-3"}>
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
      <div>
        {showAlert.show && (
          <div>
            <AlertToaster
              show={showAlert.show}
              message={showAlert.message}
              status={showAlert.status}
              duration={5000}
              onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
