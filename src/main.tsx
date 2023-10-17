import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./pages/Error";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import Joram3000 from "./pages/Error/indexjoram3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "videoplayer", element: <VideoPlayer /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "/joram3000", element: <Joram3000 /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
