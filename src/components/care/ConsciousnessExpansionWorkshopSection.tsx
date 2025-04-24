import { FC } from "react";
import {
  Badge,
  Box,
  Grid,
  Group,
  Image,
  List,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconBrain } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";

interface ConsciousnessExpansionWorkshopSectionProps {
  isVisible: boolean;
}

const ConsciousnessExpansionWorkshopSection: FC<
  ConsciousnessExpansionWorkshopSectionProps
> = ({ isVisible }) => {
  return (
    <div
      id="atelier"
      style={{ scrollMarginTop: "100px" }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
          <Group mb="md">
            <IconBrain size={24} color="#3DCFBC" />
            <Title order={2} className={global.sectionTitle}>
              <Box component="span" className={global.titleUnderline} />
              Atelier d'Expansion de Conscience
            </Title>
          </Group>
          <Text mb="md">
            Ces ateliers guidés combinent des techniques de respiration,
            méditation sonore et pratiques chamaniques pour explorer les
            dimensions profondes de votre conscience et potentiel intérieur.
          </Text>
          <div className={global.quote}>
            "Un voyage intérieur pour éveiller votre potentiel créatif et votre
            intuition, guidé par des sons ancestraux et des pratiques
            contemplatives."
          </div>
          <Space h="md" />
          <List withPadding>
            <List.Item>Techniques de respiration consciente</List.Item>
            <List.Item>Méditation guidée avec support sonore</List.Item>
            <List.Item>Pratiques d'ancrage énergétique</List.Item>
            <List.Item>
              Exploration des états non-ordinaires de conscience
            </List.Item>
          </List>
          <Badge color="brand" size="lg" mt="md">
            2-3 heures | Sessions en petit groupe
          </Badge>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
          <div className={global.roundedImage}>
            <Image
              src="/images/atelier-conscience.jpg"
              alt="Atelier d'Expansion de Conscience"
              height={400}
              className={global.fullWidthImage}
              fallbackSrc="https://placehold.co/600x400?text=Atelier+Conscience"
            />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ConsciousnessExpansionWorkshopSection;
