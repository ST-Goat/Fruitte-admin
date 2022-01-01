import axiosServices from "services/axiosServices";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";

export type ScheduleInfor = {
  id: number;
  startAt: Date;
  oneMemberCapacity: number;
  twoMembersCapacity: number;
  threeMembersCapacity: number;
  fourMembersCapacity: number;
};

export type ScheduleItem = {
  id: number;
  name: string;
  description: string;
  info: string;
  note: string;
  duration: number;
  oneMemberPrice: number;
  twoMembersPrice: number;
  threeMembersPrice: number;
  fourMembersPrice: number;
  farmInfo: {
    id: number;
    name: string;
    address: string;
    description: string;
    districtId: number;
  };
  scheduleInfos: ScheduleInfor[];
};

export const fetchFarmSchedules = (): Promise<ScheduleItem[]> => {
  return axiosServices
    .get("admin/schedules", {
      params: {
        startDate: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        endDate: format(endOfMonth(new Date()), "yyyy-MM-dd"),
      },
    })
    .then((response) => response.data.content.activityInfos);
};
