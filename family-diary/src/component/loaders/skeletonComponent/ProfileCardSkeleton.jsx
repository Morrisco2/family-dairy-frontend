const ProfileCardSkeleton = ({ forHome = false,  forMyProfile = false, forEvent = true }) => {
    return (
        <section className="h-45 flex justify-center items-center fade">

            <div className="h-45 w-90 px-3  rounded-3xl bg-gray-300 grid grid-cols-3 gap-4">

                {forHome && (
                    <>
                        <div className="col-span-2 flex flex-col justify-center gap-4">
                            <div className="h-15 w-15 rounded-full  bg-gray-400 "></div>
                            <div className="h-5 w-40 rounded bg-gray-400"></div>
                            <div className="h-5 w-50 rounded bg-gray-400"></div>
                        </div>

                        <div className="flex justify-center items-center">
                            <div className="h-7 w-15 rounded-2xl bg-gray-400"></div>
                        </div>
                    </>

                )}

                {forEvent && (
                    <div className="flex flex-col justify-center gap-4 ">
                        <div className="w-60 h-10 bg-gray-400"></div>
                        <div className="w-80 h-10 bg-gray-400"></div>
                    </div>
                )}

                {forMyProfile && (
                    <div className="w-82 grid grid-cols-3  gap-4">
                        <div className="flex justify-center items-center ">
                            <div className="w-25 h-25 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="col-span-2 flex flex-col items-center justify-center gap-3">
                            <div className="h-10 w-full bg-gray-400"></div>
                            <div className="h-8 w-full bg-gray-400"></div>
                        </div>
                    </div>
                )}

            </div>

        </section>
    )
}

export default ProfileCardSkeleton