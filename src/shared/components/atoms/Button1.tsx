import { ButtonHTMLAttributes } from "react";
import { variants, sizes } from "@/lib/variants";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "xs" | "sm" | "base" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button1({
  variant = "default",
  size = "base",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${variants[variant]} ${sizes[size]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
