import { useState } from "react";
import Navbar from "./components/navbar/Navbar.tsx";
import { Button, MantineProvider, MantineThemeOverride } from "@mantine/core";
import "@mantine/core/styles.css";

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

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider withGlobalClasses theme={theme}>
      <Navbar />
    </MantineProvider>
  );
};

export default App;
