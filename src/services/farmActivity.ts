import { PaginationDefault } from "shared/comom.enum";
import axiosServices from "services/axiosServices";
import { ScheduleInfor } from "./farmSchedules";

// this if fix for during servicePrice is not done.

export enum FarmActivityStatus {
  ACTIVE = 1,
  DEACTIVE = 0,
}

export type ServicePrice = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
};

export type Activity = {
  id: number | string;
  name: string;
  farmName: string;
  description: string;
  info: string;
  note: string;
  duration: number;
  servicePrice: ServicePrice;
  createDate: Date;
  status: FarmActivityStatus;
  openDays: string;
  maxEnrolment: number;
  activityImages: Array<any>;
};

export type FarmActivityResponses = {
  data: Array<Activity>;
  total: number;
};

export type FilterStatus = "ACTIVE" | "DEACTIVE" | "";

export type Filters = {
  keywork: string;
  farmName?: string;
  filterStatus?: FilterStatus;
};

export const fetchFarmActivities = async (
  params: {
    pagination: {
      page: number;
      pageSize: number;
    };
    filters: Filters;
  } = {
    pagination: {
      page: PaginationDefault.PAGE,
      pageSize: PaginationDefault.PAGE_SIZE,
    },
    filters: {
      keywork: "",
    },
  }
): Promise<FarmActivityResponses> => {
  const { page, pageSize } = params.pagination;
  return axiosServices
    .get("admin/activities", { params: { ...params.filters } })
    .then((response) => {
      return {
        data: response.data.content.slice(
          (page - 1) * pageSize,
          page * pageSize
        ),
        total: !response.data.content ? 0 : response.data.content.length,
      };
    });
};

export const fetchAllActivityByFarmId = ({
  farmId,
}: {
  farmId: string | number;
}): Promise<Array<Activity>> => {
  return axiosServices
    .get(`admin/farms/${farmId}/activities`, {
      params: {
        id: farmId,
      },
    })
    .then((response) => response.data.content);
};

export type ActivityAddition = {
  id?: string | number;
  name: string;
  price: number;
};
export type NewActivityData = {
  name: string;
  description: string;
  info: string;
  note: string;
  duration: number;
  servicePrice: ServicePrice;
  openDays: string;
  maxEnrolment: number;
  activityImages: Array<any>;
  activityAdditionalServices: Array<ActivityAddition>;
};
export const createNewActivityByFarmId = async ({
  farmId,
  data,
}: {
  farmId: string | number;
  data: NewActivityData;
}) => {
  return axiosServices.post(`admin/farms/${farmId}/activities`, {
    ...data,
  });
};

export const deleteFarmActivity = async ({
  farmId,
  activityId,
}: {
  farmId: string | number;
  activityId: string | number;
}) => {
  return axiosServices.delete(
    `admin/farms/${farmId}/activities/${activityId}`,
    { params: { id: farmId, activityId: activityId } }
  );
};

export type ExistedActivityData = {
  name: string;
  description: string;
  info: string;
  note: string;
  duration: number;
  servicePrice: ServicePrice;
  openDays: string;
  maxEnrolment: number;
  activityImages: Array<any>;
  delImageLinks: Array<any>;
  newActivityAdditionalServices: Array<{
    name: string;
    price: number;
  }>;
  editActivityAdditionalServices: Array<{
    id: number | string;
    name: string;
    price: number;
  }>;
  delActivityAdditionalServices: Array<number | string>;
};
export const updateExistedActivityByFarmId = async ({
  farmId,
  activityId,
  data,
}: {
  farmId: string | number;
  activityId: string | number;
  data: ExistedActivityData;
}) => {
  return axiosServices.put(
    `admin/farms/${farmId}/activities/${activityId}`,
    { ...data },
    { params: { id: farmId, activityId: activityId } }
  );
};

export type FarmActivityDetails = {
  farmActivity: {
    id: number | string;
    name: string;
    description: string;
    note: string;
    activityInfo: string;
    duration: number;
    openDays: string;
    maxEnrolment: number;
    activityImages: Array<any>;
    activityAdditionService: Array<{
      id: number | string;
      name: string;
      price: number;
    }>;
    servicePrice: ServicePrice;
    mainPictureUrl: string;
  };
  schedulesInActivity: Array<ScheduleInfor>;
};
export const fetchFarmActivityDetail = async ({
  activityId,
}: {
  activityId: string | number;
}): Promise<FarmActivityDetails> => {
  return axiosServices
    .get(`common/farm-activities/${activityId}`)
    .then((response) => response.data);
};
