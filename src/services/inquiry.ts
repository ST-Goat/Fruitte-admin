import axiosServices from "./axiosServices";

const endpointUrl = "admin/inquiries";

export enum InquiryStatus {
  DONE = "DONE",
  NEW = "NEW",
}

export const fetchInquiryList = ({
  limit,
  skip,
  status,
}: {
  limit: number;
  skip: number;
  status?: InquiryStatus;
}) => {
  return axiosServices
    .get(endpointUrl, {
      params: {
        limit,
        skip,
        status,
      },
    })
    .then((response) => response.data);
};

export type Inquiry = {
  deleted: boolean;
  deletedOn: Date;
  deletedBy: string;
  id: string | number;
  sender: string;
  email: string;
  content: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
  phone: string;
  title: string;
};
export const fetchInquiryDetail = ({
  id,
}: {
  id: string;
}): Promise<Inquiry> => {
  return axiosServices
    .get(`${endpointUrl}/${id}`)
    .then((response) => response.data.data);
};
