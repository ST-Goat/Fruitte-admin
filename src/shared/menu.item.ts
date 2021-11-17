import { userManagementUrl, farmManagementUrl } from "routes";

import Main from "pages/main/Main";
import UserManagement from "pages/UserManagement";
import UserDetail from "pages/UserManagement/UserDetail";
import FarmManagement from "pages/FarmManagement";
import FarmDetail from "pages/FarmManagement/FarmDetail";

export type MenuItemProps = {
  key: string;
  label: string;
  to: string;
  icon?: string;
  items?: MenuItemProps[];
  subPath?: MenuItemProps[];
  exact?: boolean;
  component: React.FC<any>;
};

export const menuItems: MenuItemProps[] = [
  {
    key: "dashboard",
    label: "pages.dashboard.title",
    to: "/",
    component: Main,
    exact: true,
  },
  {
    key: "user-management",
    label: "pages.userManagement.title",
    to: userManagementUrl,
    component: UserManagement,
    exact: true,
    subPath: [
      {
        key: "user-management-detail",
        label: "",
        to: `${userManagementUrl}/:id`,
        component: UserDetail,
      },
    ],
  },
  {
    key: "farm-management",
    label: "pages.farmManagement.title",
    to: farmManagementUrl,
    component: FarmManagement,
    exact: true,
    subPath: [
      {
        key: "farm-management-detail",
        label: "",
        to: `${farmManagementUrl}/:id`,
        component: FarmDetail,
      },
    ],
  },
];
