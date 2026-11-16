import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleAlert,
  LoaderCircle,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ApiError, useSendContactMessage } from "@relaxason/api";
import {
  CONTACT_REASONS,
  contactMessageSchema,
  contactReasonOptions,
} from "@relaxason/core";
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Select,
  Textarea,
} from "@relaxason/ui";
import { Confetti } from "./confetti";

type FormInput = z.input<typeof contactMessageSchema>;
type FormOutput = z.output<typeof contactMessageSchema>;

/** How long the thank-you stays before the empty form comes back. */
const SUCCESS_MS = 5000;
const CONFETTI_MS = 3000;

const control = "h-9 py-0 shadow-none focus:border-brand-500";

function Required() {
  return (
    <span aria-hidden="true" className="text-destructive">
      {" "}
      *
    </span>
  );
}

function errorMessage(error: unknown) {
  if (error instanceof ApiError && error.status === 429) {
    return "Vous avez envoyé plusieurs messages récemment. Merci de réessayer un peu plus tard.";
  }
  return "Une erreur est survenue lors de l'envoi du message. Merci de réessayer plus tard.";
}

function SuccessMessage() {
  return (
    <div
      role="status"
      className="animate-fade-in-up absolute inset-0 z-[5] flex h-[300px] flex-col items-center justify-center"
    >
      <div className="success-container">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip" />
            <span className="icon-line line-long" />
            <div className="icon-circle" />
          </div>
        </div>
        <p className="h3 mt-6 text-brand-700">Message Envoyé !</p>
        <p className="mt-4 text-center text-lg text-body">
          Merci pour votre message. Je vous répondrai dès que possible.
        </p>
      </div>
    </div>
  );
}

/**
 * Validates with the same schema as the BFF, so the browser and the server
 * agree on what a valid message is. The server still checks: this is for speed.
 */
export function ContactForm() {
  const send = useSendContactMessage();
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      reason: "" as FormInput["reason"],
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!submitted) return;
    const hideConfetti = setTimeout(() => setConfetti(false), CONFETTI_MS);
    const showForm = setTimeout(() => setSubmitted(false), SUCCESS_MS);
    return () => {
      clearTimeout(hideConfetti);
      clearTimeout(showForm);
    };
  }, [submitted]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await send.mutateAsync({ data: values });
    } catch {
      // Shown from `send.error` below.
      return;
    }
    reset();
    setConfetti(true);
    setSubmitted(true);
  });

  return (
    <div className="relative h-full rounded-2xl border bg-surface p-6 shadow-md sm:p-12">
      {confetti && <Confetti />}
      <div className="relative h-full">
        {send.isPending && (
          <div
            role="status"
            aria-label="Envoi en cours"
            className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/70"
          >
            <LoaderCircle
              aria-hidden="true"
              size={44}
              className="animate-spin text-brand-500"
            />
          </div>
        )}

        {submitted && <SuccessMessage />}

        <form
          noValidate
          onSubmit={(event) => void onSubmit(event)}
          inert={submitted}
          className={submitted ? "opacity-0" : "opacity-100"}
        >
          <h2 className="h3 mb-8 text-brand-700">
            <MessageCircle
              aria-hidden="true"
              size={24}
              className="mr-2 inline align-text-bottom"
            />
            Formulaire de Contact
          </h2>

          {send.isError && (
            <div
              role="alert"
              className="mb-6 flex gap-4 rounded-md bg-destructive-soft p-6 text-sm text-destructive-soft-foreground"
            >
              <CircleAlert
                aria-hidden="true"
                size={16}
                className="mt-0.5 shrink-0"
              />
              <div>
                <p className="font-bold">Erreur</p>
                <p>{errorMessage(send.error)}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-[38px] sm:grid-cols-2">
            <Field invalid={!!errors.name}>
              <FieldLabel>
                Nom complet
                <Required />
              </FieldLabel>
              <Input
                className={control}
                placeholder="Votre nom"
                autoComplete="name"
                required
                {...register("name")}
              />
              <FieldError match={!!errors.name}>
                {errors.name?.message}
              </FieldError>
            </Field>

            <Field invalid={!!errors.email}>
              <FieldLabel>
                Email
                <Required />
              </FieldLabel>
              <Input
                className={control}
                type="email"
                placeholder="votre.email@exemple.com"
                autoComplete="email"
                required
                {...register("email")}
              />
              <FieldError match={!!errors.email}>
                {errors.email?.message}
              </FieldError>
            </Field>

            <Field invalid={!!errors.phone}>
              <FieldLabel>Téléphone</FieldLabel>
              <div className="relative">
                <Phone
                  aria-hidden="true"
                  size={16}
                  className="pointer-events-none absolute top-2.5 left-3 text-muted-foreground"
                />
                <Input
                  className={`${control} pl-9`}
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  autoComplete="tel"
                  {...register("phone")}
                />
              </div>
              <FieldError match={!!errors.phone}>
                Ce numéro est trop long.
              </FieldError>
            </Field>

            <Field invalid={!!errors.reason}>
              <FieldLabel>
                Raison du contact
                <Required />
              </FieldLabel>
              <Select
                className={`${control} pr-8 invalid:text-muted-foreground`}
                required
                {...register("reason")}
              >
                <option value="" disabled>
                  Sélectionnez une raison
                </option>
                {CONTACT_REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {contactReasonOptions[reason]}
                  </option>
                ))}
              </Select>
              <FieldError match={!!errors.reason}>
                Veuillez sélectionner une raison de contact
              </FieldError>
            </Field>

            <Field invalid={!!errors.subject} className="sm:col-span-2">
              <FieldLabel>Sujet</FieldLabel>
              <Input
                className={control}
                placeholder="Sujet de votre message"
                autoComplete="off"
                {...register("subject")}
              />
              <FieldError match={!!errors.subject}>
                Ce sujet est trop long.
              </FieldError>
            </Field>

            <Field invalid={!!errors.message} className="sm:col-span-2">
              <FieldLabel>
                Message
                <Required />
              </FieldLabel>
              <Textarea
                className="min-h-[123px] py-1.5 shadow-none focus:border-brand-500"
                placeholder="Écrivez votre message ici..."
                rows={5}
                required
                {...register("message")}
              />
              <FieldError match={!!errors.message}>
                {errors.message?.message}
              </FieldError>
            </Field>
          </div>

          <div className="mt-12 flex justify-end">
            <Button type="submit" variant="cta" disabled={send.isPending}>
              <Send aria-hidden="true" size={18} />
              Envoyer le message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
