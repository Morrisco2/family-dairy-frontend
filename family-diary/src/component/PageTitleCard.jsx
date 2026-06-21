const PageTitleCard = ({
  addBtn = false, icon = false,
  birthday = false, title = "Family Members",
  address = "No. 19, azumini, Port Harcourt",
}) => {
  return (
    <section className="min-h-26  px-4">
      <div className={`min-h-16 bg-[#2E5E99] rounded-2xl px-5 py-4`}>
        {addBtn && (
          <div className="flex justify-between text-[#E9F1FA]">
            <h1 className="font-semibold text-lg">{title}</h1>
            <button className="bg-[#E9F1FA] text-[#2E5E99] h-8 w-8 rounded-full text-2xl flex justify-center items-center font-bold">+</button>
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
            <div>#</div>
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
        )}

        <div className="flex justify-between text-[#E9F1FA]">
          <h1 className="font-semibold text-lg">{title}</h1>
        </div>

      </div>
    </section>
  )
}

export default PageTitleCard