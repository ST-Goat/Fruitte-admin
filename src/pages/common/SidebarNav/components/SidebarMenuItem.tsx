import cn from "classnames";
import React, { FC, forwardRef, LegacyRef, LiHTMLAttributes } from "react";

type SidebarMenuItemProps = {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  suffix?: React.ReactNode;
  firstChild?: boolean;
  popperArrow?: boolean;
  dot?: boolean;
  collapsed?: boolean;
} & LiHTMLAttributes<HTMLLIElement>;

const SidebarMenuItem: FC<SidebarMenuItemProps> = forwardRef<
  unknown,
  SidebarMenuItemProps
>(
  (
    {
      children,
      className,
      icon,
      active,
      suffix,
      firstChild,
      popperArrow,
      dot,
      collapsed,
      ...props
    },
    ref
  ) => {
    const sidebarMenuItemRef: LegacyRef<HTMLLIElement> =
      (ref as any) || React.createRef<HTMLLIElement>();

    return (
      <>
        <li
          ref={sidebarMenuItemRef}
          className={cn("flex border-b border-grey-100", className, {
            "bg-primary-500": !!active,
          })}
          {...props}
        >
          <div
            className={cn(
              "flex flex-row w-full items-center",
              !collapsed ? "py-2 pl-2 pr-2" : "py-2 px-2",
              !collapsed || !icon ? "justify-between" : "justify-center"
            )}
            tabIndex={0}
            role="button"
          >
            {icon}
            {(!collapsed || !icon) && (
              <span
                className={cn(
                  "flex flex-row flex-1 items-center justify-start overflow-ellipsis overflow-hidden",
                  !!active ? "text-white" : "text-opacity-white50",
                  !collapsed
                    ? "justify-start text-base font-bold leading-6"
                    : "justify-center text-xs font-normal leading-6"
                )}
              >
                {children}
                {dot && (
                  <div className="bg-red-700 rounded-lg w-2 h-2 ml-2"></div>
                )}
              </span>
            )}
            {suffix}
          </div>
        </li>
      </>
    );
  }
);

export default SidebarMenuItem;
