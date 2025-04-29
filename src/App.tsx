import { FC } from "react";
import Navbar from "./components/navbar/Navbar.tsx";
import "@mantine/core/styles.css";
import { Outlet, useLocation } from "react-router-dom";
import { AppShell, Container } from "@mantine/core";
import classes from "./styles/App.module.css";
import usePageTracking from "./hooks/usePageTracking.tsx";
import CookieConsent from "./components/google/CookieConsent.tsx";
import { HelmetProvider } from "react-helmet-async";

const App: FC = () => {
  const location = useLocation();

  usePageTracking();

  return (
    <HelmetProvider>
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
          <CookieConsent />
        </AppShell.Main>

        {/* You can add a footer later if needed */}
        {/* <AppShell.Footer>
        <Footer />
      </AppShell.Footer> */}
      </AppShell>
    </HelmetProvider>
  );
};

export default App;
