import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import HomePage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import ContactPage from "./pages/contact-page";
import AboutPage from "./pages/about-page";
import PatternMakerPage from "./pages/patternmaker-page";
import VideoPlayer from "./pages/videoplayer-page/Videoplayer";
import BeatBattlePage from "./pages/beatbattle-page";
import TestPage from "./pages/test-pages";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createTheme, MantineProvider } from "@mantine/core";
import { ParallaxProvider } from "react-scroll-parallax";

import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";

const router = createHashRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/*", element: <HomePage /> },
      { path: "/patternmaker", element: <PatternMakerPage /> },
      { path: "/videoplayer", element: <VideoPlayer /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/test", element: <TestPage count={32} speed={20} /> },
      { path: "/beatbattle", element: <BeatBattlePage /> },
      { path: "/beatbattle/:params", element: <BeatBattlePage /> },
    ],
  },
]);

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Provider store={store}>
        <ParallaxProvider>
          <RouterProvider router={router} />
        </ParallaxProvider>
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);
