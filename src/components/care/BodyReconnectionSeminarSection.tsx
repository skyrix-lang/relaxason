import { FC } from "react";
import {
  Anchor,
  Box,
  Divider,
  Grid,
  Group,
  Image,
  List,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconBrandInstagram,
  IconCalendarEvent,
  IconCoins,
  IconLungs,
  IconMapPin,
} from "@tabler/icons-react";
import global from "../../styles/Global.module.css";

interface BodyReconnectionSeminarSectionProps {
  isVisible: boolean;
}

const locations = [
  {
    name: "La Ferme du Ravin Bleu",
    address: "7 Rue Turgot, 77520 Montigny-Lencoup",
  },
  {
    name: "Le Pont d'Ostara",
    address: "9 Chem. des Villerons, 77820 Le Châtelet-en-Brie",
  },
  {
    name: "La Vallée Rose",
    address: "1 chemin de la marnière, 28410 Goussainville",
  },
];

const BodyReconnectionSeminarSection: FC<
  BodyReconnectionSeminarSectionProps
> = ({ isVisible }) => {
  return (
    <div
      id="seminaire"
      style={{ scrollMarginTop: "100px" }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Group mb="md" justify="center">
            <IconLungs size={24} color="#1EB19E" />
            <Title order={2} className={global.sectionTitle}>
              <Box component="span" className={global.titleUnderline} />
              Séminaire de Reconnexion au Corps et aux Émotions
            </Title>
          </Group>

          <Text size="lg" mb="md" fw={600} style={{ color: "#0D9D8A" }}>
            L'importance du travail du corps dans le processus de guérison
          </Text>

          <Text mb="md">
            Dans un quotidien surmené, où le regard est constamment tourné vers
            l'extérieur, le faire et la productivité, on peut se sentir à la fois
            submergé et déconnecté de Soi… ressentir le besoin viscéral de
            revenir au Corps.
          </Text>

          <Text mb="md">
            Le Corps, ce véhicule qui porte nos mémoires émotionnelles et par
            lequel notre Âme cherche à déployer sa mission de vie, demande à être
            écouté et entendu afin de retrouver sa Joie et son Élan de vie. Le
            Travail du Corps (ou Bodywork) regroupe l'ensemble des outils qui
            passent par le corps pour effectuer ce travail de Guérison
            Émotionnelle et de Reconnexion à son Âme. Ses trois axes de travail
            sont :
          </Text>

          <List spacing="xs" mb="md">
            <List.Item>Le Travail du Souffle (respiration) ou Breathwork</List.Item>
            <List.Item>Le Travail du Son</List.Item>
            <List.Item>La mise en Mouvement</List.Item>
          </List>

          <Text mb="md">
            Les journées s'articulent autour de structures en mouvement, de
            séances de respiration et d'ateliers psycho-corporels. En soirée, le
            travail se poursuit avec différentes propositions musicales : voyage
            sonore, ecstatic dance, tambour chamanique, apéro jazz… Un puissant
            travail de nettoyage et de retour à Soi, que vous apprendrez à
            entretenir de manière autonome.
          </Text>

          <Space h="lg" />

          <Paper p="md" radius="md" style={{ backgroundColor: "#E6F9F7" }}>
            <Group wrap="nowrap" align="flex-start">
              <IconCalendarEvent
                size={20}
                color="#008577"
                style={{ flexShrink: 0 }}
              />
              <div>
                <Text fw={600}>Première session</Text>
                <Text>Du 9 juillet 2026 (18h) au 12 juillet 2026 (18h)</Text>
                <Text size="sm">Lieu : La Ferme du Ravin Bleu</Text>
              </div>
            </Group>

            <Divider my="sm" />

            <Group wrap="nowrap" align="flex-start">
              <IconCoins size={20} color="#008577" style={{ flexShrink: 0 }} />
              <div>
                <Text fw={600}>Tarif</Text>
                <Text>600€ tout compris</Text>
                <Text size="sm">Hébergement, repas et séminaire inclus</Text>
                <Text size="sm">
                  Au Ravin Bleu : la Grande Grange, hébergement en chambre double
                  ou triple, piscine extérieure, jardin, espace spa (sauna et
                  bain à remous) et cuisine végétarienne.
                </Text>
              </div>
            </Group>

            <Divider my="sm" />

            <Group wrap="nowrap" align="flex-start">
              <IconAlertTriangle
                size={20}
                color="#008577"
                style={{ flexShrink: 0 }}
              />
              <div>
                <Text fw={600}>Bon à savoir</Text>
                <Text size="sm">
                  Merci de nous informer en cas de maladie chronique ou
                  psychiatrique.
                </Text>
              </div>
            </Group>
          </Paper>

          <Space h="md" />

          <Paper p="md" radius="md" style={{ backgroundColor: "#F8FDFC" }} withBorder>
            <Group wrap="nowrap" align="flex-start">
              <IconMapPin size={20} color="#008577" style={{ flexShrink: 0 }} />
              <div>
                <Text fw={600} mb="xs">
                  Lieux des séminaires
                </Text>
                {locations.map((location) => (
                  <div key={location.name} style={{ marginBottom: "0.5rem" }}>
                    <Text size="sm" fw={500}>
                      {location.name}
                    </Text>
                    <Text size="sm" style={{ color: "#495057" }}>
                      {location.address}
                    </Text>
                  </div>
                ))}
              </div>
            </Group>
          </Paper>

          <Space h="md" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <div className={global.roundedImage}>
            <Image
              src="/images/seminaire-reconnexion.jpg"
              alt="Séminaire de Reconnexion au Corps et aux Émotions"
              height={400}
              className={global.fullWidthImage}
              fallbackSrc="https://placehold.co/600x400?text=S%C3%A9minaire+Reconnexion"
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
              Vos intervenants
            </Title>

            <Group gap="xs" mb="xs" wrap="nowrap">
              <Text fw={600}>Laura RICCIARDELLI</Text>
              <Anchor
                href="https://www.instagram.com/lauraeneveil/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Laura Ricciardelli (@lauraeneveil)"
                style={{ display: "inline-flex", color: "#008577" }}
              >
                <IconBrandInstagram size={18} />
              </Anchor>
            </Group>
            <Text size="sm" mb="md">
              Thérapeute psycho-corporelle, Laura accompagne depuis cinq ans le
              travail de Guérison Émotionnelle et de Réalisation de Soi. Convaincue
              que c'est par le corps que l'âme s'exprime et nous guide, elle est
              formée en Breathwork (avec toucher d'acupression), en Activation de
              l'Énergie Vitale, en Sonothérapie et en Yoga.
            </Text>

            <Text fw={600} mb="xs">
              Denis BENSOUSSAN
            </Text>
            <Text size="sm">
              Ingénieur du son et musicien saxophoniste de jazz, Denis s'est
              naturellement spécialisé en sonothérapie. Il propose des massages
              sonores individuels et des voyages sonores collectifs, et met des
              années de savoir-faire au service du travail de Reconnexion à Soi.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default BodyReconnectionSeminarSection;
