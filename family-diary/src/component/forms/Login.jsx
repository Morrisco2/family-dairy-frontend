import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../Button";
import { NavLink, useNavigate } from "react-router-dom";
import BackgroundGradient from "../../utilities/BackgroundGradient";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!input.email || !input.password) {
      setLoading(false);
      setStatus("failed");
      setMessage("Fill the Form Completely");
      return;
    }
    setLoading(true);
    navigate("/join-family");
  };

  const handleAlert = () => {
    setStatus("failed")
  }
  return (
    <div className="min-h-screen  flex justify-start flex-col py-5 items-center relative  ">
      <BackgroundGradient />
      <div className="p-5 bg-gray-50 w-30 rounded-full shadow-xl shadow-gray-100 flex justify-center items-center">
        <img src="./public/images/logo.png" alt="" className="h-16" />
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-7 ">
        <div className="flex justify-center mb-10">
          <legend className="text-[#2E5E99] text-2xl font-bold">Login</legend>
        </div>
        {status === "failed" && (
          <div className="flex justify-center ">
            <p
              className={`text-red-600 animate-bounce bg-red-50 py-2 items-center w-full flex justify-center rounded-lg shadow-sm shadow-red-300  font-semibold}`}>
              {message}
            </p>
          </div>
        )}
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
            <NavLink
              to={"/forget-password"}
              className={"text-[#2E5E99] ml-2 font-semibold"}>
              Reset
            </NavLink>
          </p>
        </div>

        <div className="w-80 mt-5">
          <Button primary loading={loading} onClick={handleAlert} />
        </div>
        <div>
          <p className="text-gray-500">
            Don't have an account?{" "}
            <NavLink
              to={"/register"}
              className={"text-[#2E5E99] ml-2 font-semibold"}>
              Register
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
