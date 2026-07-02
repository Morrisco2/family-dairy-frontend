import { FaRegBell } from "react-icons/fa";
const PageTitleCard = ({
  addBtn = false, icon = false,
  birthday = false, title = "Family Members",
  address = "No. 19, azumini, Port Harcourt",
  onClick,
  forProfile = false
}) => {
  return (
    <section className="min-h-26  ">
      <div
        className={`min-h-16  ${forProfile ? "bg-transparent" : "bg-[#2E5E99] py-4 px-5 "} rounded-2xl `}>
        {addBtn && (
          <div className="flex justify-between text-[#E9F1FA]">
            <h1 className="font-semibold text-lg">{title}</h1>
            <button
              onClick={onClick}
              className="bg-[#E9F1FA] text-[#2E5E99] h-8 w-8 rounded-full text-2xl flex justify-center items-center font-bold">
              +
            </button>
          </div>
        )}
        {birthday && (
          <div className="flex flex-col py-3 gap-2 justify-between text-[#E9F1FA]">
            <h1 className="font-semibold text-xl">{title}</h1>
            <p className="text-gray-300 text-sm">{address}</p>
          </div>
        )}
        {icon && (
          <div className="flex gap-3 items-center text-[#E9F1FA]">
            <div className="text-2xl">
              <FaRegBell />
            </div>
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
        )}
        {forProfile && (
          <div className="flex  justify-between text-[#2E5E99]">
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
        )}
      </div>
    </section>
  );
}

export default PageTitleCard