import { PaginationDefault } from "shared/comom.enum";
import axiosService from "./axiosServices";

const endpointUrl = "admin/request-partners";
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
};

export type UserListResponse = {
  content: User[];
  metadata: {
    limit: number;
    offset: number;
    total: number;
  };
  status: number;
  message: string;
};

export const fetchUserList = async (
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
): Promise<UserListResponse> => {
  const { page, pageSize } = params.pagination;
  const { search, infor, status } = params.filters;
  return axiosService
    .get(endpointUrl, {
      params: {
        limit: pageSize,
        skip: (page - 1) * pageSize,
        keywork: search,
        fieldName: infor,
        filterStatus: status,
      },
    })
    .then((response) => response.data);
};
