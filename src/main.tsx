import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./pages/Error";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import PatternMakerPage from "./pages/PatternMakerPage";
import { Provider } from "react-redux";
import store from "./store/store";
import HomePage from "./pages/Home";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { ParallaxProvider } from "react-scroll-parallax";
import TestPage from "./pages/test-pages/testpage";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
// import "@mantine/carousel/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
]);

const theme = createTheme({
  /** Your theme override here */
});

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
