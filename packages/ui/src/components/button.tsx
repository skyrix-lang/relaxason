import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { withBase } from "../lib/utils";

// Also styles links as buttons: <Link className={buttonVariants()}>. A
// <button> inside a link is invalid HTML.
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium leading-none rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground border border-input hover:bg-muted shadow-sm",
        ghost: "text-secondary-foreground hover:bg-muted",
        destructive: "bg-destructive text-primary-foreground hover:opacity-90",
        // The brand's call to action: a gradient that lifts on hover.
        cta: "bg-linear-[135deg] from-primary to-primary-hover text-primary-foreground duration-300 transition-all hover:from-primary-hover hover:to-primary-strong hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgb(0_105_92/0.15)]",
        soft: "bg-primary-hover/10 text-primary-hover hover:bg-primary-hover/15",
        outline:
          "border border-primary-strong text-primary-strong hover:bg-primary-strong/5",
        // On a coloured panel.
        inverse:
          "bg-card text-primary-soft-foreground hover:bg-primary-soft shadow-[0_8px_15px_rgb(0_0_0/0.1)]",
      },
      size: {
        sm: "h-9 px-[18px] text-sm",
        md: "h-[42px] px-[22px] text-base",
        lg: "h-[50px] px-[26px] text-lg",
        xl: "h-[60px] px-8 text-xl",
        icon: "p-2",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <BaseButton
      className={withBase(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
