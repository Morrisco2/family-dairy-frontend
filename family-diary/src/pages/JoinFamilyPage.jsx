import { useState } from "react";

import Button from "../component/Button";
import EmptyFamilySearch from "../component/EmptyFamilySearch";
import FamilyListCard from "../component/FamilyListCard";
import SearchBar from "../component/SearchBar";
import CreateFamilyForm from "../component/forms/CreateFamilyForm";
import ListSkeleton from "../component/loaders/skeletonComponent/ListSkeleton";

import Pagination from "../component/Pagination";
import useSearchFilter from "../hooks/useSearchFilter";

const JoinFamilyPage = () => {
  const [createFamily, setCreateFamily] = useState(false);


  

  // BACKEND SEARCH AND PAGINATION
  const {
    data,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    clearSearch,
    refetch,
    resultCount,
    isSearching,
    isEmpty,
    pagination,
    goToPage,
  } = useSearchFilter({
    endpoint: "/search/family",
    limit: 3,
    debounceMs: 1000,
    initialPage: 1,
  });

  return (
    <div className="flex flex-col gap-8 px-4 py-5 overflow-hidden pb-40">

      {/* PAGE HEADER AND SEARCH */}
      <div className="w-full flex flex-col gap-2">

        <h1 className="text-lg text-[#2E5E99] mt-3">
          Join Or Create New Family
        </h1>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search families or family leaders..."
        />

      </div>

      {/* AVAILABLE FAMILIES */}
      <div className="flex flex-col gap-4">

        <div className="flex items-center justify-between">

          <h1 className="text-xl font-semibold">
            Available Families
          </h1>

          {!loading && !error && (
            <span className="text-sm text-gray-500">
              {isSearching
                ? `${resultCount} found`
                : `${resultCount} available`}
            </span>
          )}

        </div>

        {/* LOADING SKELETON */}
        {loading ? (

          <div className="flex flex-col gap-2">

            <ListSkeleton
              withIcon={false}
              isDouble={true}
            />

            <ListSkeleton
              withIcon={false}
              isDouble={true}
            />

            <ListSkeleton
              withIcon={false}
              isDouble={true}
            />

          </div>

        ) : error ? (

          /* ERROR STATE */
          <div className="flex flex-col items-center gap-2 py-8 text-center">

            <p className="text-red-500 text-sm">
              {error}
            </p>

            <button
              type="button"
              onClick={refetch}
              className="text-sm font-semibold text-[#2E5E99] hover:underline"
            >
              Try Again
            </button>

          </div>

        ) : isEmpty ? (

          /* NO MATCHING SEARCH RESULTS */
          <div className="flex flex-col items-center gap-3 mt-5 py-5">

            <EmptyFamilySearch />

            <div className="flex flex-col items-center gap-2">

              <h1 className="text-2xl font-semibold text-[#2E5E99]">
                {isSearching ? "No Matching Families" : "No Family Found"}
              </h1>

              <p className="text-sm text-gray-500 text-center">
                {isSearching
                  ? `We couldn't find any family matching "${searchTerm}".`
                  : "There are currently no available families. Create a new family instead."}
              </p>

            </div>

            {isSearching && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-sm font-semibold text-[#2E5E99] hover:underline"
              >
                Clear Search
              </button>
            )}

          </div>

        ) : (

          /* DISPLAY FAMILIES */
          <div className="flex flex-col gap-5">

            {data.map((family) => (

              <FamilyListCard
                key={family._id}
                familyName={family.familyName}
                leaderName={family.leader.name}
                image={family.leader.imageUrl}

                familyId = {family._id}
              />

            ))}

          </div>

        )}

        {/* REUSABLE PAGINATION */}
        {!loading && !error && data.length > 0 && (
          <Pagination
            pagination={pagination}
            onPageChange={goToPage}
          />
        )}

      </div>

      {/* CREATE FAMILY BUTTON */}
      <div className="fixed bottom-4 left-0 flex justify-center w-full pb-2 overflow-scroll">

        <Button
          primary
          text="Create Family"
          icon
          onClick={() => setCreateFamily(true)}
        />

      </div>

      {/* CREATE FAMILY MODAL */}
      {createFamily && (

        <div className="animate-modal fixed inset-0 bg-black/50 flex px-4 justify-center items-center">

          <div>
            <CreateFamilyForm
              setCreateFamily={setCreateFamily}
            />
          </div>

        </div>

      )}

    </div>
  );
};

export default JoinFamilyPage;


















// import { useEffect, useState } from "react";

// import Button from "../component/Button";
// import EmptyFamilySearch from "../component/EmptyFamilySearch";
// import FamilyListCard from "../component/FamilyListCard";
// import SearchBar from "../component/SearchBar";
// import CreateFamilyForm from "../component/forms/CreateFamilyForm";
// import ListSkeleton from "../component/loaders/skeletonComponent/ListSkeleton";
// import AlertToaster from "../component/toasters/AlertToaster";

// import useSearchFilter from "../hooks/useSearchFilter";
// import baseUrl from "../utilities/BaseURL";
// import { apiFetch } from "../utilities/apiRequest";

// const JoinFamilyPage = () => {
//   console.log("my page re-render");

//   // FAMILY DATA
//   const [data, setData] = useState([]);

//   // LOADING STATES
//   const [loading, setLoading] = useState(false);
//   const [loaded, setLoaded] = useState(false);

//   // MODAL STATE
//   const [createFamily, setCreateFamily] = useState(false);

//   // ALERT STATE
//   const [showAlert, setShowAlert] = useState({
//     show: false,
//     message: "",
//     status: ""
//   });

//   // REUSABLE SEARCH HOOK
//   const {
//     searchTerm,
//     setSearchTerm,
//     filteredData,
//     clearSearch,
//     resultCount,
//     isSearching,
//     isEmpty
//   } = useSearchFilter(data);

//   // FETCH FAMILIES FROM BACKEND
//   useEffect(() => {
//     let ignore = false;

//     const fetchFamilies = async () => {
//       try {
//         setLoaded(false);

//         const req = await apiFetch(
//           `${baseUrl}/family/fetch-family`,
//           {
//             method: "GET",
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json"
//             }
//           }
//         );

//         const res = await req.json();

//         if (!res.success) {
//           if (!ignore) {
//             setShowAlert((prev) => ({
//               ...prev,
//               show: true,
//               message: res.message,
//               status: "failed"
//             }));
//           }

//           return;
//         }

//         const formattedFamilies = res.data.map((item) => ({
//           _id: item._id,
//           familyName: item.familyName,
//           leaderName: item.leader?.name || "Unknown family leader",
//           leaderImg:
//             item.leader?.image || "/images/default-avatar.png"
//         }));

//         if (!ignore) {
//           setData(formattedFamilies);

//           console.log("Fetched families:", formattedFamilies);
//         }

//       } catch (error) {
//         console.error("Failed to fetch families:", error);

//         if (!ignore) {
//           setShowAlert((prev) => ({
//             ...prev,
//             show: true,
//             message: "Unable to fetch families. Please try again.",
//             status: "failed"
//           }));
//         }

//       } finally {
//         if (!ignore) {
//           setLoaded(true);
//         }
//       }
//     };

//     fetchFamilies();

//     return () => {
//       ignore = true;
//     };
//   }, []);

//   return (
//     <div className="flex flex-col gap-8 px-4 py-5 overflow-hidden pb-40">

//       {/* PAGE HEADER AND SEARCH */}
//       <div className="w-full flex flex-col gap-2">

//         <h1 className="text-lg text-[#2E5E99] mt-3">
//           Join Or Create New Family
//         </h1>

//         <SearchBar
//           value={searchTerm}
//           onChange={setSearchTerm}
//           placeholder="Search families or family leaders..."
//         />

//       </div>


//       {/* AVAILABLE FAMILIES */}
//       <div className="flex flex-col gap-2">

//         <div className="flex items-center justify-between">

//           <h1 className="text-xl font-semibold">
//             Available Families
//           </h1>

//           {loaded && data.length > 0 && (
//             <span className="text-sm text-gray-500">
//               {isSearching
//                 ? `${resultCount} found`
//                 : `${data.length} available`}
//             </span>
//           )}

//         </div>


//         {/* LOADING STATE */}
//         {!loaded ? (

//           <div className="flex flex-col gap-2">

//             <ListSkeleton
//               withIcon={false}
//               isDouble={true}
//             />

//             <ListSkeleton
//               withIcon={false}
//               isDouble={true}
//             />

//             <ListSkeleton
//               withIcon={false}
//               isDouble={true}
//             />

//           </div>

//         ) : (

//           <div>

//             {/* NO FAMILIES AVAILABLE */}
//             {data.length === 0 ? (

//               <div className="flex flex-col items-center gap-2 mt-2">

//                 <EmptyFamilySearch />

//                 <div className="flex flex-col items-center gap-2">

//                   <h1 className="text-3xl font-semibold text-[#2E5E99]">
//                     No Family Found
//                   </h1>

//                   <p className="text-lg text-gray-500">
//                     Create New Family instead
//                   </p>

//                 </div>

//               </div>

//             ) : (

//               <div>

//                 {/* NO SEARCH MATCHES */}
//                 {isEmpty ? (

//                   <div className="flex flex-col items-center gap-3 mt-5 py-5">

//                     <EmptyFamilySearch />

//                     <div className="flex flex-col items-center gap-2">

//                       <h1 className="text-2xl font-semibold text-[#2E5E99]">
//                         No Matching Families
//                       </h1>

//                       <p className="text-sm text-gray-500 text-center">
//                         We couldn't find any family matching
//                         "{searchTerm}".
//                       </p>

//                     </div>

//                     <button
//                       type="button"
//                       onClick={clearSearch}
//                       className="text-sm font-semibold text-[#2E5E99] hover:underline"
//                     >
//                       Clear Search
//                     </button>

//                   </div>

//                 ) : (

//                   /* DISPLAY FILTERED FAMILIES */
//                   <div className="flex flex-col gap-5">

//                     {filteredData.map((family) => (

//                       <FamilyListCard
//                         key={family._id}
//                         familyName={family.familyName}
//                         leaderName={family.leaderName}
//                         image={family.leaderImg}
//                       />

//                     ))}

//                   </div>

//                 )}

//               </div>

//             )}

//           </div>

//         )}

//       </div>


//       {/* CREATE FAMILY BUTTON */}
//       <div className="fixed bottom-4 left-0 flex justify-center w-full pb-2 overflow-scroll">

//         <Button
//           primary
//           text={`${loading ? "Creating.." : "Create Family"}`}
//           icon
//           loading={loading}
//           onClick={() => setCreateFamily(true)}
//         />

//       </div>


//       {/* CREATE FAMILY MODAL */}
//       {createFamily && (

//         <div className="animate-modal fixed inset-0 bg-black/50 flex px-4 justify-center items-center">

//           <div>
//             <CreateFamilyForm
//               setCreateFamily={setCreateFamily}
//             />
//           </div>

//         </div>

//       )}


//       {/* ALERT TOASTER */}
//       {showAlert.show && (

//         <AlertToaster
//           show={showAlert.show}
//           status={showAlert.status}
//           message={showAlert.message}
//           duration={4000}
//           onClose={() =>
//             setShowAlert((prev) => ({
//               ...prev,
//               show: false
//             }))
//           }
//         />

//       )}

//     </div>
//   );
// };

// export default JoinFamilyPage;
