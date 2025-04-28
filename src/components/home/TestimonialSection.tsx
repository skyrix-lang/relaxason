import { FC } from "react";
import { Box, Container, Title } from "@mantine/core";
import { IconQuote } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import home from "../../styles/Home.module.css";
import TestimonialsCarousel from "./testimonial/TestimonialCarousel";

interface TestimonialsSectionProps {
  isVisible: boolean;
}

const TestimonialsSection: FC<TestimonialsSectionProps> = ({ isVisible }) => {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote:
        "Denis m'a transporté par ses sons dans un univers créatif où je me sentais accompagnée au cœur de mes cellules… comme si la résonnance de ses propositions sonores, me permettaient de cheminer en moi même… source d'émerveillement… une expérience qui reste vivante en moi 6 mois plus tard, à l'heure où j'écris ces lignes.",
      name: "Isabelle",
      detail: "",
    },
    {
      id: 2,
      quote:
        "Les massages sonores de Denis sont uniques. Denis est très professionnel, il a une grande écoute et attention. Je me suis sentie tout de suite en confiance et en sécurité. Il a beaucoup d'instruments qui permettent une expérience sonore très variée et puissante. J'en suis ressortie avec un sentiment d'apaisement très agréable et mes tensions s'étaient envolées. Les résultats se sont fait sentir durablement. Une très belle expérience que je recommande.",
      name: "Virginie",
      detail: "",
    },
    {
      id: 3,
      quote:
        "Les séances de sonothérapie ont transformé ma façon de gérer le stress au quotidien. Après seulement quelques séances, j'ai ressenti un changement profond dans mon bien-être général et ma capacité à rester centrée, même dans les moments difficiles.",
      name: "Lucie",
      detail: "",
    },
  ];

  return (
    <div
      id="testimonials"
      style={{ scrollMarginTop: "90px" }}
      className={
        isVisible
          ? `${global.fadeInSection} ${global.visible}`
          : global.fadeInSection
      }
    >
      <Container size="md" py="xl" className={home.testimonialContainer}>
        <Box className={global.textCenter}>
          <Title
            order={2}
            mb="md"
            className={global.sectionTitle}
            style={{ color: "#1A9E8E" }}
          >
            <Box component="span" className={global.titleUnderline} />
            Témoignages
          </Title>

          <Box
            style={{
              position: "relative",
              textAlign: "center",
              margin: "0 auto 2rem",
            }}
            className={isVisible ? home.pulse : ""}
          >
            <IconQuote
              size={40}
              style={{
                color: "#3DCFBC",
                opacity: 0.2,
                transform: isVisible ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.8s ease-in-out",
              }}
            />
          </Box>
        </Box>

        <Box mt="md" className={isVisible ? home.fadeInUp : ""}>
          <TestimonialsCarousel
            testimonials={testimonials}
            autoplaySpeed={10000}
          />
        </Box>
      </Container>
    </div>
  );
};

export default TestimonialsSection;
