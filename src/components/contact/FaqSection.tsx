import { FC } from "react";
import { Box, Paper, SimpleGrid, Text, Title } from "@mantine/core";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: FC<FaqItemProps> = ({ question, answer }) => (
  <Box mb="md">
    <Text fw={700} mb="xs" size="md">
      {question}
    </Text>
    <Text size="sm" style={{ color: "#495057" }}>
      {answer}
    </Text>
  </Box>
);

const FaqSection: FC = () => {
  return (
    <Paper
      withBorder
      p="xl"
      radius="lg"
      shadow="sm"
      mt="xl"
      style={{
        background: "linear-gradient(135deg, #F5FFFA 0%, #E6F9F7 100%)",
      }}
    >
      <Title order={3} mb="lg" ta="center" style={{ color: "#1A9E8E" }}>
        Foire Aux Questions
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={20}>
        <FaqItem
          question="Comment se déroule une séance de sonothérapie ?"
          answer="Une séance de sonothérapie dure généralement entre 60 et 90 minutes. Vous serez allongé(e) confortablement pendant que j'utilise différents instruments pour créer des vibrations harmonieuses qui favorisent la relaxation profonde."
        />

        <FaqItem
          question="Faut-il se préparer avant une séance ?"
          answer="Il est recommandé de porter des vêtements confortables et d'éviter de manger un repas lourd juste avant la séance. Venez simplement dans un état d'esprit ouvert et prêt à vous détendre."
        />

        <FaqItem
          question="Quels sont les tarifs d'une séance ?"
          answer="Les tarifs varient selon le type de séance. Une séance individuelle de sonothérapie coûte généralement entre 60€ et 90€. N'hésitez pas à me contacter pour plus de détails sur les forfaits disponibles."
        />

        <FaqItem
          question="Proposez-vous des ateliers de groupe ?"
          answer="Oui, j'organise régulièrement des ateliers de groupe et des bains sonores collectifs. Ces sessions sont idéales pour découvrir la sonothérapie dans une ambiance conviviale et à un tarif plus accessible."
        />
      </SimpleGrid>
    </Paper>
  );
};

export default FaqSection;
