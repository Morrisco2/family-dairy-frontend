import React, { useMemo, useState, useCallback } from "react";
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
import SearchBar from "../component/SearchBar";
import EventSection from "../component/EventsAndModals/EventSection";
import EventDetailsModal from "../component/EventsAndModals/EventDetailsModal";


const EventsPage = () => {
  const [loaded, setLoaded] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addEvent, setAddEvent] = useState(false);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const { events, upcoming, pastEvents, incidents } = useMemo(() => {
    return {
      events: eventsDemoData.filter(
        (item) => item.type === "events" || item.type === "birthday",
      ),

      upcoming: eventsDemoData.filter(
        (item) =>
          (item.type === "events" || item.type === "birthday") &&
          item.status === "upcoming",
      ),
      pastEvents: eventsDemoData.filter(
        (item) =>
          (item.type === "events" || item.type === "birthday") &&
          item.status === "completed",
      ),

      incidents: eventsDemoData.filter((item) => item.type === "incident"),
    };
  }, []);


  return (
    <div className="min-h-screen px-4 py-3 pb-20 flex flex-col gap-5">
      <div>
        <WelcomeHeader />
      </div>
      <div>
        {loaded ? (
          <PageTitleCard
            addBtn
            title="Events"
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
        <div className="mt-5">
          <SearchBar placeholder="search events..." />
        </div>
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
                <EventSection
                  emptyText="No incident Found"
                  data={upcoming}
                  loaded={loaded}
                  empty={empty}
                  onSelect={handleSelectEvent}
                />
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
      <div className="flex flex-col gap-4 mt-5">
        <h1 className="text-2xl font-semibold text-[#2E5E99]">Past Events</h1>
        {loaded ? (
          <div>
            {empty ? (
              <div className="flex flex-col items-center">
                <EmptyFamilySearch text={"No past Events"} />
                <p className="text-gray-400">
                  Click on the (+) button to create
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <EventSection
                  emptyText="No incident Found"
                  data={pastEvents}
                  loaded={loaded}
                  empty={empty}
                  onSelect={handleSelectEvent}
                />
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

      <div>
        <div className="flex justify-between text-2xl font-semibold mb-4 mt-3">
          <h1 className="text-[#2E5E99]">Incidents</h1>
        </div>
        <div>
          {empty ? (
            <div className=" flex flex-col items-center ">
              <EmptyFamilySearch text={"No Incident Found"} />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {loaded ? (
                <div className="flex flex-col gap-4">
                  <EventSection
                    emptyText="No incident Found"
                    data={incidents}
                    loaded={loaded}
                    empty={empty}
                    onSelect={handleSelectEvent}
                  />
                </div>
              ) : (
                <div>
                  <ListSkeleton />
                </div>
              )}
              <div className="text-[#2E5E99] flex justify-end">
                {/* <NavLink>view More</NavLink> */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* {selectedEvent && (
        <div className="fixed inset-0 z-9999 bg-black/40 flex justify-center items-center px-5 ">
          {!openDelete && (
            <div className="bg-[#E9F1FA] rounded-2xl w-full max-w-sm px-6 py-8 animate-modal">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl mb-3 font-bold text-[#2E5E99]">
                  {selectedEvent.type} Details
                </h2>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-xl">
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="text-xl font-semibold  justify-between mb-5">
                  <div className="flex gap-3">
                    {selectedEvent.title ?? selectedEvent.celebrant}{" "}
                    {selectedEvent.age && <div>({selectedEvent.age} Yrs.)</div>}
                  </div>
                  <div className="text-gray-700 font-medium flex gap-4">
                    <p>({selectedEvent.status})</p>
                    {selectedEvent.severity && (
                      <div className="flex items-center gap-3">
                        {selectedEvent.severity}
                        <div className="h-3 w-3 rounded-full animate-ping bg-red-600"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-lg">
                  <p className="text-gray-600 mt-1">
                    {selectedEvent.description}
                  </p>
                </div>
                {selectedEvent.reportedBy && (
                  <div>{selectedEvent.reportedBy}</div>
                )}
                <div className="flex justify-between text-gray-500">
                  <div>{selectedEvent.date}</div>

                  <div>{selectedEvent.time}</div>
                </div>

                <div className="flex gap-3 justify-end mt-5">
                  <button className="flex items-center justify-center gap-2 bg-[#2E5E99] text-white px-3 py-2 rounded-md ">
                    <FaEdit className="text-xl" /> Edit
                  </button>
                  <button
                    onClick={() => setOpenDelete(true)}
                    className="flex items-center justify-center gap-2 bg-red-700 text-white px-3 py-2 rounded-md ">
                    <FaTrash />
                    delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {openDelete && (
            <div className="bg-[#E9F1FA] flex flex-col gap-6  rounded-2xl w-full max-w-sm px-6 py-8 animate-modal">
              <p>
                are you sure you want to delete this{" "}
                {selectedEvent.title || selectedEvent.celebrant + "'s Birthday"}
                ?
              </p>

              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => {
                    (setOpenDelete(false), setSelectedEvent(null));
                  }}
                  className="flex items-center justify-center gap-2 bg-[#2E5E99] text-white px-3 py-2 rounded-md ">
                  cancel
                </button>
                <button className="flex items-center justify-center gap-2 bg-red-700 text-white px-3 py-2 rounded-md ">
                  continue
                </button>
              </div>
            </div>
          )}
        </div>
      )} */}
      {addEvent && (
        <div className="inset-0 fixed bg-black/50 z-999 animate-modal flex justify-center items-center px-4">
          <EventForm onClick={() => setAddEvent(false)} />
        </div>
      )}

      <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
    </div>
  );
};

export default EventsPage;
