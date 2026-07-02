import React, { useState, useRef } from "react";
import Button from "../Button";
import { NavLink, useNavigate } from "react-router-dom";
import ModalButton from "../ModalButton";
import BackgroundGradient from "../../utilities/BackgroundGradient";

const FogorttenPassword = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState({
    email: localStorage.getItem("email") || "",
  });
  const [verificationStatus, setVerificationStatus] = useState("idle");
  // idle | loading | success | error
  const [verificationMessage, setVerificationMessage] = useState("");

  // opt state handling
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Handles typing
  const handleOtpChange = (value, index) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const digit = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);

    // Move to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const token = newOtp.join("");

    // Auto submit when complete
    if (!newOtp.includes("") && token.length === 6) {
      handleTokenSubmit(token);
    }
  };

  // Handles Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handles Paste
  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = ["", "", "", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputRefs.current[Math.min(pasted.length - 1, 5)]?.focus();

    // Auto submit
    if (pasted.length === 6) {
      handleTokenSubmit(pasted);
    }
  };

  // handle token submission
  const handleTokenSubmit = async (token) => {
    try {
      setVerificationStatus("loading");

      // const response = await verifyToken(token);

      // your API call above

      setVerificationMessage("Verified Successfully");
      setVerificationStatus("success");

      setTimeout(() => {
        navigate("/reset-password");
      }, 500);

      setTimeout(() => {
        setVerificationStatus("idle");

        // Continue to next page here if needed
        // navigate("/dashboard");
      }, 1800);
    } catch (error) {
      setVerificationMessage(
        error?.response?.data?.message || "Verification Failed",
        setVerificationStatus("error"),
      );

      setVerificationStatus("error");

      setTimeout(() => {
        setVerificationStatus("idle");
      }, 1800);
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (!input.email) {
      setFailed(true);
      setMessage("Email field is empty");

      return;
    }

    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen  flex justify-start flex-col py-5 items-center relative overflow-hidden ">
      <BackgroundGradient />
      <div className="relative flex flex-col gap-5 items-center">
        <div className="p-5 bg-gray-50 w-30 rounded-full shadow-xl shadow-gray-100 flex justify-center items-center">
          <img src="./public/images/logo.png" alt="" className="h-16" />
        </div>

        <h1 className="text-[#2E5E99] mt-5 text-3xl font-semibold">
          Reset Password
        </h1>
        <div>
          {failed && (
            <p className={"text-red-600 text-lg  animate-bounce"}>{message}</p>
          )}
        </div>
        <form onSubmit={handleInputSubmit}>
          <div className="relative w-80 mt-10">
            <input
              name="email"
              value={input.email}
              onChange={handleInputChange}
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
          <div className="mt-5">
            <Button primary text="Submit" loading={isLoading} />
          </div>
        </form>
        <div className="">
          <p className="text-gray-500 font-semibold">
            Continue to{" "}
            <NavLink to={"/login"} className={"text-[#2E5E99] font-bold ml-3"}>
              Login
            </NavLink>
          </p>
        </div>
      </div>

      {submitted && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-8  animate-modal">
          <form
            onSubmit={handleTokenSubmit}
            className="relative bg-gray-100 py-10 px-4 rounded-2xl">
            <div className=" flex justify-end pr-5">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-[#2E5E99] text-2xl font-bold mb-3">
                X
              </button>
            </div>
            <h1 className="text-xl  mb-7   font-bold text-[#2E5E99]">
              enter the token sent to your email
            </h1>
            {/* <label htmlFor="" className="text-2xl font-bold text-[#2E5E99] ">
            Enter token
          </label> */}
            <div className="mt-3 flex gap-3 justify-center">
              {/* <input
                type="text"
                className="bg-[#D0DDED] w-10 h-10 rounded-lg focus:outline-[#2E5E99] text-3xl font-bold flex px-2 text-[#2E5E99]"
              />
              <input
                type="text"
                className="bg-[#D0DDED] w-10 h-10 rounded-lg focus:outline-[#2E5E99] text-3xl font-bold flex px-2 text-[#2E5E99]"
              />
              <input
                type="text"
                className="bg-[#D0DDED] w-10 h-10 rounded-lg focus:outline-[#2E5E99] text-3xl font-bold flex px-2 text-[#2E5E99]"
              />
              <input
                type="text"
                className="bg-[#D0DDED] w-10 h-10 rounded-lg focus:outline-[#2E5E99] text-3xl font-bold flex px-2 text-[#2E5E99]"
              />
              <input
                type="text"
                className="bg-[#D0DDED] w-10 h-10 rounded-lg focus:outline-[#2E5E99] text-3xl font-bold flex px-2 text-[#2E5E99]"
              />
              <input
                type="text"
                className="bg-[#D0DDED] w-10 h-10 rounded-lg focus:outline-[#2E5E99] text-3xl font-bold flex px-2 text-[#2E5E99]"
              /> */}

              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="bg-[#D0DDED] w-10 h-10 rounded-lg focus:outline-[#2E5E99] text-3xl font-bold flex px-2 text-[#2E5E99] text-center"
                />
              ))}
            </div>

            <p className="mt-4 text-gray-500">
              Token expires in{" "}
              <span className="font-semibold text-gray-600">1 hour</span>{" "}
              <button
                type="button"
                className="text-[#2E5E99] font-semibold pl-4 text-lg">
                Resend
              </button>{" "}
            </p>
            <div className="mt-5">
              <ModalButton text="Submit" />
            </div>

            {verificationStatus !== "idle" && (
              <div className="absolute inset-0 bg-[#D0DDED] backdrop-blur-sm flex items-center justify-center z-50">
                <div
                  className={`w-28 h-28 rounded-full flex items-center justify-center
      transition-all duration-500 scale-100 animate-pulse

      ${
        verificationStatus === "success"
          ? "bg-green-500"
          : verificationStatus === "error"
            ? "bg-red-500"
            : "bg-[#2E5E99]"
      }`}>
                  {verificationStatus === "loading" ? (
                    <svg
                      className="animate-spin w-12 h-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        opacity="0.3"
                      />

                      <path
                        fill="currentColor"
                        d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
                      />
                    </svg>
                  ) : verificationStatus === "success" ? (
                    <svg
                      className="w-14 h-14 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-14 h-14 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6l12 12M18 6L6 18"
                      />
                    </svg>
                  )}
                </div>

                <p
                  className={`absolute mt-40 text-lg font-semibold ${
                    verificationStatus === "success"
                      ? "text-green-600"
                      : verificationStatus === "error"
                        ? "text-red-600"
                        : "text-[#2E5E99]"
                  }`}>
                  {verificationStatus === "loading"
                    ? "Verifying..."
                    : verificationMessage}
                </p>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default FogorttenPassword;
