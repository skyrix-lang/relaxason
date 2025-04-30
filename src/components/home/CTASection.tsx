import React, { FC } from "react";
import { Box, Button, Card, Grid, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import { Link } from "react-router-dom";

interface CTASectionProps {
  isVisible: boolean;
}

const CTASection: FC<CTASectionProps> = ({ isVisible }) => {
  return (
    <section
      id="cta"
      style={{
        position: "relative",
        padding: "4rem 0 6rem",
        backgroundColor: "#F5FFFA",
        overflow: "hidden",
      }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Card
        padding="xl"
        radius="lg"
        style={{
          background: "linear-gradient(135deg, #1EB19E 0%, #008577 100%)",
          boxShadow: "0 20px 40px rgba(0, 105, 92, 0.2)",
        }}
      >
        <Grid gutter={40} align="center">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Title order={2} c="white" mb="md">
              Prêt à commencer votre voyage sonore ?
            </Title>
            <Text c="white" size="lg" mb="md">
              Prenez rendez-vous dès aujourd'hui pour découvrir les bienfaits de
              la sonothérapie et entamer votre chemin vers le bien-être.
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }} style={{ textAlign: "center" }}>
            <Button
              size="xl"
              variant="white"
              color="brand.8"
              component={Link}
              to="/contact"
              rightSection={<IconChevronRight size={18} />}
              style={{
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              Prendre rendez-vous
            </Button>
          </Grid.Col>
        </Grid>

        {/* Decorative elements */}
        <Box
          style={{
            position: "absolute",
            bottom: "-30px",
            right: "-30px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <Box
          style={{
            position: "absolute",
            bottom: "20px",
            right: "40px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
          }}
        />
      </Card>
    </section>
  );
};

export default CTASection;
