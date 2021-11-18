import { userManagementUrl, farmManagementUrl } from "routes";

import Main from "pages/main/Main";
import UserManagement from "pages/UserManagement";
import UserDetail from "pages/UserManagement/UserDetail";
import FarmManagement from "pages/FarmManagement";
import FarmDetail from "pages/FarmManagement/FarmDetail";

import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

export type MenuItemProps = {
  key: string;
  label: string;
  to: string;
  icon?: any;
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
    icon: DashboardIcon,
    component: Main,
    exact: true,
  },
  {
    key: "user-management",
    label: "pages.userManagement.title",
    to: userManagementUrl,
    component: UserManagement,
    icon: PeopleIcon,
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
    icon: BusinessCenterIcon,
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
