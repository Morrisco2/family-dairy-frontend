import React, { useState } from "react";
import Button from "../Button";

const EventForm = ({ event, onClick }) => {
  const [input, setInput] = useState({
    title: event?.title ?? event?.celebrant ?? "",
    type: event?.type ?? "",
    venue: event?.venue ?? "",
    date: event?.date ?? null,
    time: event?.time ?? null,
    description: event?.description ?? "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInput((prev)=>({...prev, [name]:value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("submitted")
  }

  return (
    <div className="bg-[#E9F1FA] py-4 px-5 w-full rounded-xl md:w-96">
      <div className="text-xl flex justify-end font-semibold text-[#2E5E99]">
        <button onClick={onClick}>X</button>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-[#2E5E99] text-2xl flex justify-center font-semibold">
          Add Event
        </h1>
        <form className="flex flex-col gap-5">
          <div className="relative w-full">
            <input
              type="text"
              id="title"
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
            />

            <label
              htmlFor="title"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
              Event title
            </label>
          </div>
          <div className="relative flex-1">
            <select
              id="eventType"
              name="type"
              value={input.value}
              onChange={handleChange}
              defaultValue=""
              required
              className="peer w-full h-12 px-3 bg-[#D0DDED] rounded-md outline-none appearance-none">
              <option value="" disabled></option>

              {/* General */}
              <option value="meeting">Family Meeting</option>
              <option value="birthday">Birthday Celebration</option>
              <option value="incident">Family Incident</option>

              {/* Celebrations */}
              <option value="wedding">Wedding Ceremony</option>
              <option value="traditionalMarriage">Traditional Marriage</option>
              <option value="engagement">Engagement Ceremony</option>
              <option value="anniversary">Wedding Anniversary</option>
              <option value="namingCeremony">Naming Ceremony</option>
              <option value="babyShower">Baby Shower</option>
              <option value="housewarming">Housewarming</option>
              <option value="matriculation">matriculation Ceremony</option>
              <option value="graduation">Graduation Ceremony</option>
              <option value="retirement">Retirement Celebration</option>

              {/* Religious */}
              <option value="thanksgiving">Thanksgiving Service</option>
              <option value="churchProgram">Church Program</option>
              <option value="prayerMeeting">Prayer Meeting</option>

              {/* Memorial */}
              <option value="funeral">Funeral Service</option>
              <option value="memorial">Memorial Service</option>

              {/* Family Activities */}
              <option value="familyReunion">Family Reunion</option>
              <option value="picnic">Family Picnic</option>
              <option value="vacation">Family Vacation</option>
              <option value="sportsDay">Family Sports Day</option>

              {/* Development */}
              <option value="seminar">Family Seminar</option>
              <option value="fundraiser">Fundraising Event</option>
              <option value="communityService">Community Outreach</option>
            </select>

            <label
              htmlFor="eventType"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200
      peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 peer-focus:px-1
      peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold peer-valid:text-blue-500 peer-valid:px-1">
              Select Event Type
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
          <div className="relative w-full">
            <input
              type="text"
              id="venue"
              name="venue"
              value={input.venue}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-12 px-3 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
            />

            <label
              htmlFor="venue"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
              Event Venue
            </label>
          </div>
          <div className="flex w-full justify-between gap-4  items-end ">
            <div className="relative flex-1">
              <label className="font-semibold" htmlFor="dob">
                Event date
              </label>
              <input
                type="date"
                name="date"
                value={input.date}
                onChange={handleChange}
                className="bg-[#D0DDED] h-12 px-3 "
                id="dob"
              />
            </div>
            <div className="relative flex-1 ">
              <label className="font-semibold" htmlFor="dob">
                Event time
              </label>
              <input
                type="time"
                name="time"
                value={input.time}
                onChange={handleChange}
                className="bg-[#D0DDED] h-12 px-3 w-full "
                id="dob"
              />
            </div>
          </div>

          <div className="relative w-full">
            <textarea
              type="text"
              id="description"
              name="description"
              value={input.description}
              onChange={handleChange}
              placeholder=" "
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="peer w-full min-h-20 px-3 py-5 bg-[#D0DDED] font-light outline-none border border-transparent  rounded-md"
            />

            <label
              htmlFor="description"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500  peer-focus:px-1 peer-focus:-translate-y-1/2
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-blue-500
                  peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-translate-y-1/2">
              Event Description here...
            </label>
          </div>

          <div>
            <Button primary text="Save Event" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
