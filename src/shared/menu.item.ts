import { UseManagemetUrl } from "routes";

import Main from "pages/main/Main";
import UserManagement from "pages/UserManagement";

export type MenuItemProps = {
  key: string;
  label: string;
  to: string;
  icon?: string;
  items?: MenuItemProps[];
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
    to: UseManagemetUrl,
    component: UserManagement,
  },
];
