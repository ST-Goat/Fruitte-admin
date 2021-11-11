import cn from "classnames";
import { useState } from "react";
import { useLocation } from "react-router";
import { Color } from "shared/comom.enum";
import { menuItems } from "shared/menu.item";
import Icon from "../components/Icon";
import Text from "../components/Text";
import Sidebar from "./components/Sidebar";
import SidebarContent from "./components/SidebarContent";
import SideBarHeader from "./components/SidebarHeader";
import SidebarMenu from "./components/SidebarMenu";
import SidebarNavItem from "./components/SidebarNavItem";

import "./index.scss";

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const [isCollapse, isCollapseSet] = useState(false);
  return (
    <div id="sidebar__nav">
      <Sidebar collapse={isCollapse}>
        <SideBarHeader>
          <div
            className={cn(
              "transition duration-500 ease-in-out w-full flex m-4 mb-8 relative",
              {
                "justify-center": isCollapse,
              }
            )}
          >
            <div
              className={cn(
                "transition duration-500 ease-in-out overflow-hidden",
                "text-base flex-grow",
                !isCollapse ? "block" : "hidden"
              )}
            >
              <Text color={Color.WHITE}>Main Menu</Text>
            </div>
            <div
              className={cn("menu cursor-pointer", {
                "menu-collapsed": isCollapse,
              })}
              onClick={() => isCollapseSet(!isCollapse)}
            >
              <Icon name={isCollapse ? "circle-arrow-right" : "nav-menu"} />
            </div>
          </div>
        </SideBarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarNavItem
              items={menuItems}
              collapsed={isCollapse}
              location={location}
            />
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default SidebarNav;
