import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import EmptyFamilySearch from "../EmptyFamilySearch";
import EventList from "../EventList";
import ListSkeleton from "../loaders/skeletonComponent/ListSkeleton";

const EventSection = ({
  title,
  data = [],
  empty = false,
  loaded = true,
  emptyText = "No Record Found",
  onSelect,
  viewMoreLink = "",
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[#2E5E99]">{title}</h2>
      </div>

      {empty ? (
        <div className="flex justify-center">
          <EmptyFamilySearch text={emptyText} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {!loaded ? (
            <>
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
            </>
          ) : (
            <>
              {data.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item)}
                  className="w-full text-left transition-transform duration-200 active:scale-[0.98]">
                  <EventList event={item} />
                </button>
              ))}
            </>
          )}

          {loaded && data.length > 3 && (
            <div className="flex justify-end">
              <NavLink
                to={viewMoreLink}
                className="text-[#2E5E99] font-medium hover:underline">
                View More
              </NavLink>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default memo(EventSection);
