import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EventForm from "../component/forms/EventForm";
import BackgroundGradient from "../utilities/BackgroundGradient";
import WelcomeHeader from "../component/WelcomeHeader";
import PageTitleCard from "../component/PageTitleCard";
import TotalValueCard from "../component/TotalValueCard";
import PageTitleSkeleton from "../component/loaders/skeletonComponent/PageTitleSkeleton";
import TotalCardSkeleton from "../component/loaders/skeletonComponent/TotalCardSkeleton";
import EventList from "../component/EventList";
import eventsDemoData from "../utilities/eventsDemoData";
import ListSkeleton from "../component/loaders/skeletonComponent/ListSkeleton";
import { useNavigate } from "react-router-dom";
import EmptyFamilySearch from "../component/EmptyFamilySearch";

const IncidentPage = () => {
  const [loaded, setLoaded] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addEvent, setAddEvent] = useState(false);

   const events = eventsDemoData.filter((item) => {
     return item.type === "events" || item.type === "birthday";
   });

   const upcoming = events
     .filter((item) => {
       return item.status === "upcoming";
     })
     .slice(0, 4);

   const pastEvents = events
     .filter((item) => item.status === "completed")
     .slice(0, 4);

  const incidents = eventsDemoData.filter((item) => item.type === "incident");
  
  
  return (
    <div className="min-h-screen px-4 py-3 pb-20 flex flex-col gap-5">
      <div>
        <WelcomeHeader />
      </div>
      <div>
        {loaded ? (
          <PageTitleCard
            addBtn
            title="Incidents"
            onClick={() => setAddEvent(true)}
          />
        ) : (
          <div className="mb-8">
            <PageTitleSkeleton />
          </div>
        )}
      </div>
      <div className="-mt-8">
        {loaded ? (
          <TotalValueCard />
        ) : (
          <div>
            <TotalCardSkeleton />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-5 animate-modal">
        <h1 className="text-2xl font-semibold text-[#2E5E99]">Upcoming</h1>
        {loaded ? (
          <div>
            {empty ? (
              <div className="flex flex-col items-center">
                <EmptyFamilySearch text={"No Upcoming Events"} />{" "}
                <p className="text-gray-400">
                  Click on the (+) button to create
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {upcoming.map((event, index) => (
                  <button key={index} onClick={() => setSelectedEvent(event)}>
                    <EventList event={event} />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <ListSkeleton />
            <ListSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentPage;
