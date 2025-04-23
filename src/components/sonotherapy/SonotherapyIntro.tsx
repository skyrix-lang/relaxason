import { FC } from "react";
import { Box, Grid, Image, Space, Text, Title } from "@mantine/core";
import global from "../../styles/Global.module.css";
import outils from "../../assets/outils.jpg";

interface SonotherapyIntroProps {
  isVisible: boolean;
}

const SonotherapyIntro: FC<SonotherapyIntroProps> = ({ isVisible }) => {
  return (
    <div
      id="sonotherapie"
      style={{ scrollMarginTop: "100px" }}
      className={
        isVisible
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
              vingtième siècle, de nouveaux outils comme les bols de cristal et
              les diapasons thérapeutiques sont apparus et sont venus compléter
              le matériel existant.
            </strong>
          </Text>
          <Text>
            <strong>
              La Sonothérapie est une technique de soin énergétique dans
              laquelle on utilise les sons et les vibrations. Le son se
              transmettant plus facilement dans l'eau que dans l'air, et notre
              corps étant composé à plus de 70 % d'eau, il est très réceptif aux
              vibrations et ondes sonores. Les fréquences vibratoires que
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
  );
};

export default SonotherapyIntro;
