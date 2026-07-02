const TotalCardSkeleton = () => {
    return (
        <div className="flex gap-2 justify-center fade ">
            <div className="h-30 w-30 bg-gray-300 rounded-2xl flex flex-col gap-2 justify-center items-center">
                <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                <div className="w-15 h-4 rounded-2xl bg-gray-400"></div>
                <div className="w-25 h-4 rounded-2xl bg-gray-400"></div>
            </div>
            <div className="h-30 w-30 bg-gray-300 rounded-2xl flex flex-col gap-2 justify-center items-center">
                <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                <div className="w-15 h-4 rounded-2xl bg-gray-400"></div>
                <div className="w-25 h-4 rounded-2xl bg-gray-400"></div>
            </div>
            <div className="h-30 w-30 bg-gray-300 rounded-2xl flex flex-col gap-2 justify-center items-center">
                <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                <div className="w-15 h-4 rounded-2xl bg-gray-400"></div>
                <div className="w-25 h-4 rounded-2xl bg-gray-400"></div>
            </div>
            
        </div>

    )
}

export default TotalCardSkeleton