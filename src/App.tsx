import { FunctionComponent } from "react";
import Navbar from "./components/navbar/Navbar.tsx";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Outlet } from "react-router-dom";
import { Container, Overlay } from "@mantine/core";
import classes from "./styles/App.module.css";

const App: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size={"xl"}>
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default App;
