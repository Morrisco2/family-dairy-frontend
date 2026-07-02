import React from 'react'

const PageTitleSkeleton = () => {
  return (
    <div className="fade px-3 bg-gray-300 my-2 h-2/12 flex gap-20  py-2 justify-between w-full">
      <div className=" h-10 flex items-center  w-full">
        <div className="bg-gray-400 h-10 w-full rounded-2xl"></div>
      </div>
      <div className=" h-10 flex items-center ">
        <div className="bg-gray-400 h-10 w-10 rounded-full"></div>
      </div>
    </div>
  );
}

export default PageTitleSkeleton