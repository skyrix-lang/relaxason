import { FunctionComponent, useEffect, useState } from "react";
import { Box, Grid, Image, Space, Text, Title } from "@mantine/core";
import global from "../styles/Global.module.css";
import portrait from "../assets/portrait.jpg";

const About: FunctionComponent = () => {
  // For animations when scrolling
  const [visible, setVisible] = useState({
    bio: false,
  });

  useEffect(() => {
    // Function to handle scrolling to section based on hash
    const scrollToSection = () => {
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    // Scroll on initial load
    scrollToSection();

    // Add event listener for hash changes - this is the key addition
    window.addEventListener("hashchange", scrollToSection);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bioSection = document.getElementById("bio");

      const isInViewport = (element: any) => {
        const rect = element?.getBoundingClientRect();
        return (
          rect &&
          rect.top <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
        );
      };

      setVisible({
        bio: isInViewport(bioSection),
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={global.aboutWrapper}>
      {/* Biography Section */}
      <div
        id="bio"
        style={{ scrollMarginTop: "90px" }}
        className={
          visible.bio
            ? `${global.fadeInSection} ${global.visible}`
            : global.fadeInSection
        }
      >
        <Grid gutter="xl" align="center" mb={60}>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Image
              radius="md"
              src={portrait}
              height={450}
              alt="Portrait du sonothérapeute"
              fit="cover"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Title order={2} mb="md" className={global.sectionTitle}>
              <Box component="span" className={global.titleUnderline} />
              Mon Parcours
            </Title>
            <Space h="lg" />
            <Text size="lg">
              Sonothérapeute passionné, je puise dans un parcours riche et
              complémentaire pour vous offrir un espace de bien-être unique.
            </Text>
            <Space h="md" />
            <Text>
              Après une riche expérience en tant qu'ingénieur du son dans
              l'audiovisuel, associé à un parcours de musicien saxophoniste
              amateur, j'ai découvert la puissance des soins énergétique par un
              ancien art chinois, le Jin-Chin-Jyutsu. Mon parcours m'a amené à
              me former au massage sonore en 2023 (Zen & Sounds), un domaine où
              l'harmonie des sons rencontre l'art du soin. Aujourd'hui, je
              propose des voyages sonores collectifs, des massages sonores
              individuels ainsi que des expansions de conscience en
              collaboration avec Michelle Resse, énergéticienne.
            </Text>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};

export default About;
