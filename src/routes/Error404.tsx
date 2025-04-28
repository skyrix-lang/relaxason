import { FunctionComponent } from "react";
import {
  Box,
  Button,
  Container,
  Image,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import image from "../assets/error404.svg";
import global from "../styles/Global.module.css";
import classes from "../styles/Error404.module.css";
import app from "../styles/App.module.css";
import useScrollToHash from "../hooks/useScrollToHash.ts";
import useScrollVisibility from "../hooks/useScrollVisibility.ts";

const Error404: FunctionComponent = () => {
  // Hook to handle hash-based navigation
  useScrollToHash();

  // Hook to handle visibility of sections when scrolling
  const visibleSections = useScrollVisibility(["error"]);

  const navigate = useNavigate();

  return (
    <div
      id="error"
      className={
        visibleSections.error
          ? `${global.fadeInSection} ${global.visible} ${app.hero}`
          : global.fadeInSection
      }
    >
      <Container size="xl" className={classes.container}>
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing={{ base: "xl", md: 80 }}
          className={global.fadeInSection + " " + global.visible}
        >
          <div className={global.flexCenter}>
            <Image
              src={image}
              alt="Page non trouvée"
              className={classes.errorImage}
            />
          </div>

          <div className={global.flexColumn + " " + global.mt3}>
            <Title order={2} className={global.sectionTitle}>
              <Box component="span" className={global.titleUnderline} />
              Oups... Quelque chose ne va pas !
            </Title>
            <Space h="md" />

            <Text p={10} size="lg" className={global.mb3}>
              Cette page n'existe pas ou a été déplacée.
            </Text>

            <Button
              mt={10}
              p={10}
              variant="filled"
              size="md"
              radius="md"
              className={global.ctaButton}
              onClick={() => navigate("/")}
            >
              Retour sur la page d'accueil
            </Button>
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Error404;
