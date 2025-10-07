import { FC } from "react";
import {
  Box,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrain,
  IconCalendarEvent,
  IconMapPin,
  IconUsers,
} from "@tabler/icons-react";
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
          <Group mb="md" justify="center">
            <IconBrain size={24} color="#1EB19E" />
            <Title order={2} className={global.sectionTitle}>
              <Box component="span" className={global.titleUnderline} />
              Atelier d'Expansion de Conscience
            </Title>
          </Group>

          <Text size="lg" mb="md" fw={600} style={{ color: "#0D9D8A" }}>
            Un Éveil à soi - Élevez votre conscience en musique !
          </Text>

          <Text mb="md">
            L'expansion de conscience est un voyage intérieur guidé par la voix
            et la création sonore intuitive issue de la vibration du groupe.
            Vous vivrez une reconnexion à votre essence spirituelle en état
            méditatif profond et conscient, grâce à l'énergie de votre cœur.
          </Text>

          <Text>
            Vous revisiterez certains aspects de votre passé, découvrirez des
            capacités méconnues de vous-même, les ramenant au présent, pour les
            mettre en œuvre dans votre futur.
          </Text>

          <Text fw={500} mt="md">
            Une journée pour faire le point et se repositionner sur son chemin
            de vie.
          </Text>

          <Space h="lg" />

          <Paper p="md" radius="md" style={{ backgroundColor: "#E6F9F7" }}>
            <Group wrap="nowrap" align="flex-start">
              <IconCalendarEvent size={20} color="#008577" />
              <div>
                <Text fw={600}>Prochaines dates</Text>
                <Text>09 Novembre 2025 • 07 Décembre 2025</Text>
              </div>
            </Group>

            <Divider my="sm" />

            <Group wrap="nowrap" align="flex-start">
              <IconMapPin size={20} color="#008577" />
              <div>
                <Text fw={600}>Informations pratiques</Text>
                <Text size="sm">Horaires : 9h à 18h</Text>
                <Text size="sm">Lieu : Villemoisson-sur-Orge (91)</Text>
                <Text size="sm">Repas : Auberge Espagnole</Text>
              </div>
            </Group>

            <Divider my="sm" />

            <Group wrap="nowrap" align="flex-start">
              <IconUsers size={20} color="#008577" />
              <div>
                <Text fw={600}>Format intime</Text>
                <Text size="sm">
                  De 4 à 7 personnes maximum pour un accompagnement personnalisé
                </Text>
              </div>
            </Group>
          </Paper>

          <Space h="md" />
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

          <Space h="xl" />

          <Paper
            p="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#F8FDFC" }}
          >
            <Title order={4} mb="md" style={{ color: "#008577" }}>
              Vos guides
            </Title>

            <Text fw={600} mb="xs">
              Michelle RESSE
            </Text>
            <Text size="sm" mb="md">
              Ancienne infirmière en psychiatrie, Michelle pratique les soins
              énergétiques depuis plus de vingt ans. Ses qualités d'écoute,
              d'empathie et ses capacités extrasensorielles sont complétées par
              diverses formations en Thérapie Énergétique, Expansion de
              Conscience, Sophro-Analyse et Méditation de pleine conscience.
            </Text>

            <Text fw={600} mb="xs">
              Denis BENSOUSSAN
            </Text>
            <Text size="sm">
              Musicien saxophoniste de jazz et ingénieur du son professionnel,
              Denis pratique la sonothérapie depuis plusieurs années (voyages
              sonores collectifs et massages sonores individuels). Son expertise
              musicale l'amène naturellement à la création sonore des expansions
              de conscience proposées avec Michelle.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ConsciousnessExpansionWorkshopSection;
