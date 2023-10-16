import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./pages/Error";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  { path: "videoplayer", element: <VideoPlayer /> },
  { path: "contact", element: <ContactPage /> },
  { path: "about", element: <AboutPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
