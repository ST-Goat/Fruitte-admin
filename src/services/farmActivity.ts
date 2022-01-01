import { PaginationDefault } from "shared/comom.enum";
import axiosServices from "services/axiosServices";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";

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
}: {
  farmId: string | number;
}): Promise<Array<Activity>> => {
  return axiosServices
    .get(`admin/farms/${farmId}/activities`, {
      params: {
        skip: 0,
        limit: FIXED_LIMIT,
        startDate: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        endDate: format(endOfMonth(new Date()), "yyyy-MM-dd"),
      },
    })
    .then((response) => response.data.content);
};
