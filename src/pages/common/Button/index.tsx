import cn from "classnames";
import { Size } from "shared/comom.enum";

const SIZE_STYLE: Record<Size, string> = {
  [Size.BIG]: "px-4 h-12 min-w-min",
  [Size.BASE]: "px-4 h-10 min-w-min",
  [Size.SMALL]: "px-4 h-6 min-w-min",
};

export type ButtonProps = {
  size?: Size;
  className?: string;
  color?: "primary" | "green" | "red" | "other";
  variant?: "primary" | "other";
} & {
  [key: string]: any;
};

const bgColor: Record<NonNullable<ButtonProps["color"]>, string> = {
  primary: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-100",
  other: "",
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "rounded rounded-2 hover:opacity-80",
  other: "",
};

function ButtonCustomizer({
  size = Size.BASE,
  className,
  color = "primary",
  variant = "other",
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
