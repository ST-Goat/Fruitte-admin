import { userManagementUrl } from "routes";

import Main from "pages/main/Main";
import UserManagement from "pages/UserManagement";
import UserDetail from "pages/UserManagement/UserDetail";

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
];
