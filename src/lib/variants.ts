export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline"
export type ButtonSize = "sm" | "md" | "lg"

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
  secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90",
  ghost: "bg-transparent text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
  outline: "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-6",
}
