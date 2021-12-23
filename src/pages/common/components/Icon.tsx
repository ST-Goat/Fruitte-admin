import cn from "classnames";
import React from "react";
import { Size } from "../../../shared/comom.enum";

import { ICON_SET } from "./IconSet";

type IconProp = {
  name: keyof typeof ICON_SET;
  size?: Size;
  className?: string;
  onClick?: () => void;
};

const SIZE_STYLE: Record<Size, string> = {
  [Size.BIG]: "w-8",
  [Size.BASE]: "w-6",
  [Size.SMALL]: "w-4",
  [Size.CUSTOM]: "",
};

const Icon: React.FC<IconProp> = ({
  size = Size.BASE,
  name,
  className,
  onClick,
}) => {
  const I = ICON_SET[name];
  return <I className={cn(className, SIZE_STYLE[size])} onClick={onClick} />;
};

export default Icon;
