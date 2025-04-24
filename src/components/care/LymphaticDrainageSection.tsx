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
          <Group mb="md">
            <IconDroplet size={24} color="#3DCFBC" />
            <Title order={2} className={global.sectionTitle}>
              <Box component="span" className={global.titleUnderline} />
              Drainage
            </Title>
          </Group>
          <Text mb="md">
            Le drainage manuel de bien-être est une technique douce qui stimule
            la circulation de la lymphe pour éliminer les toxines, réduire les
            gonflements et renforcer le système immunitaire.
          </Text>
          <Text mb="md">
            Cette approche thérapeutique utilise des mouvements lents,
            rythmiques et précis pour détoxifier l'organisme et améliorer votre
            bien-être général.
          </Text>
          <List withPadding>
            <List.Item>Réduit la rétention d'eau</List.Item>
            <List.Item>Stimule le système immunitaire</List.Item>
            <List.Item>Améliore la circulation sanguine</List.Item>
            <List.Item>Effet détoxifiant naturel</List.Item>
          </List>
          <Badge color="brand" size="lg" mt="md">
            60 minutes
          </Badge>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default LymphaticDrainageSection;
