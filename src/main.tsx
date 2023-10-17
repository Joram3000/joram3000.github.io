import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./pages/Error";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import PatternMakerPage from "./pages/PatternMakerPage";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <PatternMakerPage /> },
      { path: "/videoplayer", element: <VideoPlayer /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
