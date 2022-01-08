import { PaginationDefault } from "shared/comom.enum";
import axiosServices from "services/axiosServices";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";

export enum FarmActivityStatus {
  ACTIVE = 0,
  DEACTIVE = 1,
}

export type Activity = {
  id: number;
  name: string;
  farmName: string;
  description: string;
  info: string;
  note: string;
  duration: number;
  oneMemberPrice: number;
  twoMembersPrice: number;
  threeMembersPrice: number;
  fourMembersPrice: number;
  createDate: Date;
  status: FarmActivityStatus;
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

const FIXED_LIMIT = 20;
export const fetchAllActivityByFarmId = ({
  farmId,
  filters = {
    startDate: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    endDate: format(endOfMonth(new Date()), "yyyy-MM-dd"),
  },
}: {
  farmId: string | number;
  filters?: {
    startDate: string;
    endDate: string;
  };
}): Promise<Array<Activity>> => {
  const { startDate, endDate } = filters;
  return axiosServices
    .get(`admin/farms/${farmId}/activities`, {
      params: {
        skip: 0,
        limit: FIXED_LIMIT,
        startDate: startDate,
        endDate: endDate,
      },
    })
    .then((response) => response.data.content);
};

export type NewActivityData = {
  name: string;
  description: string;
  info: string;
  note: string;
  duration: number;
  oneMemberPrice: number;
  twoMembersPrice: number;
  threeMembersPrice: number;
  fourMembersPrice: number;
  activityImages: Array<{
    type: string;
    link: string;
  }>;
  activityAdditionalServices: Array<{
    name: string;
    price: number;
  }>;
};
export const createNewActivityByFarmId = async ({
  farmId,
  data,
}: {
  farmId: string | number;
  data: NewActivityData;
}) => {
  return axiosServices.post(`admin/farms/${farmId}/activities`, { ...data });
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
  oneMemberPrice: number;
  twoMembersPrice: number;
  threeMembersPrice: number;
  fourMembersPrice: number;
  activityImages: Array<{
    type: string;
    link: string;
  }>;
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
    data,
    { params: { id: farmId, activityId: activityId } }
  );
};
