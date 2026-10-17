import { useMemo, useState, useCallback } from "react";
import { FaClipboardList } from "react-icons/fa";

import WelcomeHeader from "../component/WelcomeHeader";
import ProfileCard from "../component/ProfileCard";
import TotalValueCard from "../component/TotalValueCard";

import ProfileCardSkeleton from "../component/loaders/skeletonComponent/ProfileCardSkeleton";
import TotalCardSkeleton from "../component/loaders/skeletonComponent/TotalCardSkeleton";

import EventSection from "../component/EventsAndModals/EventSection";
import EventDetailsModal from "../component/EventsAndModals/EventDetailsModal";

import eventsDemoData from "../utilities/eventsDemoData";
import { user, users } from "../utilities/userDemoData";
import ListSkeleton from "../component/loaders/skeletonComponent/ListSkeleton";
import SendWishForm from "../component/forms/SendWishForm";
import Button from "../component/Button";
import AlertToaster from "../component/toasters/AlertToaster";
import baseUrl from "../utilities/BaseURL";

const HomePage = () => {
  let loaded = true;
  let empty = false;

  const [showAlert, setShowAlert] = useState({
    show: false,
    status: "",
    message: ""

  })

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openWishModal, setOpenWishModal] = useState(false);

  const [selectFather, setSelectFather] = useState(false)

  const [father, setFather] = useState({ father: "" })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFather((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitFather = (event) => {
    event.preventDefault()

    if (!father.father) {
      setShowAlert((prev) => ({
        ...prev,
        show: true,
        status: "failed",
        message: "please select father!"
      }))

      return
    }


    const saveFather = async () => {
      try {

        const req = await fetch(`${baseUrl}/home/save-father`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        })

        const res = await req.json()

        if (res.status.toLowerCase() === "success") {
          setSelectFather(true)
        }

      } catch (error) {

        return (
          setShowAlert((prev) => ({
            ...prev, show: true,
            status: "failed",
            message: error.message
          }))
        )


      }
    }

    saveFather()

  }


  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const { upComingBirthday, upcomingEvents, meetings, incidents } =
    useMemo(() => {
      return {
        upComingBirthday: eventsDemoData.filter(
          (item) => item.type === "birthday" && item.status === "upcoming",
        ),

        upcomingEvents: eventsDemoData.filter(
          (item) => item.type === "meeting" || item.type === "events",
        ),

        incidents: eventsDemoData.filter((item) => item.type === "incident"),
      };
    }, []);

  return (
    <div className="py-3 px-4 flex flex-col gap-6 min-h-screen pb-48">
      <WelcomeHeader />

      {!loaded ? (
        <ProfileCardSkeleton forHome forEvent={false} />
      ) : (

        <ProfileCard homePage today user={user[0]} onClick={() => setOpenWishModal(true)} />
      )}

      <div className="flex justify-center gap-2">
        {!loaded ? (
          <>
            <TotalCardSkeleton />
          </>
        ) : (
          <TotalValueCard title="Total Incident" icon={<FaClipboardList />} />
        )}
      </div>

      <div className="mt-3">
        {!loaded ? (
          <div>
            <h2 className="text-2xl font-semibold text-[#2E5E99] mb-4">Upcoming Birthday</h2>
            <ListSkeleton />
          </div>
        ) : (
          <div>
            <EventSection
              title="Upcoming Birthday"
              emptyText="No Event Found"
              data={upComingBirthday}
              loaded={loaded}
              empty={empty}
              onSelect={handleSelectEvent}
            />
          </div>
        )}
      </div>

      <div className="mt-3">
        {!loaded ? (
          <div>
            <h2 className="text-2xl font-semibold text-[#2E5E99] mb-4">Upcoming Events</h2>
            <ListSkeleton />
          </div>
        ) : (
          <div>
            <EventSection
              title="Upcoming Events"
              emptyText="No Meeting Found"
              data={upcomingEvents}
              loaded={loaded}
              empty={empty}
              onSelect={handleSelectEvent}
            />

          </div>
        )}
      </div>

      <div className="mt-3">
        {!loaded ? (
          <div>
            <h2 className="text-2xl font-semibold text-[#2E5E99] mb-4">Incidents</h2>
            <ListSkeleton />
          </div>
        ) : (
          <div>
            <EventSection
              title="Incidents"
              emptyText="No Incident Found"
              data={incidents}
              loaded={loaded}
              empty={empty}
              onSelect={handleSelectEvent}
            />


          </div>
        )}
      </div>


      <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
      {openWishModal && (
        <div className="fixed inset-0   bg-black/50 z-999 flex justify-center items-center px-4 animate-modal overflow-scroll">
          <SendWishForm closeModal={setOpenWishModal} celebrant={user[0]} />
        </div>
      )}
      {selectFather && (
        <div className="fixed inset-0 bg-black/50 z-999 flex justify-center items-center w-full px-5 animate-modal">
          <form onSubmit={handleSubmitFather} className="bg-[#E9F1FA] rounded-2xl w-full max-w-sm px-6 py-8 animate-modal shadow-xl flex flex-col gap-5">
            <div className="flex justify-between">
              <legend className="text-lg font-bold text-[#2E5E99]  ">Who's your father?</legend>
              <button
                type="button"
                className="bg-[#D0DDED] px-4 rounded-2xl py-1 text-[#2E5E99]"
                onClick={() => setSelectFather(false)}
              >skip</button>
            </div>

            <small className="text-gray-500 ">skip if you can't find your father on the list</small>


            <div className="relative flex-1  ">
              <select
                id="name"
                name="father"
                onChange={handleChange}
                value={father.father}
                required
                className=" peer w-full h-12 px-3 bg-[#D0DDED] rounded-md outline-none appearance-none">
                <option value="" disabled></option>
                {users.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}

              </select>

              <label
                htmlFor="role"
                className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200
                    peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 peer-focus:px-1
                    peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold peer-valid:text-blue-500  peer-valid:px-1 ">
                Select Father
              </label>

              {/* Dropdown arrow */}
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div>
              <Button primary text="Save" type="submit" />
            </div>
          </form>
        </div>
      )}

      <div>
        <AlertToaster
          show={showAlert.show} status={showAlert.status}
          message={showAlert.message}
          duration={4000}
          onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}
        />
      </div>
    </div>
  );
};

export default HomePage;