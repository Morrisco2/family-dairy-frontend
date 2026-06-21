const TotalValueCard = ({ icon, value = 25, title = "Total Members" }) => {
    return (
        <div className="flex gap-3 px-4">
            <div className="min-h-20 w-30 bg-[#D0DDED] rounded-2xl py-1 px-2 flex flex-col gap-1 justify-center items-center shadow-md shadow-gray-200  ">
                <div className="h-10 w-10 bg-gray-50 rounded-full">
                    
                </div>
                <div className="flex flex-col justify-center items-center a">
                    <h1 className="font-bold text-lg">{value}</h1>
                    <small className="text-gray-700">{title}</small>
                </div>
            </div>
           
        </div>
    )
}

export default TotalValueCard