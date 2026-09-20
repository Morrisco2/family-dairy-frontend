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
import { user } from "../utilities/userDemoData";
import ListSkeleton from "../component/loaders/skeletonComponent/ListSkeleton";
import SendWishForm from "../component/forms/SendWishForm";

const HomePage = () => {
  let loaded = true;
  let empty = false;

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openWishModal, setOpenWishModal] = useState(false)

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
        <ProfileCardSkeleton forHome forEvent={false}/>
      ) : (

        <ProfileCard homePage today user={user[0]} onClick={()=>setOpenWishModal(true)} />
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
          <SendWishForm closeModal = {setOpenWishModal} celebrant = {user[0]}/>
        </div>
      )}
    </div>
  );
};

export default HomePage;
