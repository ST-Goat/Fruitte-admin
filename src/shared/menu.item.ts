import {
  userManagementUrl,
  farmManagementUrl,
  farmManagementActivityUrl,
  farmManagementActivityCreateUrl,
  farmActivityUrl,
  farmCreationUrl,
  farmDetailUrl,
} from "routes";

import Main from "pages/main/Main";
import UserManagement from "pages/UserManagement";
import UserDetail from "pages/UserManagement/UserDetail";
import FarmManagement from "pages/FarmManagement";
import FarmCreation from "pages/FarmManagement/Create";
import FarmDetail from "pages/FarmManagement/FarmDetail";
import FarmActivity from "pages/FarmActivity";
import AddOrEditActivity from "pages/FarmManagement/AddOrEditActivity";

import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

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
        key: "farm-management-creation",
        label: "",
        to: farmCreationUrl,
        exact: true,
        component: FarmCreation,
      },
      {
        key: "farm-management-detail",
        label: "",
        to: `${farmDetailUrl}/:id`,
        component: FarmDetail,
      },
      {
        key: "farm-management-activity-detail",
        label: "",
        to: `${farmManagementActivityUrl}/:id`,
        component: AddOrEditActivity,
      },
    ],
  },
  {
    key: "farm-activity",
    label: "pages.farmActivity.title",
    to: farmActivityUrl,
    component: FarmActivity,
    exact: true,
    icon: LocalActivityIcon,
  },
];
