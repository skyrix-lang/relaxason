import { Field as BaseField } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";
import type { ComponentProps } from "react";
import { cn, withBase } from "../lib/utils";

// A labelled form control. Base UI links the label, description and error to
// the control (for/aria-describedby), so screen readers announce them.

export function Field({
  className,
  ...props
}: ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      className={withBase("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      className={withBase("text-sm font-medium", className)}
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      className={withBase("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Shown when `match` is true; pass `match` from your form library. */
export function FieldError({
  className,
  ...props
}: ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      className={withBase(
        "text-sm text-destructive-soft-foreground",
        className,
      )}
      {...props}
    />
  );
}

const controlClass =
  "bg-card w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[invalid]:border-destructive";

export function Input({
  className,
  ...props
}: ComponentProps<typeof BaseInput>) {
  return <BaseInput className={withBase(controlClass, className)} {...props} />;
}

/** A multi-line text control, linked to its Field like Input. */
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <BaseField.Control
      render={<textarea className={cn(controlClass, className)} {...props} />}
    />
  );
}

/** A native select: the platform's own picker, on every device. */
export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <BaseField.Control
      render={
        <select
          className={cn(controlClass, "cursor-pointer", className)}
          {...props}
        />
      }
    />
  );
}
