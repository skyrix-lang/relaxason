import { FC } from "react";
import { Button, Group, Paper, rem, Text } from "@mantine/core";
import global from "../../../styles/Global.module.css";
import { Link } from "react-router-dom";

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const CallToAction: FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  href,
}) => {
  return (
    <Paper
      shadow="sm"
      p="xl"
      radius="lg"
      mt={50}
      style={{
        backgroundColor: "#F8FDFC",
        borderLeft: `${rem(4)} solid #1EB19E`,
      }}
    >
      <Group
        justify="center"
        gap="lg"
        wrap="nowrap"
        style={{ flexDirection: "column" }}
      >
        <Text size="lg" fw={600} ta="center">
          {title}
        </Text>
        <Text ta="center" maw={700} mx="auto">
          {description}
        </Text>
        <Button
          component={Link}
          to={href}
          className={global.ctaButton}
          size="md"
        >
          {buttonText}
        </Button>
      </Group>
    </Paper>
  );
};

export default CallToAction;
