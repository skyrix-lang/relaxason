import { FC } from "react";
import { AspectRatio, Paper, Text, Title } from "@mantine/core";
import global from "../../styles/Global.module.css";

interface VideoSectionProps {
  isVisible: boolean;
}

const VideoSection: FC<VideoSectionProps> = ({ isVisible }) => {
  return (
    <div
      id="video"
      style={{ scrollMarginTop: "90px" }}
      className={
        isVisible
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
        <Title order={2} ta="center" mb="lg" style={{ color: "#008577" }}>
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
  );
};

export default VideoSection;
