import { FaSearch } from "react-icons/fa";

const SearchBar = ({placeholder = "Seacrh your family.."}) => {
  return (
    <div className="px-4 flex items-center ">
        <input type="search" className="bg-[#D0DDED] w-full h-12 rounded-2xl px-2 " placeholder= {placeholder} />
        <FaSearch className="text-[#2E5E99] text-2xl absolute right-8 font-light focus:border-0 active:border-0 "/>
    </div>
  )
}

export default SearchBar