import { FC } from "react";
import {
  Badge,
  Box,
  Container,
  Grid,
  Group,
  Image,
  List,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { IconMassage } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";

interface SwedishMassageSectionProps {
  isVisible: boolean;
}

const SwedishMassageSection: FC<SwedishMassageSectionProps> = ({
  isVisible,
}) => {
  return (
    <div
      id="suedois"
      style={{ scrollMarginTop: "100px" }}
      className={`${global.sonoSection} ${
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }`}
    >
      <Container size="lg">
        <Group mb="md" justify="center">
          <IconMassage size={24} color="#3DCFBC" />
          <Title
            order={2}
            className={`${global.sectionTitle} ${global.textCenter}`}
          >
            <Box component="span" className={global.titleUnderline} />
            Massage Suédois
          </Title>
        </Group>

        <Text
          size="lg"
          mb="xl"
          className={global.textCenter}
          maw={800}
          mx="auto"
        >
          Le massage suédois est une technique classique qui combine des
          mouvements fluides, des pressions profondes et des étirements pour
          détendre les muscles et revitaliser le corps.
        </Text>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={global.roundedImage}>
              <Image
                src="/images/massage-suedois.jpg"
                alt="Massage Suédois"
                height={400}
                className={global.fullWidthImage}
                fallbackSrc="https://placehold.co/600x400?text=Massage+Suédois"
              />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Tabs defaultValue="benefits">
              <Tabs.List grow>
                <Tabs.Tab value="benefits">Bienfaits</Tabs.Tab>
                <Tabs.Tab value="technique">Technique</Tabs.Tab>
                <Tabs.Tab value="experience">Expérience</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="benefits" pt="md">
                <List withPadding>
                  <List.Item>Soulage les tensions musculaires</List.Item>
                  <List.Item>Améliore la circulation sanguine</List.Item>
                  <List.Item>Réduit le stress et l'anxiété</List.Item>
                  <List.Item>Favorise la récupération physique</List.Item>
                  <List.Item>Augmente la mobilité articulaire</List.Item>
                </List>
              </Tabs.Panel>

              <Tabs.Panel value="technique" pt="md">
                <Text>
                  Le massage suédois intègre cinq techniques principales :
                  effleurage (mouvements glissés), pétrissage (pressions
                  circulaires), tapotement (percussions rythmées), friction
                  (pressions profondes) et vibration (mouvements oscillatoires).
                </Text>
                <Text mt="md">
                  L'intensité est adaptée à vos besoins, créant un équilibre
                  parfait entre relaxation et travail thérapeutique des tissus
                  profonds.
                </Text>
              </Tabs.Panel>

              <Tabs.Panel value="experience" pt="md">
                <Text>
                  Chaque séance commence par une consultation pour déterminer
                  vos besoins spécifiques. Dans une ambiance apaisante enrichie
                  d'huiles essentielles, le massage est personnalisé pour cibler
                  vos zones de tension.
                </Text>
                <Text mt="md">
                  Une attention particulière est portée à votre confort tout au
                  long de la séance, créant une expérience de détente profonde
                  et régénératrice.
                </Text>
              </Tabs.Panel>
            </Tabs>
            <Badge color="brand" size="lg" mt="md">
              60 minutes | 90 minutes
            </Badge>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default SwedishMassageSection;
