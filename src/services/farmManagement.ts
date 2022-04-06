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
  createdAt: Date;
  status: boolean;
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
    filters: {
      keywork: string;
    };
  } = {
    pagination: {
      page: PaginationDefault.PAGE,
      pageSize: PaginationDefault.PAGE_SIZE,
    },
    filters: {
      keywork: "",
    },
  }
): Promise<FarmListResponse> => {
  const { page, pageSize } = params.pagination;
  return axiosServices
    .get("admin/farms", { params: params.filters })
    .then((response) => {
      const { keywork } = params.filters;
      return {
        data: response.data.content
          .filter((item: FarmItem) =>
            Boolean(keywork)
              ? item.name.toLowerCase().includes(keywork.toLowerCase())
              : true
          )
          .slice((page - 1) * pageSize, page * pageSize),
        total: !response.data.content ? 0 : response.data.content.length,
      };
    });
};

export type FarmerItem = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  isActive: true;
};
export type FarmDetail = {
  id: number | string;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  settlementCycle: number;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  incomeRate: number;
  farmers: FarmerItem[];
};

export const fetchFarmDetail = async ({
  farmId,
}: {
  farmId: string | number;
}): Promise<FarmDetail> => {
  return axiosServices
    .get(`admin/farms/${farmId}`)
    .then((response) => response.data);
};

export type NewFarmData = {
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  settlementCycle: number;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  incomeRate: number;
  userIds: Array<number>;
};
export const createNewFarm = async ({ data }: { data: NewFarmData }) => {
  return axiosServices.post("admin/farms", {
    ...data,
    districtId: 1,
  });
};

export type FarmDataEdit = {
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  settlementCycle: number;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  incomeRate: number;
  newUserIds: number[];
  deleteUserIds: number[];
};
export const updateFarmWithData = async ({
  data,
  farmId,
}: {
  data: FarmDataEdit;
  farmId: string | number;
}) => {
  return axiosServices.put(`admin/farms/${farmId}`, {
    ...data,
    districtId: 1,
  });
};

export const deleteFarmWithId = async (farmId: string | number) => {
  return axiosServices.delete(`admin/farms/${farmId}`, {
    params: {
      id: farmId,
    },
  });
};
