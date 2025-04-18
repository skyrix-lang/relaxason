import { FunctionComponent } from "react";
import Navbar from "./components/navbar/Navbar.tsx";
import "@mantine/core/styles.css";
import { Outlet, useLocation } from "react-router-dom";
import { AppShell, Container } from "@mantine/core";
import classes from "./styles/App.module.css";

const App: FunctionComponent = () => {
  const location = useLocation();
  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>

      <AppShell.Main className={classes.main}>
        {location.pathname === "/" ? (
          <Outlet />
        ) : (
          <div className={classes.hero}>
            <Container size="xl" className={classes.container}>
              <Outlet />
            </Container>
          </div>
        )}
      </AppShell.Main>

      {/* You can add a footer later if needed */}
      {/* <AppShell.Footer>
        <Footer />
      </AppShell.Footer> */}
    </AppShell>
  );
};

export default App;
