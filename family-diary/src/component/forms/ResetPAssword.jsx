import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import PasswordShowSheet from "../../utilities/PasswordShowSheet";
import BackgroundGradient from "../../utilities/BackgroundGradient";
import Button from "../Button";
import AlertToaster from "../toasters/AlertToaster";
import { PasswordStrength } from "../../utilities/PasswordStrength";
import baseUrl from "../../utilities/BaseURL";
import { useNavigate } from "react-router-dom";

const ResetPAssword = () => {
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordSheet, setShowPasswordSheet] = useState(false);
  const [password, setPassword] = useState("");
  const [showCPassword, setShowCPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    status: ""
  })

  const navigate = useNavigate()

  const handleChangeConfirmPassword = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setConfirmPassword(value)

  }

  const passwordStrengthCheck = () => {
    const strength = PasswordStrength(password).strength
    if (strength < 5) {
      return ({ pass: false, message: "weak password" })
    }

    return ({ pass: true, message: "strong password" })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)

    if (!password) {
      setShowAlert((prev) => ({
        ...prev, show: true,
        message: "please create new password",
        status: "failed"
      }))
      setSubmitted(false)
      return;
    }
    if (!passwordStrengthCheck().pass) {
      setShowAlert((prev) => ({
        ...prev, show: true,
        message: "Please Create a stronger password",
        status: "failed"
      }))
      setSubmitted(false)
      return
    }
    if (!confirmPassword) {
      setShowAlert((prev) => ({
        ...prev, show: true,
        message: "confirm the password",
        status: "failed"
      }))
      setSubmitted(false)
      return
    }
    if (password.toString().trim() !== confirmPassword.toString().trim()) {
      setShowAlert((prev) => ({
        ...prev, show: true,
        message: "Password Mismatch!",
        status: "failed"

      }))
      setSubmitted(false)
      return
    }


    const changePassword = async () => {
      try {
        const request = await fetch(`${baseUrl}/reset-password`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(password)
        })

        const res = await request.json();

        if (res.status !== "success") {
          setShowAlert((prev) => ({
            ...prev, show: true,
            message: res.message,
            status: "failed"
          }))

          return;
        }

        setShowAlert((prev) => ({
          ...prev, show: true,
          message: res.message,
          status: "success"
        }))

        navigate("/login");

        return

      } catch (error) {
        setShowAlert((prev) => ({
          ...prev, show: true,
          message: error.message,
          status: "failed"
        }))

        setSubmitted(false)

        navigate("/login");
        return
      }
    }

    changePassword()


  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
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
              name="password"
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
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
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
          <Button primary text="Reset" loading={submitted} type="submit" />
        </div>
      </form>

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
  );
};

export default ResetPAssword;
