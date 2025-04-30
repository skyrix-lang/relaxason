import { FC } from "react";
import {
  Divider,
  Grid,
  List,
  Paper,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";

interface BenefitsSectionProps {
  isVisible: boolean;
}

const BenefitsSection: FC<BenefitsSectionProps> = ({ isVisible }) => {
  return (
    <div
      id="bienfaits"
      style={{ scrollMarginTop: "90px" }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Paper
        shadow="md"
        p="xl"
        radius="lg"
        withBorder
        mb={60}
        style={{
          background: "linear-gradient(45deg, #E6F9F7, #B0EAE4)",
        }}
      >
        <Title order={3} mb="xl" style={{ color: "#008577" }}>
          Les Bienfaits de la Sonothérapie
        </Title>

        <Text mb="md">
          <strong>
            Dans un deuxième temps, la sonothérapie peut soulager de nombreux
            maux de la vie quotidienne :
          </strong>
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <List
              spacing="md"
              size="md"
              center
              icon={
                <ThemeIcon color="brand.5" size={24} radius="xl">
                  <IconCircleCheck size={16} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <strong>Stress, Angoisse</strong>
              </List.Item>
              <List.Item>
                <strong>Surmenage, Burn-Out</strong>
              </List.Item>
              <List.Item>
                <strong>Migraine, Fatigue</strong>
              </List.Item>
              <List.Item>
                <strong>Insomnies</strong>
              </List.Item>
              <List.Item>
                <strong>Douleurs articulaires ou musculaires</strong>
              </List.Item>
            </List>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <List
              spacing="md"
              size="md"
              center
              icon={
                <ThemeIcon color="brand.5" size={24} radius="xl">
                  <IconCircleCheck size={16} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <strong>Troubles respiratoires</strong>
              </List.Item>
              <List.Item>
                <strong>Fibromyalgie</strong>
              </List.Item>
              <List.Item>
                <strong>Allergies</strong>
              </List.Item>
              <List.Item>
                <strong>Acouphènes</strong>
              </List.Item>
              <List.Item>
                <strong>Symptômes Parkinsoniens</strong>
              </List.Item>
            </List>
          </Grid.Col>
        </Grid>

        <Divider my="lg" color="brand.3" />

        <Text size="sm" fs="italic" ta="center">
          <strong>
            Ces méthodes douces ne se substituent pas à un avis médical. Elles
            sont complémentaires et vous ne devez en aucun cas arrêter un
            traitement sans l'avis de votre médecin.
          </strong>
        </Text>
      </Paper>

      <Paper p="xl" radius="lg" mb={30} className={global.sonoSection}>
        <Text
          size="lg"
          ta="center"
          className={global.quote}
          style={{ padding: "1.5rem" }}
        >
          En résonnance avec notre corps, ces fréquences sonores apaisent le
          mental, libèrent les tensions et aident à retrouver un équilibre
          intérieur.
        </Text>
      </Paper>
    </div>
  );
};

export default BenefitsSection;
