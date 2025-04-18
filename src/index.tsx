import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./routes/About.tsx";
import Error404 from "./routes/Error404.tsx";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import Home from "./routes/Home.tsx";
import Contact from "./routes/Contact.tsx";
import "./index.css";
import Sonotherapy from "./routes/Sonotherapy.tsx";

const theme: MantineThemeOverride = {
  // Base font and configuration
  fontFamily: "Montserrat, Helvetica, sans-serif",

  // Color palette inspired by healing/relaxation themes
  // with mintcream background in mind
  colors: {
    // Soothing teal/turquoise palette for brand colors
    brand: [
      "#E6F9F7", // Lightest teal
      "#C5F1EC",
      "#A3E9E0",
      "#81E0D4",
      "#5FD8C8",
      "#3DCFBC", // Mid teal - primary
      "#2BB9A7",
      "#1A9E8E",
      "#098375",
      "#00695C", // Darkest teal
    ],

    // Secondary purple accents (keeping some of the previous theme feel)
    accent: [
      "#F5F0FF",
      "#E9DBFF",
      "#D4BFFF",
      "#B89DFC",
      "#9C7BF9",
      "#8059F5", // Mid purple
      "#6E47E5",
      "#5C35D0",
      "#4B23BC",
      "#3A11A8", // Darkest purple
    ],

    // Neutral colors
    neutral: [
      "#F8F9FA",
      "#E9ECEF",
      "#DEE2E6",
      "#CED4DA",
      "#ADB5BD",
      "#868E96", // Mid gray
      "#495057",
      "#343A40",
      "#212529",
      "#121416",
    ],

    // Natural greens to complement mintcream
    nature: [
      "#E8F5E9",
      "#C8E6C9",
      "#A5D6A7",
      "#81C784",
      "#66BB6A",
      "#4CAF50", // Mid green
      "#43A047",
      "#388E3C",
      "#2E7D32",
      "#1B5E20", // Darkest green
    ],
  },

  // Set the primary color to use the brand teal palette
  primaryColor: "brand",
  primaryShade: { light: 5, dark: 7 },

  // Global spacing system
  spacing: {
    xs: "0.75rem", // 12px
    sm: "1rem", // 16px
    md: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "3rem", // 48px
  },

  // Set default radius for components
  defaultRadius: "md",

  // Global component overrides
  components: {
    Title: {
      defaultProps: {
        color: "brand.7",
      },
    },
    Text: {
      defaultProps: {
        color: "neutral.7",
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: (theme: any) => ({
        root: {
          fontWeight: 500,
        },
      }),
    },
    Card: {
      defaultProps: {
        shadow: "sm",
        padding: "md",
        radius: "md",
      },
    },
  },

  // Custom properties
  other: {
    // Website specific values
    containerMaxWidth: "1200px",
    headerHeight: "70px",
    footerHeight: "220px",

    // Custom transitions
    standardTransition: "all 0.3s ease",

    // Background colors
    mainBackground: "#F5FFFA", // mintcream
    secondaryBackground: "#F8FDFC",

    // Typography settings
    headingLineHeight: 1.3,
    bodyLineHeight: 1.6,

    // Media breakpoints (px)
    breakpoints: {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1400,
    },
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
        path: "/mon-parcours",
        element: <About />,
      },
      {
        path: "/sonotherapie",
        element: <Sonotherapy />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
