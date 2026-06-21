const Button = ({text = 'Login', primary = false, long = true}) => {
  return (
    <div className="flex justify-center items-center">
      <button className={`${primary? 'bg-[#2E5E99] text-white shadow-lg  shadow-[#a8bed9]':"bg-transparent border-2 border-[#2E5E99] text-[#2E5E99]"} ${long?"w-86 px-20 text-xl py-4 font-bold rounded-4xl":"px-5 py-1 rounded-xl  font-semibold shadow-md shadow-gray-400"} `}>{text}</button>
    </div>
  )
}

export default Button