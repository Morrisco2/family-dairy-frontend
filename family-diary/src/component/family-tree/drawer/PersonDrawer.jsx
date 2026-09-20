import { useState , useEffect} from "react";
import { FaUser, FaBirthdayCake } from "react-icons/fa";
import { calculateAge } from "../utils/calculateAge";

const PersonDrawer = ({
  person,
  onClose,
  onAddOffspring,
  onAddParent,
  onDelete,
}) => {
const [age, setAge] = useState("");

useEffect(() => {
  if (person?.birthYear) {
    console.log(calculateAge(person?.birthYear))
    setAge(calculateAge(person?.birthYear));

      
      
    } 
}, [person]);


  return (
    <div
      className={` fixed top-0 right-0 z-999 h-full w-[340px] transform bg-[#E9F1FA] shadow-2xl animate-modal  ${
        person ? "translate-x-0" : "translate-x-full"
      }`}>
      {person && (
        <div className="flex h-full flex-col animate-modal">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-[#2E5FA7]">
              Person Details
            </h2>

            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="flex flex-col space-y-4 gap-5 p-5">
            <div className="flex gap-4 items-center">
              <div className="text-gray-500">
                <FaUser />
              </div>
              <p className="text-lg font-medium text-gray-900">{person.name}</p>
            </div>

            <div className="flex gap-4 items-center">
              <div className="text-gray-500">
                <FaBirthdayCake />
              </div>
              <p className="text-[#2E5FA7] flex justify-between w-full ">
                <span className="text-gray-500">{person.birthYear}</span>
                {!age ? person.birthYear : age} old
              </p>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm text-gray-500">Gender</p>
                <p className="capitalize text-gray-800">{person.gender}</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-sm text-gray-500">Children</p>
                <p className="text-gray-800">{person.children?.length || 0}</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-sm text-gray-500">Parents</p>
                <p className="text-gray-800">{person.parents?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className=" border-t border-gray-200 p-4 flex justify-between gap-3 mt-5">
            <button
              onClick={onDelete}
              className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700">
              Delete Node
            </button>

            <button
              onClick={onAddParent}
              className="w-full rounded-lg border border- px-3 py-3 text-sm font-medium text-white transition-colors bg-[#2E5FA7]">
              Add Node
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonDrawer;
