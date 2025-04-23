import { FC } from "react";
import { Paper, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import global from "../../styles/Global.module.css";

const CallToAction: FC = () => {
  return (
    <div className={`${global.textCenter} ${global.mt5} ${global.mb5}`}>
      <Paper
        p="xl"
        radius="lg"
        withBorder
        style={{
          background: "linear-gradient(135deg, #F5FFFA 0%, #E6F9F7 100%)",
        }}
      >
        <Title order={3} mb="md" style={{ color: "#1A9E8E" }}>
          Prêt à découvrir les bienfaits de la sonothérapie ?
        </Title>
        <Text size="lg" mb="xl">
          Prenez rendez-vous pour une séance personnalisée et commencez votre
          parcours vers l'harmonie intérieure.
        </Text>
        <Link
          to="/contact"
          className={global.ctaButton}
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          Prendre Rendez-vous
        </Link>
      </Paper>
    </div>
  );
};

export default CallToAction;
