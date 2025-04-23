import React, { FC } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  Overlay,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import { VisibleSectionProps } from "../../routes/Home.tsx";

const ServicesSection: FC<VisibleSectionProps> = ({ visible }) => {
  return (
    <section
      id="services"
      style={{ scrollMarginTop: "100px", padding: "6rem 0" }}
      className={
        visible.services
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Title order={2} mb="md" className={global.sectionTitle}>
        <Box component="span" className={global.titleUnderline} />
        Ce que je propose
      </Title>
      <Space h="lg" />
      <Text size="lg" maw={600} mb="xl">
        Découvrez mes différentes activités adaptées à vos besoins. Chaque
        séance est personnalisée pour vous offrir une expérience unique.
      </Text>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card
            className={global.serviceCard}
            padding="xl"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <Box
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "140px",
                backgroundImage: `url('/api/placeholder/500/140')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Overlay
                color="#3DCFBC"
                backgroundOpacity={0.5}
                style={{ height: "100%" }}
              />
            </Box>
            <Box style={{ marginTop: "120px" }}>
              <Title order={3} mb="md" mt="xl" c="brand.7">
                Séances Individuelles
              </Title>
              <Text mb="md">
                Une approche personnalisée qui répond à vos besoins spécifiques.
                Ces séances vous permettent de profiter pleinement des bienfaits
                de la sonothérapie dans un cadre intime et adapté.
              </Text>
              <Group justify="space-between" align="center" mt="xl">
                <Text fw={600} c="brand.8">
                  Pour 1 personne
                </Text>
                <Button
                  variant="light"
                  color="brand.6"
                  component="a"
                  href="/soins#individuel"
                  rightSection={<IconChevronRight size={18} />}
                >
                  Voir les détails
                </Button>
              </Group>
            </Box>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card
            className={global.serviceCard}
            padding="xl"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <Box
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "140px",
                backgroundImage: `url('/api/placeholder/500/140')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Overlay
                color="#3DCFBC"
                backgroundOpacity={0.5}
                style={{ height: "100%" }}
              />
            </Box>
            <Box style={{ marginTop: "120px" }}>
              <Title order={3} mb="md" mt="xl" c="brand.7">
                Voyage Sonore Collectif
              </Title>
              <Text mb="md">
                Une expérience immersive en groupe où les vibrations sonores se
                propagent dans tout l'espace, créant une harmonisation
                collective et une profonde relaxation partagée.
              </Text>
              <Group justify="space-between" align="center" mt="xl">
                <Text fw={600} c="brand.8">
                  De 5 à 20 personnes
                </Text>
                <Button
                  variant="light"
                  color="brand.6"
                  component="a"
                  href="/soins#collectif"
                  rightSection={<IconChevronRight size={18} />}
                >
                  Voir les détails
                </Button>
              </Group>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>

      <Box ta="center" mt="xl">
        <Button
          size="lg"
          className={global.ctaButton}
          component="a"
          href="/soins"
          rightSection={<IconChevronRight size={18} />}
        >
          Tous mes soins
        </Button>
      </Box>
    </section>
  );
};

export default ServicesSection;
