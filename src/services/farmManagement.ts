import { PaginationDefault } from "shared/comom.enum";
import axiosServices from "services/axiosServices";

export type FarmItem = {
  id: number;
  name: string;
  address: string;
  description: string;
  incomeRate: number;
  owner: {
    name: string;
    email: string;
    phone: string;
  };
};

export type FarmListResponse = {
  data: Array<FarmItem>;
  total: number;
};

export const fetchAllFarm = async () => {
  return axiosServices.get("admin/farms").then((response) => {
    return response.data.content;
  });
};

export const fetchFarmList = async (
  params: {
    pagination: {
      page: number;
      pageSize: number;
    };
    filters: any;
  } = {
    pagination: {
      page: PaginationDefault.PAGE,
      pageSize: PaginationDefault.PAGE_SIZE,
    },
    filters: {},
  }
): Promise<FarmListResponse> => {
  const { page, pageSize } = params.pagination;
  return axiosServices
    .get("admin/farms", { params: params.filters })
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
