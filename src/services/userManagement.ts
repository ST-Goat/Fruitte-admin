import { PaginationDefault } from "shared/comom.enum";
import axiosService from "./axiosServices";

const endpointUrl = "admin/request-partners";

export enum REQUEST_PARTNER_STATUS {
  APPROVE = "APPROVE",
  DECLINE = "DECLINE",
  PENDING = "PENDING",
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: REQUEST_PARTNER_STATUS;
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

export type Pagination = {
  page: number;
  pageSize: number;
};

export type Filters = {
  keyword?: string;
  fieldName?: "name" | "email" | "phone";
  filterStatus?: REQUEST_PARTNER_STATUS;
};

export const fetchUserList = async (
  params: {
    pagination: Pagination;
    filters: Filters;
  } = {
    pagination: {
      page: PaginationDefault.PAGE,
      pageSize: PaginationDefault.PAGE_SIZE,
    },
    filters: {},
  }
): Promise<UserListResponse> => {
  const { page, pageSize } = params.pagination;
  const { keyword, fieldName = "name", filterStatus } = params.filters;
  return axiosService
    .get(endpointUrl, {
      params: {
        limit: pageSize,
        skip: (page - 1) * pageSize,
        keywork: keyword,
        fieldName: Boolean(keyword) ? fieldName : undefined,
        filterStatus,
      },
    })
    .then((response) => response.data);
};
