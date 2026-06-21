const SpinLoader = () => {
    return (
        <div className="h-screen w-screen px-10 flex flex-col gap-5 justify-center items-center bg-[#2E5E99]">

            <div className="relative h-45 w-45 flex justify-center items-center">

                <div className="absolute inset-0 rounded-full border-4 border-slate-300 border-r-transparent animate-spin"></div>

                <div className="h-40 w-40 rounded-full flex justify-center items-center bg-white animate-pulse">
                    <img
                        src="/images/bgLogo.png"
                        className="h-full w-full object-contain"
                        alt=""
                    />
                </div>

            </div>
            <h1 className="text-white font-bold text-2xl">Family Diary</h1>

        </div>
    )
}

export default SpinLoader