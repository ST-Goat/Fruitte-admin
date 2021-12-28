import cn from "classnames";
import { Size } from "shared/comom.enum";

const SIZE_STYLE: Record<Size, string> = {
  [Size.BIG]: "px-4 h-12 min-w-min",
  [Size.BASE]: "px-4 h-10 min-w-min",
  [Size.SMALL]: "px-4 h-6 min-w-min",
  [Size.CUSTOM]: "",
};

export type ButtonProps = {
  size?: Size;
  className?: string;
  color?: "primary" | "secondary" | "red" | "brown" | "other";
  variant?: "primary" | "other";
} & {
  [key: string]: any;
};

const bgColor: Record<NonNullable<ButtonProps["color"]>, string> = {
  primary: "bg-primary-default text-white-default",
  secondary: "bg-grey-default text-white-default",
  red: "bg-red-100 text-white-default",
  brown: "bg-secondary1-default text-white-default",
  other: "",
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "rounded rounded-2 hover:opacity-80 transform active:scale-95",
  other: "",
};

function ButtonCustomizer({
  size = Size.BASE,
  className,
  color = "primary",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        className,
        bgColor[color],
        variantClasses[variant],
        SIZE_STYLE[size]
      )}
    />
  );
}

export default ButtonCustomizer;
