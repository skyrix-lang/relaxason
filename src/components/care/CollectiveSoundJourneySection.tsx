import { FC } from "react";
import {
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrain,
  IconCrystalBall,
  IconInnerShadowBottomLeft,
  IconMusic,
  IconPiano,
  IconProng,
  IconUsers,
  IconWaveSine,
} from "@tabler/icons-react";
import global from "../../styles/Global.module.css";

interface CollectiveSoundJourneySectionProps {
  isVisible: boolean;
}

const CollectiveSoundJourneySection: FC<CollectiveSoundJourneySectionProps> = ({
  isVisible,
}) => {
  return (
    <div
      id="voyage"
      style={{ scrollMarginTop: "100px" }}
      className={`${global.sonoSection} ${
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }`}
    >
      <Container size="lg">
        <Group mb="md" justify="center">
          <IconWaveSine size={24} color="#3DCFBC" />
          <Title
            order={2}
            className={`${global.sectionTitle} ${global.textCenter}`}
          >
            <Box component="span" className={global.titleUnderline} />
            Voyage Sonore Collectif
          </Title>
        </Group>

        <Text
          size="lg"
          mb="xl"
          className={global.textCenter}
          maw={800}
          mx="auto"
        >
          Plongez dans un voyage sonore profond, où vibrations et fréquences
          enveloppantes vous guident vers un état de relaxation profonde et de
          recentrage intérieur.
        </Text>

        <Card className={global.quote} mb="xl">
          <Text fs={"italic"}>
            Confortablement allongé(e), enveloppé(e) dans un plaid, avec un
            coussin pour plus de détente, vous n'avez rien à faire si ce n'est
            écouter et vous laisser porter.
          </Text>
        </Card>

        <Title
          order={3}
          className={global.textCenter}
          mb="lg"
          style={{ color: "#1A9E8E" }}
        >
          Les Instruments du Voyage
        </Title>

        <Grid gutter="xl" mb="xl">
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <InstrumentCard
              icon={<IconPiano size={32} color="#3DCFBC" />}
              title="Tambour"
              description="Porteur de rythmes ancestraux qui ancrent et reconnectent à la Terre,
              associé à ma voix, pour accompagner et amplifier l'expérience."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <InstrumentCard
              icon={<IconInnerShadowBottomLeft size={32} color="#3DCFBC" />}
              title="Gongs"
              description="Leurs résonances profondes favorisent un lâcher prise immédiat."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <InstrumentCard
              icon={<IconCrystalBall size={32} color="#3DCFBC" />}
              title="Bols de cristal"
              description="Leurs harmoniques cristallines ouvrent et équilibrent les centres énergétiques."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <InstrumentCard
              icon={<IconProng size={32} color="#3DCFBC" />}
              title="Shimes et percussions"
              description="Affinent l'écoute intérieure et éveillent la sensibilité."
            />
          </Grid.Col>
        </Grid>

        <Title
          order={3}
          className={global.textCenter}
          mb="lg"
          style={{ color: "#1A9E8E" }}
        >
          Bienfaits du Voyage Sonore
        </Title>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <BenefitCard
              icon={<IconMusic size={32} color="#3DCFBC" />}
              title="Plan Physique"
              description="Libération des tensions corporelles, amélioration de la qualité du sommeil et détente musculaire profonde."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <BenefitCard
              icon={<IconUsers size={32} color="#3DCFBC" />}
              title="Plan Émotionnel et Mental"
              description="Apaisement, réduction du stress et de l'anxiété, harmonisation des émotions et clarté mentale."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <BenefitCard
              icon={<IconBrain size={32} color="#3DCFBC" />}
              title="Plan Spirituel"
              description="Expansion de la conscience, connexion intérieure profonde et sentiment d'unité amplifiés par l'énergie collective."
            />
          </Grid.Col>
        </Grid>

        <Text
          className={global.textCenter}
          mt="xl"
          mb="md"
          size="lg"
          fw={500}
          style={{ color: "#1A9E8E" }}
        >
          Chaque session est unique, guidée par l'intention du moment et les
          besoins du groupe.
        </Text>

        <Text
          className={global.textCenter}
          fs={"italic"}
          mb="xl"
          maw={800}
          mx="auto"
        >
          Laissez-vous porter par les vibrations et offrez-vous un instant hors
          du temps, une immersion sonore où le son devient un véritable soin.
        </Text>

        <div className={global.textCenter}>
          <Badge color="brand" size="lg">
            60-90 minutes | Sessions en groupe
          </Badge>
        </div>
      </Container>
    </div>
  );
};

interface InstrumentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InstrumentCard: FC<InstrumentCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className={global.serviceCard} padding="md" h="100%">
      <Stack>
        <div>{icon}</div>
        <Title order={4} style={{ color: "#1A9E8E" }}>
          {title}
        </Title>
        <Text size="sm">{description}</Text>
      </Stack>
    </Card>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <Card className={global.serviceCard} padding="xl" h="100%">
      <Stack>
        <div>{icon}</div>
        <Title order={4} style={{ color: "#1A9E8E" }}>
          {title}
        </Title>
        <Text>{description}</Text>
      </Stack>
    </Card>
  );
};

export default CollectiveSoundJourneySection;
