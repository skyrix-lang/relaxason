import { FC } from "react";
import { Box, Stack, Text } from "@mantine/core";
import home from "../../../styles/Home.module.css";

interface TestimonialItemProps {
  quote: string;
  name: string;
  detail: string;
  isActive: boolean;
}

const TestimonialItem: FC<TestimonialItemProps> = ({
  quote,
  name,
  detail,
  isActive,
}) => {
  return (
    <div
      className={
        isActive
          ? `${home.testimonialSlide} ${home.activeSlide}`
          : home.testimonialSlide
      }
    >
      <Stack gap="lg">
        <Box
          style={{
            position: "relative",
            padding: "0 10px",
          }}
        >
          <Text
            fs="italic"
            ta="center"
            size="lg"
            mx="xl"
            className={home.quote}
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            "{quote}"
          </Text>
          <Box
            style={{
              position: "absolute",
              top: "-15px",
              left: "-5px",
              fontSize: "4rem",
              opacity: 0.1,
              color: "#3DCFBC",
              fontFamily: "serif",
            }}
          >
            "
          </Box>
        </Box>

        <Box style={{ marginTop: "auto" }}>
          <Text fw={600} ta="center" style={{ color: "#3DCFBC" }}>
            {name}
          </Text>
          <Text size="sm" ta="center" c="dimmed">
            {detail}
          </Text>
        </Box>
      </Stack>
    </div>
  );
};

export default TestimonialItem;
