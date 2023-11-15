import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createTheme, MantineProvider } from "@mantine/core";
import { ParallaxProvider } from "react-scroll-parallax";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "mantine-datatable/styles.css";
import Root from "./routes/root";
import ContestPage from "./pages/beatbattle-page/contestpage";
import ValkWorkIn from "./pages/valkdigital-page/ValkWorkIn";
import TwistCards from "./pages/test-page/TwistCards";
import HomePage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import ContactPage from "./pages/contact-page";
import AboutPage from "./pages/about-page";
import PatternMakerPage from "./pages/patternmaker-page";
import VideoPlayer from "./pages/valkdigital-page/videoplayer/Videoplayer";
import BeatBattleHomePage from "./pages/beatbattle-page/index";
import SoundDesign from "./pages/valkdigital-page/sounddesign/Sounddesign";
import Overige from "./pages/valkdigital-page/Overige/Overige";

const router = createHashRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/*", element: <HomePage /> },
      { path: "/patternmaker", element: <PatternMakerPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/css", element: <TwistCards count={32} speed={8} /> },
      { path: "/beatbattle", element: <BeatBattleHomePage /> },
      { path: "/beatbattle/:id", element: <ContestPage /> },
      { path: "/valkdigital", element: <ValkWorkIn /> },
      { path: "/valkdigital/narrowcasting", element: <VideoPlayer /> },
      { path: "/valkdigital/interfacesounddesign", element: <SoundDesign /> },
      { path: "/valkdigital/overige", element: <Overige /> },
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
