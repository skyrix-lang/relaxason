import React, { FC } from "react";
import { Box, Button, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import { VisibleSectionProps } from "../../routes/Home.tsx";

const TestimonialSection: FC<VisibleSectionProps> = ({ visible }) => {
  return (
    <section
      id="testimonial"
      style={{
        scrollMarginTop: "100px",
        padding: "5rem 0",
        background: "linear-gradient(180deg, #E6F9F7 0%, #F5FFFA 100%)",
        borderRadius: "0",
        margin: "0 -24px", // Compensate for Container padding
        width: "calc(100% + 48px)", // Make section full width
      }}
      className={
        visible.testimonial
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Box px="md" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Box
          className={global.quote}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "2.5rem",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0, 105, 92, 0.08)",
            borderRadius: "12px",
            borderLeft: "4px solid #3DCFBC",
          }}
        >
          <Text size="xl" fw={500} mb="xl" style={{ lineHeight: 1.7 }}>
            "Les séances de sonothérapie ont transformé ma façon de gérer le
            stress au quotidien. Après seulement quelques séances, j'ai ressenti
            un changement profond dans mon bien-être général et ma capacité à
            rester centrée, même dans les moments difficiles."
          </Text>
          <Text fw={700} c="brand.7">
            Marie L.
          </Text>
          <Text size="sm" c="neutral.6">
            Cliente depuis 2 ans
          </Text>
        </Box>

        <Box ta="center" mt="3rem">
          <Button
            variant="outline"
            color="brand.7"
            size="lg"
            component="a"
            href="/temoignages"
            rightSection={<IconChevronRight size={18} />}
          >
            Voir tous les témoignages
          </Button>
        </Box>
      </Box>
    </section>
  );
};

export default TestimonialSection;
