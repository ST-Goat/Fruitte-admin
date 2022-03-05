import { PaginationDefault } from "shared/comom.enum";
import axiosService from "./axiosServices";

import { Pagination } from "shared/comom.enum";
const endpointPartnerUrl = "admin/request-partners";

export enum REQUEST_PARTNER_STATUS {
  APPROVE = "APPROVE",
  DECLINE = "DECLINE",
  PENDING = "PENDING",
}

export type Partner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: REQUEST_PARTNER_STATUS;
  createdAt: string;
};

export type PartnerListResponse = {
  content: Partner[];
  metadata: {
    limit: number;
    offset: number;
    total: number;
  };
  status: number;
  message: string;
};

export type Filters = {
  keyword?: string;
  fieldName?: "name" | "email" | "phone";
  filterStatus?: REQUEST_PARTNER_STATUS;
};

export const fetchPartners = async (
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
): Promise<PartnerListResponse> => {
  const { page, pageSize } = params.pagination;
  const { keyword, fieldName = "name", filterStatus } = params.filters;
  return axiosService
    .get(endpointPartnerUrl, {
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

export const cancelPartnerById = (id: string | number, status: boolean) => {
  return axiosService.patch(`admin/request-partners/${id}`, { status });
};

const endpointUserUrl = "admin/users";

export enum UserType {
  FARMER = "FARMER",
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export enum LoginType {
  NORMAL = "NORMAL",
  ANONYMOUS = "ANONYMOUS",
}
export type User = {
  email: string;
  id: number;
  userType: UserType;
  isActive: boolean;
  loginType: LoginType;
  phone: string;
  updatedAt: Date;
  name: string;
  avatarUrl?: string;
};

export const fetchUserList = async (params: {
  pagination?: Pagination;
  filters?: Filters;
}) => {
  if (!params.pagination) {
    return axiosService.get(endpointUserUrl).then((response) => response.data);
  }
  const { page, pageSize } = params.pagination;
  return axiosService
    .get(endpointUserUrl, {
      params: {
        limit: pageSize,
        skip: (page - 1) * pageSize,
        userName: params.filters?.keyword,
      },
    })
    .then((response) => response.data);
};

export const fetchUserDetails = (userId: string | number): Promise<User> => {
  return axiosService
    .get(`${endpointUserUrl}/${userId}`)
    .then((response) => response.data);
};

export const changeUserPassword = ({
  id,
  newPassword,
}: {
  id: string | number;
  newPassword: string;
}) => {
  return axiosService
    .patch(`${endpointUserUrl}/${id}/change-password`, { newPassword })
    .then((response) => response.data);
};
