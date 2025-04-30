import { FC } from "react";
import {
  Badge,
  Box,
  Grid,
  Group,
  Image,
  List,
  Text,
  Title,
} from "@mantine/core";
import { IconDroplet } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";

interface LymphaticDrainageSectionProps {
  isVisible: boolean;
}

const LymphaticDrainageSection: FC<LymphaticDrainageSectionProps> = ({
  isVisible,
}) => {
  return (
    <div
      id="drainage"
      style={{ scrollMarginTop: "100px" }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <div className={global.roundedImage}>
            <Image
              src="/images/drainage.jpg"
              alt="Drainage"
              height={400}
              className={global.fullWidthImage}
              fallbackSrc="https://placehold.co/600x400?text=Drainage"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Group mb="md" justify="center">
            <IconDroplet size={24} color="#1EB19E" />
            <Title order={2} className={global.sectionTitle}>
              <Box component="span" className={global.titleUnderline} />
              Drainage Manuel de Bien-Être
            </Title>
          </Group>
          <Text mb="md">
            Le drainage manuel de bien-être est un ensemble de techniques
            manuelles ayant pour but de stimuler et maintenir les fonctions
            essentielles du système circulatoire lymphatique (superficiel,
            intermédiaire et profond). Cette pratique favorise la détoxification
            générale de l'organisme tout en contribuant au renforcement du
            système immunitaire.
          </Text>
          <List withPadding>
            <List.Item>Favorise l'élimination des déchets</List.Item>
            <List.Item>Favorise l'équilibre hydrique de l'organisme</List.Item>
            <List.Item>Draine les liquides interstitiels</List.Item>
            <List.Item>
              Accompagne la relance circulatoire favorisant les échanges entre
              le système lymphatique et le système sanguin
            </List.Item>
          </List>
          <Badge color="brand" size="lg" mt="md">
            60 minutes | Session individuelle
          </Badge>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default LymphaticDrainageSection;
