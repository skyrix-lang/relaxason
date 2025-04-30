import { FC } from "react";
import {
  Alert,
  Button,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
  Transition,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconMessageCircle,
  IconPhone,
  IconSend,
} from "@tabler/icons-react";
import styles from "./../../styles/Contact.module.css";
import SuccessAnimation from "./SuccessAnimation";
import BrowserAwareSelect from "../common/BrowserAwareSelect.tsx";

interface ContactFormProps {
  loading: boolean;
  submitted: boolean;
  error: string;
  onSubmit: (values: any) => void;
}

const ContactForm: FC<ContactFormProps> = ({
  loading,
  submitted,
  error,
  onSubmit,
}) => {
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

  return (
    <Paper
      withBorder
      p="xl"
      radius="lg"
      shadow="md"
      style={{
        backgroundColor: "#F8FDFC",
        height: "100%",
        position: "relative",
      }}
    >
      <div className={styles.formContainer}>
        {loading && (
          <div className={styles.loaderOverlay}>
            <Loader color="#1EB19E" size="lg" />
          </div>
        )}

        <Transition
          mounted={submitted}
          transition="slide-up"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => <SuccessAnimation style={styles} />}
        </Transition>

        <form
          onSubmit={form.onSubmit(onSubmit)}
          className={submitted ? styles.hidden : styles.visible}
          autoComplete="on"
        >
          <Title order={3} mb="lg" style={{ color: "#008577" }}>
            <IconMessageCircle
              size={24}
              style={{
                marginRight: "0.5rem",
                verticalAlign: "text-bottom",
              }}
            />
            Formulaire de Contact
          </Title>

          {error && (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Erreur"
              color="red"
              mb="md"
              radius="md"
            >
              {error}
            </Alert>
          )}

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Nom complet"
              placeholder="Votre nom"
              required
              {...form.getInputProps("name")}
              style={{ marginBottom: "1rem" }}
              radius="md"
              name="name"
              autoComplete="name"
              inputWrapperOrder={["label", "input", "error"]}
            />

            <TextInput
              label="Email"
              placeholder="votre.email@exemple.com"
              required
              {...form.getInputProps("email")}
              style={{ marginBottom: "1rem" }}
              radius="md"
              name="email"
              autoComplete="email"
              type="email"
              inputWrapperOrder={["label", "input", "error"]}
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
              name="tel"
              autoComplete="tel"
              type="tel"
              inputWrapperOrder={["label", "input", "error"]}
            />

            <BrowserAwareSelect
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
              name="reason"
              autoComplete="off"
            />
          </SimpleGrid>

          <TextInput
            label="Sujet"
            placeholder="Sujet de votre message"
            mt="md"
            {...form.getInputProps("subject")}
            style={{ marginBottom: "1rem" }}
            radius="md"
            name="subject"
            autoComplete="off"
            inputWrapperOrder={["label", "input", "error"]}
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
            name="message"
            autoComplete="off"
            inputWrapperOrder={["label", "input", "error"]}
          />

          <Group justify="flex-end" mt="xl">
            <Button
              type="submit"
              leftSection={<IconSend size={18} />}
              size="md"
              radius="md"
              className={styles.ctaButtonStyles}
              disabled={loading}
            >
              Envoyer le message
            </Button>
          </Group>
        </form>
      </div>
    </Paper>
  );
};

export default ContactForm;
