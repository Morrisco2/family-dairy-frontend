import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../Button";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({email:"", password:""})
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({ ...prev, [name]: value }))
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <div className="min-h-screen  flex justify-start flex-col py-5 items-center relative overflow-hidden ">
      <div
        className="
      absolute
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
      {/* Bottom Right Blob */}
      <div
        className="
      absolute
      -bottom-24
      -right-24
      w-56
      h-56
      rounded-[50%_45%_55%_45%]
      bg-[#6BA8E5]
      blur-[70px]
      opacity-60
      animate-floating-blob
      pointer-events-none
      z-0
    "
        style={{
          animationDelay: "2s",
        }}>
        <div
          className="
        absolute
        inset-5
        rounded-[45%_55%_50%_55%]
        bg-[#8CC6FF]
        blur-[40px]
        opacity-80
      "
        />
      </div>
      <div className="p-5 bg-gray-50 w-30 rounded-full shadow-xl shadow-gray-100 flex justify-center items-center">
        <img src="./public/images/logo.png" alt="" className="h-16" />
      </div>

      <form className="mt-10 flex flex-col gap-7 ">
        <div className="flex justify-center mb-10">
          <legend className="text-[#2E5E99] text-2xl font-bold">Login</legend>
        </div>
        <div className="flex flex-col gap-7">
          <div className="relative w-80">
            <input
              name="email"
              value={input.value}
              onChange={handleChange}
              type="email"
              id="email"
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
        </div>

        <div className="relative w-80">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={input.password}
            onChange={handleChange}
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
        </div>
        <div>
          <p className="text-gray-500">
            Forget Password?
            <NavLink to={'/forget-password'} className={"text-[#2E5E99] ml-2 font-semibold"}>
              Reset
            </NavLink>
          </p>
        </div>

        <div className="w-80 mt-5">
          <Button primary />
        </div>
        <div>
          <p className="text-gray-500">
            Don't have an account?{" "}
            <NavLink
              to={"/register"}
              className={"text-[#2E5E99] ml-2 font-semibold"}>
              Register
            </NavLink>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
