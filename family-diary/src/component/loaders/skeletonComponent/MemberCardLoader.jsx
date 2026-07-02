import React from 'react'

const MemberCardLoader = () => {
  return (
    <div>
      <div className="flex  flex-col gap-3 justify-center my-5 fade ">
        <div className="h-50 w-full bg-gray-300 rounded-2xl flex flex-col justify-center gap-5 px-2">
          <div className="h-8 w-8 rounded-full bg-gray-400"></div>
          <div className="h-6 w-30 bg-gray-400"></div>
          <div className="h-6 w-45 flex gap-3">
            <div className=" h-4 w-25 bg-gray-400"></div>
            <div className="h-4 w-8 bg-gray-400"></div>
          </div>
        </div>
        <div className="h-50 w-full bg-gray-300 rounded-2xl flex flex-col justify-center gap-5 px-2">
          <div className="h-8 w-8 rounded-full bg-gray-400"></div>
          <div className="h-6 w-30 bg-gray-400"></div>
          <div className="h-6 w-45 flex gap-3">
            <div className=" h-4 w-25 bg-gray-400"></div>
            <div className="h-4 w-8 bg-gray-400"></div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default MemberCardLoader