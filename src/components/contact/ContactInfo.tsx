import { FC } from "react";
import { Box, Divider, Flex, Paper, Space, Text, Title } from "@mantine/core";
import { IconClock, IconMail, IconMapPin } from "@tabler/icons-react";
import global from "../../styles/Global.module.css";
import styles from "./../../styles/Contact.module.css";

const ThemeIconStyled: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.themeIcon}>{children}</div>
);

const ContactInfo: FC = () => {
  return (
    <Paper
      withBorder
      p="xl"
      radius="lg"
      shadow="md"
      style={{
        background: "linear-gradient(135deg, #E6F9F7 0%, #F5FFFA 100%)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title order={3} mb="md" style={{ color: "#008577" }}>
        Informations de Contact
      </Title>

      <Space h="md" />

      <Flex direction="column" gap="lg">
        <Flex align="center" gap="md">
          <ThemeIconStyled>
            <IconMail size={24} stroke={1.5} />
          </ThemeIconStyled>
          <Box>
            <Text fw={700}>Email</Text>
            <Text>misterdb01@gmail.com</Text>
          </Box>
        </Flex>

        <Flex align="center" gap="md">
          <ThemeIconStyled>
            <IconMapPin size={24} stroke={1.5} />
          </ThemeIconStyled>
          <Box>
            <Text fw={700}>Adresse</Text>
            <Text>49 Avenue d'Epinay,</Text>
            <Text>91360 Villemoisson-sur-Orge,</Text>
            <Text>France</Text>
          </Box>
        </Flex>

        <Flex align="center" gap="md">
          <ThemeIconStyled>
            <IconClock size={24} stroke={1.5} />
          </ThemeIconStyled>
          <Box>
            <Text fw={700}>Horaires</Text>
            <Text>Du lundi au vendredi,</Text>
            <Text>9h00 - 18h00</Text>
          </Box>
        </Flex>
      </Flex>

      <Space h="xl" />

      <Divider my="md" color="brand.3" />

      <Text
        mt="md"
        size="sm"
        style={{ marginTop: "auto", padding: "1.5rem" }}
        className={global.quote}
      >
        Je vous répondrai dans les plus brefs délais, généralement sous 24 à 48
        heures ouvrées. N'hésitez pas à laisser un numéro de téléphone pour être
        rappelé.
      </Text>
    </Paper>
  );
};

export default ContactInfo;
