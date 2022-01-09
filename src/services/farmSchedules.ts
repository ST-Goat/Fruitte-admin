import axiosServices from "services/axiosServices";

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

export type NewScheduleData = Omit<ScheduleInfor, "id">;
export const createNewScheduleOfAcitivityId = async ({
  activityId,
  data,
}: {
  activityId: string | number;
  data: NewScheduleData;
}) => {
  return axiosServices.post(
    `admin/activities/${activityId}/schedules`,
    {
      ...data,
    },
    { params: { id: activityId } }
  );
};

export const editExistedSchedule = async ({
  scheduleId,
  data,
}: {
  scheduleId: string | number;
  data: NewScheduleData;
}) => {
  return axiosServices.put(
    `admin/schedules/${scheduleId}`,
    { ...data },
    { params: { id: scheduleId } }
  );
};

export const deleteExistedSchedule = async ({
  scheduleId,
}: {
  scheduleId: string | number;
}) => {
  return axiosServices.delete(`admin/schedules/${scheduleId}`, {
    params: { id: scheduleId },
  });
};
