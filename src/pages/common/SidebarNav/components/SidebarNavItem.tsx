import { matchPath } from "react-router-dom";
import { homepageUrl } from "routes";
import { MenuItemProps } from "shared/menu.item";
import Icon from "pages/common/components/Icon";
import { Link } from "pages/common/components/Link";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarSubMenuItem from "./SidebarSubMenuItem";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
              open={Boolean(
                matchPath(
                  location.pathname,
                  `${pathPrefix ? pathPrefix : ""}${item.to}`
                )
              )}
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
            : Boolean(
                matchPath(
                  location.pathname,
                  `${pathPrefix ? pathPrefix : ""}${item.to}`
                )
              );
        return (
          <Link
            key={`${k + "_" ?? ""}${item.key}_${index}`}
            to={`${pathPrefix ? pathPrefix : ""}${item.to}`}
            target=""
          >
            <SidebarMenuItem
              icon={
                item.icon ? (
                  <Icon name={item.icon} className={!collapsed ? "mr-4" : ""} />
                ) : null
              }
              active={isActive}
              collapsed={collapsed}
            >
              {t(item.label)}
            </SidebarMenuItem>
          </Link>
        );
      })}
    </>
  );
};

export default SidebarNavItem;
