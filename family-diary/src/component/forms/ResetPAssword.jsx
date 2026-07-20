import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import PasswordShowSheet from "../../utilities/PasswordShowSheet";
import BackgroundGradient from "../../utilities/BackgroundGradient";
import Button from "../Button";

const ResetPAssword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordSheet, setShowPasswordSheet] = useState(false);
  const [password, setPassword] = useState("");
  const [showCPassword, setShowCPassword] = useState(false);

  return (
    <div>
      <form>
        <div className="flex flex-col gap-5 items-center">
          <BackgroundGradient />
          <div className="flex flex-col gap-2 items-center mt-10 mb-10">
            <FiLock className="text-7xl text-[#2E5E99]" />
            <h1 className="text-2xl text-[#2E5E99]">Creatae New Password</h1>
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

            {showPasswordSheet && <PasswordShowSheet password={password} />}
          </div>
          <div className="relative w-80">
            <input
              type={showCPassword ? `text` : `password`}
              id="confirmPassword"
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
        </div>
        <div className="mt-10 px-6">
          <Button primary text="Reset" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ResetPAssword;
