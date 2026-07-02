const ListSkeleton = ({ isDouble = false, withIcon= true }) => {
    return (
        <div className={`${withIcon? 'flex gap-5': 'grid grid-cols-2'} px-3 bg-gray-300 my-2 h-2/12 fade`}>
            <div className=" my-4 ">
                {isDouble && (
                    <div className=" h-10 flex items-center ">
                        <div className="bg-gray-400 h-7 w-full"></div>
                    </div>
                )}

                <div className={`${isDouble? 'h-10': "h-full"}  flex items-center `}>
                    {withIcon && (
                        <div className="w-18 h-18 bg-gray-400 rounded-full  ">
                            
                        </div>
                    )}
                    <div className={ `${isDouble?'h-7':' h-14' } ${withIcon?'hidden':""}  bg-gray-400  w-full`}></div>
                </div>
            </div>
            <div className=" flex justify-center items-center w-full">
                <div className= {`${withIcon? 'w-full':'w-30'} bg-gray-400 h-10  `}>

                </div>
            </div>
        </div>
    )
}

export default ListSkeleton