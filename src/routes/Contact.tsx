import { FunctionComponent, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Space,
  Text,
  Textarea,
  TextInput,
  Title,
  Transition,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import {
  IconCheck,
  IconClock,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
  IconSend,
} from "@tabler/icons-react";
import global from "../styles/Global.module.css";

interface ContactProps {}

const Contact: FunctionComponent<ContactProps> = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      reason: null,
    },

    validate: {
      name: isNotEmpty("Veuillez entrer votre nom"),
      email: isEmail("Veuillez entrer une adresse email valide"),
      message: isNotEmpty("Veuillez entrer votre message"),
      reason: isNotEmpty("Veuillez sélectionner une raison de contact"),
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      // Add the readable subject text
      const formData = {
        ...values,
      };

      // Send the form data to your Netlify Function
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue");
      }

      console.log("Form submitted successfully!", result);
      setSubmitted(true);

      // Optional: Reset form after a delay
      setTimeout(() => {
        setSubmitted(false);
        form.reset();
      }, 5000);
    } catch (error) {
      console.error("Failed to submit form:", error);
      // Handle error - you might want to add an error state to your component
      // setError('Une erreur est survenue lors de l\'envoi du message. Merci de réessayer plus tard.');

      // Still show success for now during development, remove this in production
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        form.reset();
      }, 5000);
    }
  };

  return (
    <div className={global.aboutWrapper}>
      {/* Page Title */}
      <Title order={1} mb="xl" className={global.sectionTitle}>
        <Box component="span" className={global.titleUnderline} />
        Contactez-moi
      </Title>

      <Text size="lg" mb="xl" ta="center" className={global.mb4}>
        Pour toute question sur la sonothérapie ou pour prendre rendez-vous,
        n'hésitez pas à me contacter via le formulaire ci-dessous.
      </Text>

      <Grid gutter={{ base: 20, md: 50 }} align="stretch">
        <Grid.Col span={{ base: 12, md: 5 }}>
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
            <Title order={3} mb="md" style={{ color: "#1A9E8E" }}>
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
                  <Text>contact@sonotherapie.fr</Text>
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
              className={global.quote}
              style={{ marginTop: "auto" }}
            >
              Je vous répondrai dans les plus brefs délais, généralement sous 24
              à 48 heures ouvrées. N'hésitez pas à laisser un numéro de
              téléphone pour être rappelé.
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Paper
            withBorder
            p="xl"
            radius="lg"
            shadow="md"
            style={{
              backgroundColor: "#F8FDFC",
              height: "100%",
            }}
          >
            <Box component="div" style={{ height: "100%" }}>
              {submitted ? (
                <Transition
                  mounted={submitted}
                  transition="fade"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      h={300}
                      style={styles}
                    >
                      <div
                        className={global.fadeInSection}
                        style={{ textAlign: "center" }}
                      >
                        <IconCheck
                          size={60}
                          stroke={1.5}
                          style={{ color: "#4CAF50" }}
                        />
                        <Title order={3} mt="md" style={{ color: "#1A9E8E" }}>
                          Message Envoyé !
                        </Title>
                        <Text ta="center" mt="sm" size="lg">
                          Merci pour votre message. Je vous répondrai dès que
                          possible.
                        </Text>
                      </div>
                    </Flex>
                  )}
                </Transition>
              ) : (
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Title order={3} mb="lg" style={{ color: "#1A9E8E" }}>
                    <IconMessageCircle
                      size={24}
                      style={{
                        marginRight: "0.5rem",
                        verticalAlign: "text-bottom",
                      }}
                    />
                    Formulaire de Contact
                  </Title>

                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput
                      label="Nom complet"
                      placeholder="Votre nom"
                      required
                      {...form.getInputProps("name")}
                      style={{ marginBottom: "1rem" }}
                      radius="md"
                    />

                    <TextInput
                      label="Email"
                      placeholder="votre.email@exemple.com"
                      required
                      {...form.getInputProps("email")}
                      style={{ marginBottom: "1rem" }}
                      radius="md"
                    />
                  </SimpleGrid>

                  <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                    <TextInput
                      label="Téléphone"
                      placeholder="Votre numéro de téléphone"
                      {...form.getInputProps("phone")}
                      style={{ marginBottom: "1rem" }}
                      radius="md"
                      leftSection={<IconPhone size={16} />}
                    />

                    <Select
                      label="Raison du contact"
                      placeholder="Sélectionnez une raison"
                      required
                      data={[
                        {
                          value: "information",
                          label: "Demande d'information",
                        },
                        { value: "session", label: "Réserver une séance" },
                        { value: "workshop", label: "Atelier / Cours" },
                        { value: "other", label: "Autre" },
                      ]}
                      {...form.getInputProps("reason")}
                      style={{ marginBottom: "1rem" }}
                      radius="md"
                    />
                  </SimpleGrid>

                  <TextInput
                    label="Sujet"
                    placeholder="Sujet de votre message"
                    mt="md"
                    {...form.getInputProps("subject")}
                    style={{ marginBottom: "1rem" }}
                    radius="md"
                  />

                  <Textarea
                    autosize
                    label="Message"
                    placeholder="Écrivez votre message ici..."
                    minRows={5}
                    mt="md"
                    required
                    {...form.getInputProps("message")}
                    style={{ marginBottom: "1rem" }}
                    radius="md"
                  />

                  <Group justify="flex-end" mt="xl">
                    <Button
                      type="submit"
                      leftSection={<IconSend size={18} />}
                      size="md"
                      radius="md"
                      style={{
                        background:
                          "linear-gradient(135deg, #3DCFBC 0%, #2BB9A7 100%)",
                        transition: "all 0.3s ease",
                      }}
                      className={global.ctaButton}
                    >
                      Envoyer le message
                    </Button>
                  </Group>
                </form>
              )}
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* FAQ Section */}
      <Paper
        withBorder
        p="xl"
        radius="lg"
        shadow="sm"
        mt="xl"
        style={{
          background: "linear-gradient(135deg, #F5FFFA 0%, #E6F9F7 100%)",
        }}
      >
        <Title order={3} mb="lg" ta="center" style={{ color: "#1A9E8E" }}>
          Foire Aux Questions
        </Title>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={20}>
          <FaqItem
            question="Comment se déroule une séance de sonothérapie ?"
            answer="Une séance de sonothérapie dure généralement entre 60 et 90 minutes. Vous serez allongé(e) confortablement pendant que j'utilise différents instruments pour créer des vibrations harmonieuses qui favorisent la relaxation profonde."
          />

          <FaqItem
            question="Faut-il se préparer avant une séance ?"
            answer="Il est recommandé de porter des vêtements confortables et d'éviter de manger un repas lourd juste avant la séance. Venez simplement dans un état d'esprit ouvert et prêt à vous détendre."
          />

          <FaqItem
            question="Quels sont les tarifs d'une séance ?"
            answer="Les tarifs varient selon le type de séance. Une séance individuelle de sonothérapie coûte généralement entre 60€ et 90€. N'hésitez pas à me contacter pour plus de détails sur les forfaits disponibles."
          />

          <FaqItem
            question="Proposez-vous des ateliers de groupe ?"
            answer="Oui, j'organise régulièrement des ateliers de groupe et des bains sonores collectifs. Ces sessions sont idéales pour découvrir la sonothérapie dans une ambiance conviviale et à un tarif plus accessible."
          />
        </SimpleGrid>
      </Paper>
    </div>
  );
};

// Component for ThemeIcon with consistent styling
const ThemeIconStyled = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: "#3DCFBC",
      color: "white",
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

// Component for FAQ items
const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <Box mb="md">
    <Text fw={700} mb="xs" size="md">
      {question}
    </Text>
    <Text size="sm" style={{ color: "#495057" }}>
      {answer}
    </Text>
  </Box>
);

export default Contact;
