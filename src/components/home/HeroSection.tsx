import React, { FC } from "react";
import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowDown, IconChevronRight } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import styles from "../../styles/Home.module.css";
import bolsTibetains from "../../assets/bols-tibetains.jpg";
import { VisibleSectionProps } from "../../routes/Home.tsx";

const HeroSection: FC<VisibleSectionProps> = ({ visible }) => {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "80vh",
        minHeight: "500px",
        backgroundImage: "linear-gradient(135deg, #E6F9F7 0%, #C5F1EC 100%)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        marginTop: "-56px", // Match the header height from AppShell
        marginLeft: "calc(-1 * var(--mantine-spacing-md, 16px))",
        marginRight: "calc(-1 * var(--mantine-spacing-md, 16px))",
        width: "calc(100% + (2 * var(--mantine-spacing-md, 16px)))",
      }}
    >
      <Box
        style={{
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
        className={styles.heroContent}
      >
        <Grid
          gutter={{ base: 20, sm: 30, md: 40 }}
          px={{ base: "xs", sm: "md", lg: "lg" }}
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div
              className={
                visible.hero
                  ? `${global.fadeInSection} ${global.visible}`
                  : global.fadeInSection
              }
            >
              <Text size="lg" fw={500} c="brand.7" mb="sm">
                Bienvenue dans un voyage sonore
              </Text>
              <Title
                order={1}
                style={{
                  fontSize: rem(40),
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                Découvrez le pouvoir <br />
                <span style={{ color: "#3DCFBC" }}>thérapeutique des sons</span>
              </Title>
              <Text
                size="lg"
                c="neutral.7"
                maw={500}
                mb="xl"
                style={{ lineHeight: 1.6 }}
              >
                Une approche holistique qui utilise les vibrations et les
                fréquences sonores pour favoriser l'équilibre, la relaxation et
                le bien-être.
              </Text>
              <Group gap="md">
                <Button
                  size="lg"
                  radius="md"
                  className={global.ctaButton}
                  component="a"
                  href="/soins"
                  rightSection={<IconChevronRight size={18} />}
                >
                  Découvrir mes soins
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="brand.7"
                  component="a"
                  href="/contact"
                >
                  Prendre rendez-vous
                </Button>
              </Group>
            </div>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 6 }}
            pt={{ base: "xl", md: 0 }}
            className={global.hidden}
          >
            <div
              className={
                visible.hero
                  ? `${global.fadeInSection} ${global.visible}`
                  : global.fadeInSection
              }
              style={{ transitionDelay: "0.3s" }}
            >
              <Box
                className={global.roundedImage}
                style={{ boxShadow: "0 20px 40px rgba(0, 105, 92, 0.15)" }}
              >
                <Image
                  src={bolsTibetains}
                  alt="Séance de sonothérapie"
                  className={global.fullWidthImage}
                  style={{ borderRadius: "12px" }}
                />
              </Box>
            </div>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Wave decoration at bottom */}
      <Box
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          width: "100%",
          height: "120px",
          background:
            'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMjBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNGNUZGRkEiPjxwYXRoIGQ9Ik0xMjgwIDBsLTI2Mi4xIDExNi4yNkw3OTUuMDggMTE3LjMxbC0yNS4xOS0xMy4xTDYwMC44MiA4NC42bC0zOC4zNiAzMy4zTDQwMC4yIDE0MEwwIDB2MTQwaDEyODBWMHoiLz48L2c+PC9zdmc+")',
          backgroundSize: "100% 100%",
          zIndex: 1,
        }}
      />

      {/* Scroll down indicator */}
      <div className={global.hidden}>
        <Button
          variant="subtle"
          color="brand.7"
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            padding: "12px",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
          }}
          onClick={() => {
            document
              .getElementById("intro")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <IconArrowDown size={28} />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
