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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AnimatedLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget-password" element = {<FogorttenPassword />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/join-family" element={<JoinFamilyPage />} />
      <Route path="/home" element={<HomePage />} />
    </Route>,
  ),
);

function App() {
  return (
    <div className=" min-h-screen touch-pan-y">
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
