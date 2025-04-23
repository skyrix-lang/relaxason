import React, { FC } from "react";
import { Box, Button, Grid, Image, Space, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import outils from "../../assets/outils.jpg";
import { VisibleSectionProps } from "../../routes/Home.tsx";

const IntroSection: FC<VisibleSectionProps> = ({ visible }) => {
  return (
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
            La Sonothérapie est une technique de soin énergétique dans laquelle
            on utilise les sons et les vibrations. Le son se transmettant plus
            facilement dans l'eau que dans l'air, et notre corps étant composé à
            plus de 70 % d'eau, il est très réceptif aux vibrations et ondes
            sonores.
          </Text>
          <Text size="lg" mb="xl" style={{ lineHeight: 1.7 }}>
            Grâce à divers instruments comme les bols de cristal, les gongs, les
            bols et diapasons thérapeutiques, la sonothérapie invite à un
            profond état de relaxation et stimule les capacités naturelles
            d'auto-guérison. En résonnance avec notre corps, ces fréquences
            sonores apaisent le mental, libèrent les tensions et aident à
            retrouver un équilibre intérieur. La sonothérapie s'adresse à tous
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
  );
};

export default IntroSection;
