/**
 * Stands in for a photo that hasn't been supplied yet. `label` is announced
 * as the image's description and shown in the box.
 */
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-[3/2] w-full items-center justify-center bg-border px-4 text-center text-[28px] font-semibold text-muted-foreground"
    >
      {label}
    </div>
  );
}
