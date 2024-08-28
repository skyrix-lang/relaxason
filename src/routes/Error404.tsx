import { FunctionComponent } from "react";
import {
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import image from "../assets/error404.svg";
import classes from "../styles/Error404.module.css";

const Error404: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={80} cols={2}>
        <Image src={image} />
        <div>
          <Title className={classes.title}>
            {"Oups... Quelque chose ne va pas !"}
          </Title>
          <Text color="dimmed" size="lg">
            {"Cette page n'existe pas."}
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => navigate("/")}
          >
            {"Retour sur la page d'accueil"}
          </Button>
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default Error404;
