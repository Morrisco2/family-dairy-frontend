import React, { memo, useState } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EventForm from "../forms/EventForm";
const EventDetailsModal = ({ event, onClose }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!event) return null;

  const eventName = event.title || `${event.celebrant}'s Birthday`;
 
  const handleClose = () => {
    setShowDeleteDialog(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-center px-5">
      {!showDeleteDialog ? (
        <div className="bg-[#E9F1FA] rounded-2xl w-full max-w-sm px-6 py-8 animate-modal">
          {/* Header */}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#2E5E99] capitalize">
              {event.type} Details
            </h2>

            <button
              onClick={handleClose}
              className="text-xl text-gray-600 hover:text-red-600 transition">
              <FaTimes />
            </button>
          </div>

          {/* Title */}

          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold">{eventName}</h3>

              {event.age && (
                <span className="text-gray-600">({event.age} Yrs.)</span>
              )}
            </div>

            <div className="flex items-center gap-4 mt-2">
              <span className="text-gray-600 capitalize">{event.status}</span>

              {event.severity && (
                <div className="flex items-center gap-2">
                  <span>{event.severity}</span>

                  <span className="h-3 w-3 rounded-full bg-red-600 animate-ping"></span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}

          <div className="mb-6">
            <p className="text-gray-700">{event.description}</p>
          </div>

          {/* Information */}

          <div className="space-y-3 text-gray-700">
            {event.category && (
              <div className="flex justify-between">
                <span className="font-semibold">Category</span>

                <span>{event.category}</span>
              </div>
            )}

            {event.reportedBy && (
              <div className="flex justify-between">
                <span className="font-semibold">Reported By</span>

                <span>{event.reportedBy}</span>
              </div>
            )}

            <div className="flex justify-between mt-6">

              <span>{event.date}</span>

              <span>{event.time}</span>
            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#2E5E99] text-white">
              <FaEdit />
              Edit
            </button>

            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-700 text-white">
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      ) : (
        <DeleteConfirmationModal
          event={event}
          onCancel={() => setShowDeleteDialog(false)}
          onContinue={() => {
            // delete request here

            handleClose();
          }}
        />
      )}
      {showEditModal && (
        <div className="inset-0 bg-black/50 fixed flex justify-center items-center px-4 animate-modal">
          <EventForm event={event} onClick={() => setShowEditModal(false)} />
        </div>
      )}
    </div>
  );
};

export default memo(EventDetailsModal);
