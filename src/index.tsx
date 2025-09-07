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
import Treatments from "./routes/Treatments.tsx";

// Import Source Sans 3 for body text
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";

// Import Josefin Sans for website name
import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/600.css";

const theme: MantineThemeOverride = {
  // Base font and configuration
  fontFamily: "'Source Sans 3', Helvetica, sans-serif",

  // Color palette optimized for accessibility with mintcream background
  colors: {
    // Soothing teal/turquoise palette for brand colors
    brand: [
      "#E6F9F7", // Lightest teal (background)
      "#B0EAE4",
      "#7ADFD2",
      "#4FD1C0",
      "#30C1AE",
      "#1EB19E", // Mid teal - primary
      "#0D9D8A",
      "#008577",
      "#00705F",
      "#005C4B", // Darkest teal
    ],

    // Secondary purple accents (keeping some of the previous theme feel)
    accent: [
      "#F5F0FF", // Lightest purple (background)
      "#E9DBFF",
      "#D0B5FF",
      "#B495F8",
      "#9B76F7",
      "#7D53ED", // Mid purple
      "#6940DD",
      "#5730C5",
      "#4A22B5",
      "#3A109F", // Darkest purple
    ],

    // Neutral colors
    neutral: [
      "#F8F9FA", // Lightest neutral
      "#E9ECEF",
      "#DEE2E6",
      "#CED4DA",
      "#A4ACB5",
      "#7D858F", // Mid gray
      "#5F6B75",
      "#495057",
      "#343A40",
      "#212529", // Darkest neutral
    ],

    // Natural greens to complement mintcream
    nature: [
      "#E8F5E9", // Lightest green
      "#C8E6C9",
      "#A5D6A7",
      "#7CC47F",
      "#5AAF5D",
      "#3F9542", // Mid green
      "#358738",
      "#2C742F",
      "#236127",
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
        color: "brand.8",
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
      styles: () => ({
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
      {
        path: "/soins",
        element: <Treatments />,
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
