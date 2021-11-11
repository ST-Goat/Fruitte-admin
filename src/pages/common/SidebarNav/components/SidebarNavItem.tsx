import { matchPath } from "react-router-dom";
import { homepageUrl } from "routes";
import { MenuItemProps } from "shared/menu.item";
import Icon from "pages/common/components/Icon";
import { Link } from "pages/common/components/Link";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarSubMenuItem from "./SidebarSubMenuItem";

type SidebarNavItemProps = {
  k?: string;
  pathPrefix?: string;
  items: MenuItemProps[];
  collapsed?: boolean;
  location?: any;
};

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  items,
  k,
  pathPrefix,
  collapsed,
  location,
}) => {
  return (
    <>
      {items.map((item, index) => {
        if (item.items && item.items.length !== 0) {
          return (
            <SidebarSubMenuItem
              title={item.label}
              key={`${k + "_" ?? ""}${item.key}_${index}`}
              icon={
                item.icon ? (
                  <Icon name={item.icon} className={!collapsed ? "mr-4" : ""} />
                ) : null
              }
              collapsed={collapsed}
              open={
                !!matchPath(
                  location.pathname,
                  `${pathPrefix ? pathPrefix : ""}${item.to}`
                )
              }
            >
              <SidebarNavItem
                items={item.items}
                k={item.key}
                pathPrefix={item.to}
                collapsed={collapsed}
                location={location}
              />
            </SidebarSubMenuItem>
          );
        }

        const isActive =
          `${pathPrefix ? pathPrefix : ""}${item.to}` === homepageUrl
            ? location.pathname === homepageUrl
            : !!matchPath(
                location.pathname,
                `${pathPrefix ? pathPrefix : ""}${item.to}`
              );
        return (
          <SidebarMenuItem
            key={`${k + "_" ?? ""}${item.key}_${index}`}
            icon={
              item.icon ? (
                <Icon name={item.icon} className={!collapsed ? "mr-4" : ""} />
              ) : null
            }
            active={isActive}
            collapsed={collapsed}
          >
            <Link to={`${pathPrefix ? pathPrefix : ""}${item.to}`} target="">
              {item.label}
            </Link>
          </SidebarMenuItem>
        );
      })}
    </>
  );
};

export default SidebarNavItem;
