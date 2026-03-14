import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default";
  size?: "base";
};

export default function Button1({
  variant = "default",
  size = "base",
  children,
  ...props
}: ButtonProps) {

  const variants = {
    default:
      "bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200",
  };

  const sizes = {
    base: "text-base px-4 py-2",
  };

  return (
    <button
      {...props}
      className={`${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
}