import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Overlay,
  rem,
  Space,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowDown,
  IconChevronRight,
  IconHeartbeat,
  IconMicrophone,
  IconWaveSine,
  IconZodiacAquarius,
} from "@tabler/icons-react";
import global from "../styles/Global.module.css";
import styles from "../styles/Home.module.css";
import bolsTibetains from "../assets/bols-tibetains.jpg";
import outils from "../assets/outils.jpg";

const Home: FunctionComponent = () => {
  // State pour les animations au scroll
  const [visible, setVisible] = useState({
    hero: false,
    intro: false,
    benefits: false,
    services: false,
    testimonial: false,
    cta: false,
  });

  // Observer pour les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observer tous les sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      {/* Section Héro avec background en gradient */}
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
                  <span style={{ color: "#3DCFBC" }}>
                    thérapeutique des sons
                  </span>
                </Title>
                <Text
                  size="lg"
                  c="neutral.7"
                  maw={500}
                  mb="xl"
                  style={{ lineHeight: 1.6 }}
                >
                  Une approche holistique qui utilise les vibrations et les
                  fréquences sonores pour favoriser l'équilibre, la relaxation
                  et le bien-être.
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

      {/* Section Introduction */}
      <section
        id="intro"
        style={{ scrollMarginTop: "100px", padding: "6rem 0" }}
        className={
          visible.intro
            ? `${global.fadeInSection} ${global.visible}`
            : global.fadeInSection
        }
      >
        <Grid gutter={60} align="center">
          <Grid.Col
            span={{ base: 12, md: 6 }}
            order={{ base: 2, md: 1 }}
            className={global.hidden}
          >
            <Image
              src={outils}
              alt="Instruments de sonothérapie"
              className={global.roundedImage}
              height={650}
              style={{
                borderRadius: "50%",
                border: "8px solid #E6F9F7",
                boxShadow: "0 15px 30px rgba(0, 105, 92, 0.1)",
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
            <Title order={2} mb="md" className={global.sectionTitle}>
              <Box component="span" className={global.titleUnderline} />
              La Sonothérapie
            </Title>
            <Space h="lg" />
            <Text size="lg" mb="xl" style={{ lineHeight: 1.7 }}>
              La Sonothérapie est une technique de soin énergétique dans
              laquelle on utilise les sons et les vibrations. Le son se
              transmettant plus facilement dans l’eau que dans l’air, et notre
              corps étant composé à plus de 70 % d’eau, il est très réceptif aux
              vibrations et ondes sonores.
            </Text>
            <Text size="lg" mb="xl" style={{ lineHeight: 1.7 }}>
              Grâce à divers instruments comme les bols de cristal, les gongs,
              les bols et diapasons thérapeutiques, la sonothérapie invite à un
              profond état de relaxation et stimule les capacités naturelles
              d’auto-guérison. En résonnance avec notre corps, ces fréquences
              sonores apaisent le mental, libèrent les tensions et aident à
              retrouver un équilibre intérieur. La sonothérapie s’adresse à tous
              ceux qui cherchent à réduire le stress, à améliorer leur
              concentration ou simplement à se reconnecter à eux-mêmes dans une
              ambiance de calme et de sérénité.
            </Text>
            <Button
              variant="light"
              color="brand.6"
              size="md"
              component="a"
              href="/sonotherapie"
              rightSection={<IconChevronRight size={18} />}
            >
              En savoir plus
            </Button>
          </Grid.Col>
        </Grid>
      </section>

      {/* Section Bénéfices */}
      <section
        id="benefits"
        style={{
          scrollMarginTop: "100px",
          padding: "5rem 0",
          background: "linear-gradient(180deg, #F5FFFA 0%, #E6F9F7 100%)",
          borderRadius: "0",
          margin: "0 -24px", // Compensate for Container padding
          width: "calc(100% + 48px)", // Make section full width
        }}
        className={
          visible.benefits
            ? `${global.fadeInSection} ${global.visible}`
            : global.fadeInSection
        }
      >
        <Box px="md" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Box ta="center" mb="xl">
            <Title
              order={2}
              mb="md"
              className={global.sectionTitle}
              style={{ display: "inline-block" }}
            >
              <Box
                component="span"
                className={global.titleUnderline}
                style={{ left: "20%", width: "60%" }}
              />
              Les Bienfaits
            </Title>
            <Space h="lg" />
            <Text size="lg" maw={700} mx="auto" mb="xl">
              La sonothérapie offre de nombreux avantages pour votre santé
              physique et mentale. Découvrez comment cette approche peut vous
              aider.
            </Text>
          </Box>

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                className={global.serviceCard}
                style={{
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <IconWaveSine
                  size={48}
                  stroke={1.5}
                  color="#3DCFBC"
                  style={{ marginBottom: "1rem" }}
                />
                <Title order={4} mb="md" c="brand.7">
                  Réduction du stress
                </Title>
                <Text>
                  Les vibrations sonores favorisent la détente et diminuent
                  l'anxiété et les tensions accumulées.
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                className={global.serviceCard}
                style={{
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <IconHeartbeat
                  size={48}
                  stroke={1.5}
                  color="#3DCFBC"
                  style={{ marginBottom: "1rem" }}
                />
                <Title order={4} mb="md" c="brand.7">
                  Équilibre énergétique
                </Title>
                <Text>
                  Harmonise les centres énergétiques du corps pour une meilleure
                  circulation de l'énergie vitale.
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                className={global.serviceCard}
                style={{
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <IconMicrophone
                  size={48}
                  stroke={1.5}
                  color="#3DCFBC"
                  style={{ marginBottom: "1rem" }}
                />
                <Title order={4} mb="md" c="brand.7">
                  Méditation profonde
                </Title>
                <Text>
                  Facilite l'accès à des états de conscience modifiés propices à
                  la méditation et l'introspection.
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                className={global.serviceCard}
                style={{
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <IconZodiacAquarius
                  size={48}
                  stroke={1.5}
                  color="#3DCFBC"
                  style={{ marginBottom: "1rem" }}
                />
                <Title order={4} mb="md" c="brand.7">
                  Bien-être global
                </Title>
                <Text>
                  Renforce le système immunitaire et favorise un sentiment
                  durable de bien-être physique et mental.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Box>
      </section>

      {/* Section Services */}
      <section
        id="services"
        style={{ scrollMarginTop: "100px", padding: "6rem 0" }}
        className={
          visible.services
            ? `${global.fadeInSection} ${global.visible}`
            : global.fadeInSection
        }
      >
        <Title order={2} mb="md" className={global.sectionTitle}>
          <Box component="span" className={global.titleUnderline} />
          Ce que je propose
        </Title>
        <Space h="lg" />
        <Text size="lg" maw={600} mb="xl">
          Découvrez mes différentes activités adaptées à vos besoins. Chaque
          séance est personnalisée pour vous offrir une expérience unique.
        </Text>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card
              className={global.serviceCard}
              padding="xl"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "140px",
                  backgroundImage: `url('/api/placeholder/500/140')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Overlay
                  color="#3DCFBC"
                  backgroundOpacity={0.5}
                  style={{ height: "100%" }}
                />
              </Box>
              <Box style={{ marginTop: "120px" }}>
                <Title order={3} mb="md" mt="xl" c="brand.7">
                  Séances Individuelles
                </Title>
                <Text mb="md">
                  Une approche personnalisée qui répond à vos besoins
                  spécifiques. Ces séances vous permettent de profiter
                  pleinement des bienfaits de la sonothérapie dans un cadre
                  intime et adapté.
                </Text>
                <Group justify="space-between" align="center" mt="xl">
                  <Text fw={600} c="brand.8">
                    Pour 1 personne
                  </Text>
                  <Button
                    variant="light"
                    color="brand.6"
                    component="a"
                    href="/soins#individuel"
                    rightSection={<IconChevronRight size={18} />}
                  >
                    Voir les détails
                  </Button>
                </Group>
              </Box>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card
              className={global.serviceCard}
              padding="xl"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "140px",
                  backgroundImage: `url('/api/placeholder/500/140')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Overlay
                  color="#3DCFBC"
                  backgroundOpacity={0.5}
                  style={{ height: "100%" }}
                />
              </Box>
              <Box style={{ marginTop: "120px" }}>
                <Title order={3} mb="md" mt="xl" c="brand.7">
                  Voyage Sonore Collectif
                </Title>
                <Text mb="md">
                  Une expérience immersive en groupe où les vibrations sonores
                  se propagent dans tout l'espace, créant une harmonisation
                  collective et une profonde relaxation partagée.
                </Text>
                <Group justify="space-between" align="center" mt="xl">
                  <Text fw={600} c="brand.8">
                    De 5 à 20 personnes
                  </Text>
                  <Button
                    variant="light"
                    color="brand.6"
                    component="a"
                    href="/soins#collectif"
                    rightSection={<IconChevronRight size={18} />}
                  >
                    Voir les détails
                  </Button>
                </Group>
              </Box>
            </Card>
          </Grid.Col>
        </Grid>

        <Box ta="center" mt="xl">
          <Button
            size="lg"
            className={global.ctaButton}
            component="a"
            href="/soins"
            rightSection={<IconChevronRight size={18} />}
          >
            Tous mes soins
          </Button>
        </Box>
      </section>

      {/* Section Témoignage */}
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
              stress au quotidien. Après seulement quelques séances, j'ai
              ressenti un changement profond dans mon bien-être général et ma
              capacité à rester centrée, même dans les moments difficiles."
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

      {/* Section CTA */}
      <section
        id="cta"
        style={{
          position: "relative",
          padding: "4rem 0 6rem",
          backgroundColor: "#F5FFFA",
          overflow: "hidden",
        }}
        className={
          visible.cta
            ? `${global.fadeInSection} ${global.visible}`
            : global.fadeInSection
        }
      >
        <Card
          padding="xl"
          radius="lg"
          style={{
            background: "linear-gradient(135deg, #3DCFBC 0%, #1A9E8E 100%)",
            boxShadow: "0 20px 40px rgba(0, 105, 92, 0.2)",
          }}
        >
          <Grid gutter={40} align="center">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} c="white" mb="md">
                Prêt à commencer votre voyage sonore ?
              </Title>
              <Text c="white" size="lg" mb="md">
                Prenez rendez-vous dès aujourd'hui pour découvrir les bienfaits
                de la sonothérapie et entamer votre chemin vers le bien-être.
              </Text>
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 4 }}
              style={{ textAlign: "center" }}
            >
              <Button
                size="xl"
                variant="white"
                color="brand.8"
                component="a"
                href="/contact"
                rightSection={<IconChevronRight size={18} />}
                style={{
                  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                Prendre rendez-vous
              </Button>
            </Grid.Col>
          </Grid>

          {/* Decorative elements */}
          <Box
            style={{
              position: "absolute",
              bottom: "-30px",
              right: "-30px",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: "20px",
              right: "40px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
          />
        </Card>
      </section>
    </>
  );
};

export default Home;
