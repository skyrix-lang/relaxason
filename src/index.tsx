import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import About from "./routes/About.tsx";
import Error404 from "./routes/Error404.tsx";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import Home from "./routes/Home.tsx";

const theme: MantineThemeOverride = {
  // Override any other properties from default theme
  fontFamily: "Helvetica, sans serif",
  colors: {
    brand: [
      "#F3F0FF",
      "#E5DBFF",
      "#D0BFFF",
      "#B197FC",
      "#9775FA",
      "#845EF7",
      "#7950F2",
      "#7048E8",
      "#6741D9",
      "#5F3DC4",
    ],
  },
  primaryColor: "grape",
  primaryShade: { light: 6, dark: 8 },
  spacing: {
    xs: "1rem",
    sm: "1.2rem",
    md: "1.8rem",
    lg: "2.2rem",
    xl: "2.8rem",
  },
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider withGlobalClasses theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
