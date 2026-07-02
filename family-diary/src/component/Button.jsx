import { FaPlus } from "react-icons/fa";
const Button = ({
  text = "Login",
  primary = false,
  long = true,
  loading = false,
  icon = false,
  onClick
}) => {
  return (
    <div className="flex justify-center items-center">
      <button onClick={onClick}
        className={`cursor-pointer ${primary ? "bg-[#2E5E99] text-white shadow-lg flex items-center justify-center gap-2  shadow-[#a8bed9]" : "bg-transparent border-2 border-[#2E5E99] text-[#2E5E99]"} ${long ? "min-w-full px-20 text-lg py-4 font-bold rounded-4xl" : "px-5 py-1 rounded-xl  font-semibold shadow-md shadow-gray-400"}  ${loading ? "opacity-60 cursor-not-allowed" : ""}`}>
        {loading && (
          <div className="h-5 w-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        )}
        {icon && <FaPlus />}
        {text}
      </button>
    </div>
  );
};

export default Button;
