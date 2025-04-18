import { FunctionComponent, useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Divider,
  Grid,
  Image,
  List,
  Paper,
  Space,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import global from "../styles/Global.module.css";
import outils from "../assets/outils.jpg";
import { Link } from "react-router-dom";

const Sonotherapy: FunctionComponent = () => {
  // For animations when scrolling
  const [visible, setVisible] = useState({
    video: false,
    sonotherapy: false,
    benefits: false,
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
      const videoSection = document.getElementById("video");
      const sonoSection = document.getElementById("sonotherapie");
      const benefitsSection = document.getElementById("bienfaits");

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
        video: isInViewport(videoSection),
        sonotherapy: isInViewport(sonoSection),
        benefits: isInViewport(benefitsSection),
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={global.aboutWrapper}>
      {/* Sonotherapy Section */}
      <div
        id="sonotherapie"
        style={{ scrollMarginTop: "100px" }}
        className={
          visible.sonotherapy
            ? `${global.fadeInSection} ${global.visible}`
            : global.fadeInSection
        }
      >
        <Title order={2} mb="lg" className={global.sectionTitle}>
          <Box component="span" className={global.titleUnderline} />
          La Sonothérapie
        </Title>
        <Space h="lg" />

        <Grid gutter="xl" mb={40}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="lg" mb="md">
              La sonothérapie s'adresse à tous ceux qui cherchent à réduire le
              stress, à améliorer leur concentration ou simplement à se
              reconnecter à eux-mêmes dans une ambiance de calme et de sérénité.
            </Text>
            <Text mb="md">
              <strong>
                La sonothérapie est une tradition millénaire qui vient du Tibet,
                utilisant principalement des bols tibétin et des gongs. Au
                vingtième siècle, de nouveaux outils comme les bols de cristal
                et les diapasons thérapeutiques sont apparus et sont venus
                compléter le matériel existant.
              </strong>
            </Text>
            <Text>
              <strong>
                La Sonothérapie est une technique de soin énergétique dans
                laquelle on utilise les sons et les vibrations. Le son se
                transmettant plus facilement dans l'eau que dans l'air, et notre
                corps étant composé à plus de 70 % d'eau, il est très réceptif
                aux vibrations et ondes sonores. Les fréquences vibratoires que
                produisent les bols et diapasons thérapeutiques agissent sur les
                cellules de notre organisme et les liquides. Il en résulte en
                premier lieu une relaxation profonde, il réharmonise et vous
                reconnecte à votre corps et à votre âme.
              </strong>
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              radius="md"
              src={outils}
              alt="Outils de sonothérapie"
              height={400}
              fit="cover"
              className={global.roundedImage}
            />
          </Grid.Col>
        </Grid>
      </div>

      {/* Benefits Section */}
      <div
        id="bienfaits"
        style={{ scrollMarginTop: "90px" }}
        className={
          visible.benefits
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
            background: "linear-gradient(45deg, #E6F9F7, #C5F1EC)",
          }}
        >
          <Title order={3} mb="xl" style={{ color: "#1A9E8E" }}>
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
                  <strong>Migraine, Fatigue</strong>
                </List.Item>
                <List.Item>
                  <strong>Stress, Angoisse</strong>
                </List.Item>
                <List.Item>
                  <strong>Surmenage, Burn-Out</strong>
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
          <Text size="lg" ta="center" className={global.quote}>
            En résonnance avec notre corps, ces fréquences sonores apaisent le
            mental, libèrent les tensions et aident à retrouver un équilibre
            intérieur.
          </Text>
        </Paper>
      </div>

      {/* Video Section */}
      <div
        id="video"
        style={{ scrollMarginTop: "90px" }}
        className={
          visible.video
            ? `${global.fadeInSection} ${global.visible}`
            : global.fadeInSection
        }
      >
        <Paper
          shadow="sm"
          p="xl"
          radius="lg"
          withBorder
          mb={60}
          style={{
            backgroundColor: "#F8FDFC", // secondaryBackground from theme
          }}
        >
          <Title order={2} ta="center" mb="lg" style={{ color: "#1A9E8E" }}>
            Découvrez la Sonothérapie
          </Title>
          <Text size="lg" ta="center" mb="xl">
            Reportage Télématin sur Zen & Sounds et la sonothérapie
          </Text>
          <AspectRatio ratio={16 / 9} className={global.roundedImage}>
            <iframe
              src="https://www.youtube.com/embed/4bksvOoIyCA"
              title="Télématin zen & sounds, sonothérapie"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        </Paper>
      </div>

      {/* Call to Action */}
      <div className={`${global.textCenter} ${global.mt5} ${global.mb5}`}>
        <Paper
          p="xl"
          radius="lg"
          withBorder
          style={{
            background: "linear-gradient(135deg, #F5FFFA 0%, #E6F9F7 100%)",
          }}
        >
          <Title order={3} mb="md" style={{ color: "#1A9E8E" }}>
            Prêt à découvrir les bienfaits de la sonothérapie ?
          </Title>
          <Text size="lg" mb="xl">
            Prenez rendez-vous pour une séance personnalisée et commencez votre
            parcours vers l'harmonie intérieure.
          </Text>
          <Link
            to="/contact"
            className={global.ctaButton}
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            Prendre Rendez-vous
          </Link>
        </Paper>
      </div>
    </div>
  );
};

export default Sonotherapy;
