
import React, { useEffect, useState } from "react";
import { FaRegBell, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { apiFetch } from "../utilities/apiRequest";
import baseUrl from "../utilities/BaseURL";
import AlertToaster from "./toasters/AlertToaster";
import socket from "../utilities/socket";

const WelcomeHeader = () => {

  const [data, setData] = useState(null);

  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    status: ""
  });

  const navigate = useNavigate();

  // SOCKET.IO USEEFFECT
  // useEffect(() => {
  //   socket.connect();

  //   const handleNewNotification = async () => {
  //     try {
  //       const response = await apiFetch(`${baseUrl}/notifications/unread-count`);
  //       const result = await response.json();
  //       if (response.ok && result.success) setData((prev) => prev ? { ...prev, notificationCount: result.data.count } : prev);
  //     } catch (error) { console.error("Unable to refresh notification count:", error); }
  //   };

  //   socket.on("newNotification", handleNewNotification);

  //   return () => {
  //     socket.off("newNotification", handleNewNotification);
  //   };
  // }, []);

  useEffect(() => {
  const handleNewNotification = async () => {
      const handleNewNotification = async () => {
      try {
        const response = await apiFetch(`${baseUrl}/notifications/unread-count`);
        const result = await response.json();
        if (response.ok && result.success) setData((prev) => prev ? { ...prev, notificationCount: result.data.count } : prev);
      } catch (error) { console.error("Unable to refresh notification count:", error); }
    };
  };

  socket.on("newNotification", handleNewNotification);

  if (!socket.connected) {
    socket.connect();
  }

  return () => {
    socket.off("newNotification", handleNewNotification);
  };
}, []);


  // FETCH AUTHENTICATED USER DATA
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const req = await apiFetch(
          `${baseUrl}/user/user-data`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const res = await req.json();

        if (!req.ok || !res.success) {
          throw new Error(
            res.message || "Unable to fetch user information."
          );
        }

        if (!ignore) {
          setData(res.data);
          const countResponse = await apiFetch(`${baseUrl}/notifications/unread-count`);
          const countResult = await countResponse.json();
          if (!ignore && countResponse.ok && countResult.success) {
            setData((prev) => prev ? { ...prev, notificationCount: countResult.data.count } : prev);
          }
        }

      } catch (error) {
        console.error("Failed to fetch user data:", error);

        if (!ignore) {
          setShowAlert({
            show: true,
            message: error.message || "Unable to fetch user information.",
            status: "failed"
          });
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };

  }, []);

  // USER PROFILE IMAGE
  const backgroundImageStyle = {
    backgroundImage: data?.imageUrl
      ? `url("${data.imageUrl}")`
      : "none",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  // USER NAME
  const username = data?.username || "";
  

  return (
    <div className="flex items-center justify-between">

      {/* USER NAME */}
      <h1 className="text-lg font-semibold">
        {username.length > 22
          ? `${username.slice(0, 22)}...`
          : username}
      </h1>

      <div className="flex items-center">

        {/* NOTIFICATIONS */}
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/notification")}
        >
          <div className="p-2 text-2xl text-[#2E5E99] font-semibold">
            <small className="text-sm bg-red-600 p-0.5 px-1 flex justify-center items-center text-gray-100 rounded-full relative top-2 right-2">
              {data?.notificationCount ?? 0}
            </small>

            <FaRegBell />
          </div>
        </button>

        {/* PROFILE IMAGE */}
        <button
          type="button"
          className="flex justify-between items-center cursor-pointer"
          onClick={() => navigate("/dashboard/my-profile")}
        >
          <div
            className="flex justify-center items-center p-3 text-2xl h-10 w-10 bg-[#2E5E99] rounded-full text-gray-200 font-semibold overflow-hidden"
            style={backgroundImageStyle}
          >
            {!data?.imageUrl && <FaImage />}
          </div>
        </button>

      </div>

      {/* ALERT TOASTER */}
      {showAlert.show && (
        <AlertToaster
          show={showAlert.show}
          message={showAlert.message}
          status={showAlert.status}
          duration={4000}
          onClose={() =>
            setShowAlert((prev) => ({
              ...prev,
              show: false
            }))
          }
        />
      )}

    </div>
  );
};

export default WelcomeHeader;
