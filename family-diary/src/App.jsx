import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import AnimatedLayout from "./layouts/AnimatedLayout";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JoinFamilyPage from "./pages/JoinFamilyPage";
import HomePage from "./pages/HomePage";
import FogorttenPassword from "./component/forms/FogorttenPassword";
import ResetPAssword from "./component/forms/ResetPAssword";
import NotFound from "./pages/NotFound";
import CreateFamilyForm from "./component/forms/CreateFamilyForm";
import DashboardLayout from "./layouts/DashboardLayout";
import FamilyMemberPage from "./pages/FamilyMemberPage";
import EventsPage from "./pages/EventsPage";
import IncidentPage from "./pages/IncidentPage";
import AddFamilyMember from "./component/AddFamilyMember";
import NotificationPage from "./pages/NotificationPage";
import HistoryPage from "./pages/HistoryPage";
import MemberProfilePage from "./pages/MemberProfilePage";
import MyProfilePage from "./pages/MyProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AnimatedLayout />}>
      <Route path="/" index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget-password" element={<FogorttenPassword />} />
      <Route path="/reset-password" element={<ResetPAssword />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/join-family" element={<JoinFamilyPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/dashboard/members" element={<FamilyMemberPage />} />
        <Route path="/dashboard/events" element={<EventsPage />} />
        {/* <Route path="/dashboard/incidence" element={<IncidentPage />} /> */}
        <Route path="/dashboard/history" element={<HistoryPage />} />
        <Route path="/dashboard/add-member" element={<AddFamilyMember />} />
        <Route path="/dashboard/notification" element={<NotificationPage />} />
        <Route path="/dashboard/my-profile" element={<MyProfilePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
);

function App() {
  return (
    <div className=" min-h-screen touch-pan-y md:px-52 lg:px-80">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// import { useState } from "react";
// import {
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
// } from "react-router-dom";

// import LandingPage from "./pages/LandingPage";
// import EmptyState from "./EmptyState";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import JoinFamilyPage from "./pages/JoinFamilyPage";
// import HomePage from "./pages/HomePage";
// import AnimatedRoutes from "./utilities/AnimatedRoutes";

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route element={<AnimatedRoutes />}>
//         <Route path="/">
//           <Route index element={<LandingPage />} />
//           <Route path="login" element={<LoginPage />} />
//           <Route path="register" element={<RegisterPage />} />
//           <Route path="join-family" element={<JoinFamilyPage />} />
//           <Route path="home" element={<HomePage />} />
//         </Route>
//       </Route>,
//     ),
//   );

//   return (
//     <RouterProvider router={router} />
//   );
// }

// export default App;
