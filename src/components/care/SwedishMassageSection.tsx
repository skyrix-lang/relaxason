import { FC } from "react";
import {
  Badge,
  Box,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { IconMassage } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import massage from "../../assets/massage.jpg";

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
        <Grid gutter="xl" mb="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={global.roundedImage}>
              <Image
                src={massage}
                alt="Massage Suédois"
                height={400}
                className={global.fullWidthImage}
                fallbackSrc="https://placehold.co/600x400?text=Massage+Suédois"
              />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group mb="md" justify="center">
              <IconMassage size={24} color="#3DCFBC" />
              <Title
                order={2}
                className={`${global.sectionTitle} ${global.textCenter}`}
                style={{ color: "#1A9E8E" }}
              >
                <Box component="span" className={global.titleUnderline} />
                Massage Suédois
              </Title>
            </Group>
            <Text mb="md">
              Le massage suédois est un massage musculaire qui peut s'effectuer
              à la fois de façon globale ou plus spécifique. En variant le
              rythme et la pression, il pourrait être soit plus relaxant ou plus
              tonifiant.
            </Text>
            <Text mb="xl">
              Les glissés, les prétrissages et les drainages entre autres,
              éxécutés en respectant une logiquer de massage, permettent la
              détente musculaire : assouplissement des tissus musculaires,
              relâchement des tensions et raideurs localisées, stimule la
              circulation et favorise une meilleure oxygénation des muscles.
            </Text>
            <Paper
              shadow="sm"
              p="lg"
              mb="xl"
              radius="md"
              withBorder
              style={{ backgroundColor: "#F8FDFC" }}
            >
              <Title order={4} mb="md" style={{ color: "#1A9E8E" }}>
                L'Expérience
              </Title>
              <Text>
                Chaque séance commence par une consultation pour déterminer vos
                besoins spécifiques. Dans une ambiance apaisante enrichie
                d'huiles essentielles, le massage est personnalisé pour cibler
                vos zones de tension.
              </Text>
              <Text mt="md">
                Une attention particulière est portée à votre confort tout au
                long de la séance, créant une expérience de détente profonde et
                régénératrice.
              </Text>
            </Paper>
            <Group mt="lg">
              <Badge color="brand" size="lg">
                60 minutes | Session individuelle
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default SwedishMassageSection;
