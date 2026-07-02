import { useMemo, useState, useCallback } from "react";
import { FaUsers, FaCalendarCheck, FaClipboardList } from "react-icons/fa";

import WelcomeHeader from "../component/WelcomeHeader";
import ProfileCard from "../component/ProfileCard";
import TotalValueCard from "../component/TotalValueCard";

import ProfileCardSkeleton from "../component/loaders/skeletonComponent/ProfileCardSkeleton";
import TotalCardSkeleton from "../component/loaders/skeletonComponent/TotalCardSkeleton";

import EventSection from "../component/EventsAndModals/EventSection";
import EventDetailsModal from "../component/EventsAndModals/EventDetailsModal";

import eventsDemoData from "../utilities/eventsDemoData";
import { user } from "../utilities/userDemoData";

const HomePage = () => {
  const loaded = true;
  const empty = false;

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const { upcomingEvents, meetings, incidents } = useMemo(() => {
    return {
      upcomingEvents: eventsDemoData.filter(
        (item) => item.type === "events" || item.type === "birthday",
      ),

      meetings: eventsDemoData.filter((item) => item.type === "meeting"),

      incidents: eventsDemoData.filter((item) => item.type === "incident"),
    };
  }, []);

  return (
    <div className="py-3 px-4 flex flex-col gap-6 min-h-screen pb-48">
      <WelcomeHeader />

      {loaded ? (
        <ProfileCard homePage today user={user[0]} />
      ) : (
        <ProfileCardSkeleton forHome forEvent={false} />
      )}

      <div className="flex justify-center gap-2">
        {loaded ? (
          <>
            <TotalValueCard title="Total Incident" icon={<FaClipboardList />} />
          </>
        ) : (
          <TotalCardSkeleton />
        )}
      </div>

      <div className="mt-3">
        <EventSection
          title="Upcoming Events"
          emptyText="No Event Found"
          data={upcomingEvents}
          loaded={loaded}
          empty={empty}
          onSelect={handleSelectEvent}
        />
      </div>

      <EventSection
        title="Meetings"
        emptyText="No Meeting Found"
        data={meetings}
        loaded={loaded}
        empty={empty}
        onSelect={handleSelectEvent}
      />

      <EventSection
        title="Incidents"
        emptyText="No Incident Found"
        data={incidents}
        loaded={loaded}
        empty={empty}
        onSelect={handleSelectEvent}
      />

      <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
    </div>
  );
};

export default HomePage;
