import { HttpStatus } from "shared/comom.enum";
import axiosServices from "./axiosServices";

const endpointUrl = "admin/dashboard-info";

export type DashboardDetail = {
  incomingAmount: number;
  incomingReservationDate: Date;
  recentAmount: number;
  recentReservationDate: Date;
  remainFeedback: number;
  remainInquiry: number;
  remainRequestPartner: number;
};

export const getDashboardDetail = async (): Promise<{
  data: { content: DashboardDetail };
  status: HttpStatus;
}> => {
  return axiosServices.get(endpointUrl);
};
