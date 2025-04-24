import { FC } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  List,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconCoins } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import { Link } from "react-router-dom";

interface PricingSectionProps {
  isVisible: boolean;
}

const PricingSection: FC<PricingSectionProps> = ({ isVisible }) => {
  return (
    <div
      id="tarifs"
      style={{ scrollMarginTop: "100px" }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Group mb="md" justify="center">
        <IconCoins size={24} color="#3DCFBC" />
        <Title
          order={2}
          className={`${global.sectionTitle} ${global.textCenter}`}
        >
          <Box component="span" className={global.titleUnderline} />
          Tarifs
        </Title>
      </Group>

      <Text size="lg" mb="xl" className={global.textCenter} maw={800} mx="auto">
        Des tarifs adaptés à tous les besoins pour vous permettre d'accéder à un
        bien-être durable.
      </Text>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <ServiceCard
            title="Séances Individuelles"
            services={[
              {
                name: "Massage Sonore",
                prices: ["60 min - 75€", "90 min - 95€"],
              },
              {
                name: "Drainage Lymphatique",
                prices: ["60 min - 70€"],
              },
              {
                name: "Massage Suédois",
                prices: ["60 min - 70€", "90 min - 90€"],
              },
            ]}
            buttonText="Prendre Rendez-vous"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <ServiceCard
            title="Sessions Collectives"
            services={[
              {
                name: "Voyage Sonore Collectif",
                prices: ["Par personne - 35€", "Forfait couple - 60€"],
              },
              {
                name: "Atelier d'Expansion de Conscience",
                prices: ["Session de 2h - 45€", "Session de 3h - 60€"],
              },
            ]}
            buttonText="Voir le Calendrier"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
          <ServiceCard
            title="Forfaits & Abonnements"
            services={[
              {
                name: "Forfait 3 Séances",
                prices: ["3 massages au choix - 195€"],
                note: "Valable 3 mois",
              },
              {
                name: "Pass Bien-être",
                prices: ["5 séances collectives - 150€"],
                note: "Valable 6 mois",
              },
              {
                name: "Carte Cadeau",
                prices: ["Montant personnalisable"],
              },
            ]}
            buttonText="Découvrir les Offres"
          />
        </Grid.Col>
      </Grid>

      <Space h="xl" />

      <div className={global.quote + " " + global.textCenter}>
        <Text size="lg" fw={600} mb="sm">
          Besoin d'informations supplémentaires?
        </Text>
        <Text mb="md">
          N'hésitez pas à me contacter pour toute question concernant les soins
          ou pour une consultation personnalisée adaptée à vos besoins
          spécifiques.
        </Text>
        <Button component={Link} to={"/contact"} className={global.ctaButton}>
          Contact
        </Button>
      </div>
    </div>
  );
};

interface ServiceType {
  name: string;
  prices: string[];
  note?: string;
}

interface ServiceCardProps {
  title: string;
  services: ServiceType[];
  buttonText: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, services, buttonText }) => {
  return (
    <Card className={global.serviceCard} padding="xl" withBorder>
      <Title order={3} mb="sm" style={{ color: "#1A9E8E" }}>
        {title}
      </Title>
      <List withPadding spacing="md">
        {services.map((service, index) => (
          <List.Item key={index}>
            <Text fw={500}>{service.name}</Text>
            {service.prices.map((price, priceIndex) => (
              <Text key={priceIndex}>{price}</Text>
            ))}
            {service.note && (
              <Text>
                <i>{service.note}</i>
              </Text>
            )}
          </List.Item>
        ))}
      </List>
      <Space h="md" />
      <Button fullWidth className={global.ctaButton}>
        {buttonText}
      </Button>
    </Card>
  );
};

export default PricingSection;
