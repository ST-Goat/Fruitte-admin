import {
  userManagementUrl,
  farmManagementUrl,
  farmManagementActivityUrl,
  farmCreationUrl,
  farmDetailUrl,
  farmReservationUrl,
  announcementUrl,
  settlementMangementUrl,
  reservationManagementUrl,
  bookingDetailUrl,
  inquiryManagementUrl,
  inquiryDetailUrl,
  faqManagementUrl,
  faqCreateUrl,
  faqDetailUrl,
} from "routes";

import Main from "pages/main/Main";
import UserManagement from "pages/UserManagement";
import UserDetail from "pages/UserManagement/UserDetail";
import FarmManagement from "pages/FarmManagement";
import FarmCreation from "pages/FarmManagement/Create";
import FarmDetail from "pages/FarmManagement/FarmDetail";
import AddOrEditActivity from "pages/FarmManagement/components/AddOrEditActivity";
import Announcement from "pages/Announcement";
import AnnouncementAddOrEdit from "pages/Announcement/AddOrEdit";
import SettlementManagement from "pages/SettlementManagement";
import AddOrEditReservation from "pages/FarmManagement/components/AddOrEditReservation";
import ReservationManagement from "pages/ReservationManagement";
import BookingDetail from "pages/ReservationManagement/BookingDetail";
import InquiryManagement from "pages/InquiryManagement";
import InquiryDetail from "pages/InquiryManagement/Detail";
import FaqManagement from "pages/FaqManagement";

import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PaymentIcon from "@mui/icons-material/Payment";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import QuizIcon from "@mui/icons-material/Quiz";
import FaqAddOrEdit from "pages/FaqManagement/AddOrEdit";

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
      {
        key: "farm-management-reservation-edit",
        label: "",
        to: `${farmReservationUrl}/:id`,
        component: AddOrEditReservation,
      },
    ],
  },
  {
    key: "settlementMangement",
    label: "pages.settlement.title",
    to: settlementMangementUrl,
    component: SettlementManagement,
    exact: true,
    icon: PaymentIcon,
    subPath: [],
  },
  {
    key: "announcement",
    label: "pages.announcement.title",
    to: announcementUrl,
    component: Announcement,
    exact: true,
    icon: AnnouncementIcon,
    subPath: [
      {
        key: "announcement-add-or-edit",
        label: "",
        to: `${announcementUrl}/:id`,
        component: AnnouncementAddOrEdit,
      },
    ],
  },
  {
    key: "reservation-management",
    label: "pages.reservation.title",
    to: reservationManagementUrl,
    component: ReservationManagement,
    exact: true,
    icon: BookOnlineIcon,
    subPath: [
      {
        key: "reservation-management-booking-detail",
        label: "",
        to: `${bookingDetailUrl}/:id`,
        component: BookingDetail,
      },
    ],
  },
  {
    key: "inquiry-management",
    label: "pages.inquiry.title",
    to: inquiryManagementUrl,
    component: InquiryManagement,
    exact: true,
    icon: CoPresentIcon,
    subPath: [
      {
        key: "inquiry-detail",
        label: "",
        to: `${inquiryDetailUrl}/:id`,
        component: InquiryDetail,
      },
    ],
  },
  {
    key: "faq-management",
    label: "pages.faq.title",
    to: faqManagementUrl,
    component: FaqManagement,
    exact: true,
    icon: QuizIcon,
    subPath: [
      {
        key: "faq-create",
        label: "",
        to: faqCreateUrl,
        component: FaqAddOrEdit,
      },
      {
        key: "faq-detail",
        label: "",
        to: `${faqDetailUrl}/:id`,
        component: FaqAddOrEdit,
      },
    ],
  },
];
