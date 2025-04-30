import { FC } from "react";
import {
  Button,
  Card,
  Group,
  rem,
  Stack,
  ThemeIcon,
  Title,
} from "@mantine/core";
import global from "../../../styles/Global.module.css";
import { Link } from "react-router-dom";
import { PriceItem, PriceItemProps } from "./PriceItem";

interface PriceCardProps {
  icon: React.ReactNode;
  title: string;
  highlight: boolean;
  items: PriceItemProps[];
  buttonText: string;
  href: string;
}

const PriceCard: FC<PriceCardProps> = ({
  icon,
  title,
  highlight,
  items,
  buttonText,
  href,
}) => {
  return (
    <Card
      className={global.serviceCard}
      padding="lg"
      radius="md"
      withBorder
      style={{
        borderColor: highlight ? "#1EB19E" : undefined,
        borderWidth: highlight ? "2px" : undefined,
      }}
    >
      <Card.Section
        p="md"
        style={{
          backgroundColor: highlight ? "#E6F9F7" : "#F8FDFC",
          borderBottom: "1px solid #DEE2E6",
        }}
      >
        <Group justify="center" mb="xs">
          <ThemeIcon
            size={40}
            radius="md"
            variant={highlight ? "filled" : "light"}
            color={highlight ? "brand.6" : "brand.1"}
            style={{ color: highlight ? "white" : "#1EB19E" }}
          >
            {icon}
          </ThemeIcon>
        </Group>
        <Title
          order={3}
          ta="center"
          style={{ color: "#008577", fontSize: rem(24) }}
        >
          {title}
        </Title>
      </Card.Section>

      <Stack gap="md" mt="md">
        {items.map((item, index) => (
          <PriceItem key={index} {...item} />
        ))}
      </Stack>

      <Button
        component={Link}
        to={href}
        fullWidth
        radius="md"
        size="md"
        mt="xl"
        className={global.ctaButton}
        variant={highlight ? "filled" : "default"}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default PriceCard;
