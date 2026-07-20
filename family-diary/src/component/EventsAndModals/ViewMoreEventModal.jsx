import React, { useState } from "react";
import EventList from "../EventList";
import EventDetailsModal from "./EventDetailsModal";
import DeleteConfirmModal from "./DeleteConfirmationModal";
import ListSkeleton from "../loaders/skeletonComponent/ListSkeleton";

const ViewMoreEventModal = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const title =
    "All " + events[0].type.charAt(0).toUpperCase() + events[0].type.slice(1);

  return (
    <>
      <div className="py-5 flex flex-col gap-5 md:px-72 z-999">
        <h1 className="text-[#2E5E99] text-xl font-semibold">{title}</h1>

        {!loaded ? (
          <div>
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {events.map((event) => (
              <button key={event.id} onClick={() => setSelectedEvent(event)}>
                <EventList event={event} />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDelete={() => setOpenDelete(true)}
        />
      )}

      {openDelete && (
        <DeleteConfirmModal
          event={selectedEvent}
          onCancel={() => setOpenDelete(false)}
          onConfirm={() => {
            console.log("delete", selectedEvent.id);

            setOpenDelete(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </>
  );
};

export default ViewMoreEventModal;
