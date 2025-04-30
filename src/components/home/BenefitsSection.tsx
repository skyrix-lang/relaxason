import React, { FC } from "react";
import { Box, Card, Grid, Space, Text, Title } from "@mantine/core";
import {
  IconEmpathize,
  IconHeartbeat,
  IconMassage,
  IconWaveSine,
} from "@tabler/icons-react";
import global from "../../styles/Global.module.css";

interface BenefitsSectionProps {
  isVisible: boolean;
}

const BenefitsSection: FC<BenefitsSectionProps> = ({ isVisible }) => {
  return (
    <section
      id="benefits"
      style={{
        scrollMarginTop: "100px",
        padding: "5rem 0",
        background: "linear-gradient(180deg, #F5FFFA 0%, #E6F9F7 100%)",
        borderRadius: "0",
        margin: "0 -24px", // Compensate for Container padding
        width: "calc(100% + 48px)", // Make section full width
      }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Box px="md" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Box ta="center" mb="xl">
          <Title
            order={2}
            mb="md"
            className={global.sectionTitle}
            style={{ display: "inline-block" }}
          >
            <Box
              component="span"
              className={global.titleUnderline}
              style={{ left: "20%", width: "60%" }}
            />
            Les Bienfaits
          </Title>
          <Space h="lg" />
          <Text size="lg" maw={700} mx="auto" mb="xl">
            La sonothérapie offre de nombreux avantages pour votre santé
            physique, mentale et émotionnelle. Découvrez comment cette approche
            peut vous aider.
          </Text>
        </Box>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card
              className={global.serviceCard}
              style={{
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
            >
              <IconMassage
                size={48}
                stroke={1.5}
                color="#1EB19E"
                style={{ marginBottom: "1rem" }}
              />
              <Title order={3} mb="md" c="brand.7">
                Relaxation profonde
              </Title>
              <Text>
                Facilite l'accès à des états modifiés de conscience, propices au
                lâcher prise et qui apaisent le mental.
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card
              className={global.serviceCard}
              style={{
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
            >
              <IconWaveSine
                size={48}
                stroke={1.5}
                color="#1EB19E"
                style={{ marginBottom: "1rem" }}
              />
              <Title order={3} mb="md" c="brand.7">
                Réduction du stress
              </Title>
              <Text>
                Les fréquences sonores favorisent la détente, diminuent
                l'anxiété et les tensions accumulées.
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card
              className={global.serviceCard}
              style={{
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
            >
              <IconHeartbeat
                size={48}
                stroke={1.5}
                color="#1EB19E"
                style={{ marginBottom: "1rem" }}
              />
              <Title order={3} mb="md" c="brand.7">
                Équilibre énergétique
              </Title>
              <Text>
                Harmonise les centres énergétiques du corps pour une meilleure
                circulation de l'énergie vitale.
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card
              className={global.serviceCard}
              style={{
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
            >
              <IconEmpathize
                size={48}
                stroke={1.5}
                color="#1EB19E"
                style={{ marginBottom: "1rem" }}
              />
              <Title order={3} mb="md" c="brand.7">
                Bien-être global
              </Title>
              <Text>
                Renforce le système immunitaire et favorise un sentiment durable
                de bien-être physique, mental et émotionnel.
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>
    </section>
  );
};

export default BenefitsSection;
