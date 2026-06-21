const ProfileCard = ({ 
    homePage = false, memberProfile = true, 
    profile = false, today = false, 
    name = "Uffikairo Morrison Adibor", 
    age = 35, dob = "Apr. 14",
    email = "morriscotech@gmail.com",
    role = "Son"
    }) => {
    const backgroundImage = {
        backgroundImage: 'url(./public/images/morrisco.jpg)'
    }
    return (
        <section className="min-h-36  px-4">
            <div className={` ${memberProfile? 'bg-transparent':'bg-[#2E5E99]'} min-h-20 rounded-2xl px-5 py-5`}>
                {homePage && (
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            <div className="h-12 w-12 bg-[#E9F1FA] rounded-full border-2 border-[#E9F1FA]" style={backgroundImage}></div>
                            <div><h1 className="font-semibold  text-white">{name}</h1></div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-2 text-gray-200">
                                <p className=" font-">He's turning {age} next month</p>
                                <small className="font-light">{dob}</small>
                            </div>
                            {today && (
                                <button className="text-sm bg-[#E9F1FA] px-2 py-0.5 rounded-lg font-semibold text-[#2E5E99]">send wish</button>
                            )}
                        </div>
                    </div>
                )}

                {profile && (
                    <div className="py-5 flex items-center gap-4">
                        <div className="h-20 w-20 bg-[#E9F1FA] rounded-full  border-2 border-[#E9F1FA]">
                            <button className="bg-[#E9F1FA] p-1 rounded-full h-8 w-8 relative top-12 left-12 shadow-sm shadow-gray-600">ed</button>
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg text-[#E9F1FA]">{name}</h1>
                            <p className="text-gray-300 font-light">{email}</p>
                        </div>
                    </div>
                )}
                {memberProfile && (
                    <div className="py-5 flex items-center gap-4">
                        <div className="h-20 w-20 bg-[#2E5E99] rounded-full  border-2 border-[#2E5E99]">
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-[#2E5E99]">{name}</h1>
                            <p className="text-gray-600 font-normal">{role}</p>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

export default ProfileCard