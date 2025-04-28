import { FC } from "react";
import { Box, Container, Group, SimpleGrid, Text, Title } from "@mantine/core";
import {
  IconCoins,
  IconGift,
  IconStar,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import PriceCard from "./pricing/PriceCard";
import CallToAction from "./pricing/CallToAction";

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
      <Container size="lg" py="xl">
        {/* Header */}
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

        <Text
          size="lg"
          mb="xl"
          ta="center"
          maw={700}
          mx="auto"
          style={{ color: "#495057" }}
        >
          Des tarifs adaptés à tous les besoins pour vous permettre d'accéder à
          un bien-être durable et personnalisé.
        </Text>

        {/* Pricing Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          <PriceCard
            icon={<IconUser size={24} />}
            title="Séances Individuelles"
            highlight={false}
            items={[
              {
                service: "Massage Sonore",
                duration: "70 min",
                price: "70€",
              },
              {
                service: "Drainage Lymphatique",
                duration: "60 min",
                price: "60€",
              },
              {
                service: "Massage Suédois",
                duration: "60 min",
                price: "60€",
              },
            ]}
            buttonText="Prendre Rendez-vous"
            href="/contact"
          />

          <PriceCard
            icon={<IconUsers size={24} />}
            title="Sessions Collectives"
            highlight={true}
            items={[
              {
                service: "Voyage Sonore Collectif",
                options: [
                  { label: "Par personne", price: "25€" },
                  { label: "Forfait couple", price: "40€" },
                ],
              },
              {
                service: "Atelier d'Expansion de Conscience",
                options: [{ label: "Atelier 9h/18h", price: "100€" }],
              },
            ]}
            buttonText="Prendre Rendez-vous"
            href="/contact"
          />

          <PriceCard
            icon={<IconStar size={24} />}
            title="Forfaits & Carte"
            highlight={false}
            items={[
              {
                service: "Forfait 3 Massages Sonores",
                price: "180€",
                note: "Valable 6 mois",
              },
              {
                service: "Forfait 3 Massages ou Drainages",
                price: "150€",
                note: "Valable 6 mois",
              },
              {
                service: "Carte Cadeau",
                price: "Personnalisable",
                icon: <IconGift size={18} />,
              },
            ]}
            buttonText="Demander un Forfait"
            href="/contact"
          />
        </SimpleGrid>

        {/* Call to Action */}
        <CallToAction
          title="Besoin d'informations supplémentaires?"
          description="N'hésitez pas à me contacter pour toute question concernant les soins ou pour une consultation personnalisée adaptée à vos besoins spécifiques."
          buttonText="Me Contacter"
          href="/contact"
        />
      </Container>
    </div>
  );
};

export default PricingSection;
