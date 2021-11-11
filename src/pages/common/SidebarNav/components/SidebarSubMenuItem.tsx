import cn from "classnames";
import React, {
  FC,
  forwardRef,
  LegacyRef,
  LiHTMLAttributes,
  useState,
} from "react";
import Icon from "../../components/Icon";

type SidebarSubMenuItemProps = {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  suffix?: React.ReactNode;
  firstChild?: boolean;
  popperArrow?: boolean;
  active?: boolean;
  dot?: boolean;
  collapsed?: boolean;
  open?: boolean;
} & LiHTMLAttributes<HTMLLIElement>;

const SidebarSubMenuItem: FC<SidebarSubMenuItemProps> = forwardRef<
  unknown,
  SidebarSubMenuItemProps
>(
  (
    {
      className,
      children,
      icon,
      title,
      suffix,
      firstChild,
      popperArrow,
      active,
      dot,
      collapsed,
      open = false,
      ...props
    },
    ref
  ) => {
    const sidebarSubMenuRef: LegacyRef<HTMLLIElement> =
      (ref as any) || React.createRef<HTMLLIElement>();
    const [isOpen, setIsOpen] = useState(open);

    const toggleSubMenu = () => {
      setIsOpen(!isOpen);
    };

    return (
      <>
        <li
          ref={sidebarSubMenuRef}
          className={cn("flex flex-col sub-menu", className)}
          {...props}
        >
          <div
            className={cn(
              "flex flex-row w-full items-center justify-between border-b border-grey-100",
              !collapsed ? "py-2 pl-2 pr-2" : "py-2 px-2"
            )}
            role="button"
            tabIndex={0}
            onClick={toggleSubMenu}
          >
            {icon}
            {(!collapsed || !icon) && (
              <span
                className={cn(
                  "flex flex-row flex-1 items-center justify-start overflow-ellipsis overflow-hidden",
                  !!active || isOpen ? "text-white" : "text-opacity-white50",
                  !collapsed
                    ? "justify-start text-base font-bold leading-6"
                    : "justify-center text-xs font-normal leading-6"
                )}
              >
                {title}
                {dot && (
                  <div className="bg-red-700 rounded-lg w-2 h-2 ml-2"></div>
                )}
              </span>
            )}
            {suffix}
            {!collapsed && (
              <Icon
                name="arrow-down-white"
                className={cn("w-6 h-6", isOpen ? "transform -rotate-180" : "")}
              />
            )}
          </div>

          {!!isOpen && (
            <div>
              <ul>{children}</ul>
            </div>
          )}
        </li>
      </>
    );
  }
);

export default SidebarSubMenuItem;
