import cn from 'classnames';
import { useState } from "react";
import { useLocation } from "react-router";
import { Color } from '../../../shared/comom.enum';
import { menuItems } from '../../../shared/menu.item';
import AppLogo from "../../common/AppLogo";
import  Icon from "../../common/components/Icon";
import  Text from "../../common/components/Text";
import Sidebar from "./components/Sidebar";
import SidebarContent from './components/SidebarContent';
import SideBarHeader from "./components/SidebarHeader";
import SidebarMenu from './components/SidebarMenu';
import SidebarNavItem from './components/SidebarNavItem';

const SidebarNav: React.FC = () =>{
  const location = useLocation();
  const[isCollapse, isCollapseSet] = useState(false)
  return (
    <div className="h-screen">
      <Sidebar collapse= {isCollapse} >
        <SideBarHeader>
        <div
            className={cn('flex flex-col mx-4 mt-4 mb-8 relative', {
              'justify-center': isCollapse,
            })}
          >
            <div
              className={cn('menu cursor-pointer absolute right-0 top-0', {
                'menu-collapsed': isCollapse,
              })}
              onClick={() => isCollapseSet(!isCollapse)}
            >
              <Icon name="nav-menu" />
            </div>
            <div className="flex flex-col mt-14">
              <AppLogo white={true} logoClassName="h-14" />
              {!isCollapse && (
                <Text color={Color.WHITE} className="text-base mt-6">
                  Fruitee
                </Text>
              )}
            </div>
          </div>
        </SideBarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarNavItem items={menuItems} collapsed={isCollapse} location={location} />
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

export default SidebarNav;