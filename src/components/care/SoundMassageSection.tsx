import { FC } from "react";
import {
  Alert,
  Badge,
  Box,
  Grid,
  Group,
  Image,
  List,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { IconAlertTriangle, IconWaveSine } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import bolsDos from "../../assets/bols-dos.jpg";

interface SoundMassageSectionProps {
  isVisible: boolean;
}

const SoundMassageSection: FC<SoundMassageSectionProps> = ({ isVisible }) => {
  return (
    <div
      id="massage"
      style={{ scrollMarginTop: "100px" }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Paper
        p="xl"
        radius="lg"
        withBorder
        style={{
          backgroundColor: "#F8FDFC", // secondaryBackground from theme
        }}
      >
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={global.roundedImage}>
              <Image
                src={bolsDos}
                alt="Massage Sonore Individuel"
                className={global.fullWidthImage}
                fallbackSrc="https://placehold.co/600x400?text=Massage+Sonore"
              />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group mb="md">
              <IconWaveSine size={24} color="#3DCFBC" />
              <Title order={2} className={global.sectionTitle}>
                <Box component="span" className={global.titleUnderline} />
                Massage Sonore Individuel
              </Title>
            </Group>
            <Text size="lg" fw={500} mb="md" style={{ color: "#1A9E8E" }}>
              Une expérience inoubliable de bien-être profond
            </Text>
            <Text mb="md">
              Allongé confortablement sur une table de massage, habillé,
              découvrez le pouvoir apaisant du massage sonore individuel. Une
              méthode douce et immersive qui utilise les vibrations des bols et
              des diapasons thérapeutiques posés sur vous pour rééquilibrer le
              corps et l'esprit.
            </Text>
            <Text mb="md">
              Lors de cette séance personnalisée, chaque son résonne dans votre
              corps, libérant les tensions, favorisant la relaxation et
              stimulant la circulation de l'énergie.
            </Text>
            <Badge color="brand" size="lg" mt="md">
              60-90 minutes | Session individuelle
            </Badge>
          </Grid.Col>
        </Grid>

        <Grid mt="xl">
          <Grid.Col span={12}>
            <Title order={3} mb="md" style={{ color: "#1A9E8E" }}>
              Bienfaits du Massage Sonore
            </Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <List
                  spacing="sm"
                  icon={
                    <Box component="span" style={{ color: "#3DCFBC" }}>
                      •
                    </Box>
                  }
                >
                  <List.Item>Rééquilibre le système nerveux</List.Item>
                  <List.Item>Diminue le stress et l'anxiété</List.Item>
                  <List.Item>Améliore la qualité du sommeil</List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <List
                  spacing="sm"
                  icon={
                    <Box component="span" style={{ color: "#3DCFBC" }}>
                      •
                    </Box>
                  }
                >
                  <List.Item>Libère les tensions musculaires</List.Item>
                  <List.Item>Stimule la circulation énergétique</List.Item>
                  <List.Item>
                    Favorise un sentiment d'harmonie intérieure
                  </List.Item>
                </List>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Text mt="xl" mb="xl" fs={"italic"} ta="center" fw={500}>
          Offrez-vous un moment unique de recentrage et d'harmonie intérieure,
          pour un bien-être durable et une paix retrouvée.
        </Text>
        <Alert
          icon={<IconAlertTriangle size={16} />}
          title="Précautions importantes"
          color="accent.5"
          radius="md"
        >
          <Text>La sonothérapie est à éviter pour les personnes :</Text>
          <List size="sm" mt="xs">
            <List.Item>Portant un pacemaker ou stent</List.Item>
            <List.Item>Épileptiques</List.Item>
            <List.Item>Souffrant d'asthme grave</List.Item>
            <List.Item>
              Femmes enceintes de moins de 4 mois ou de plus de 8 mois
            </List.Item>
          </List>
        </Alert>
      </Paper>
    </div>
  );
};

export default SoundMassageSection;
