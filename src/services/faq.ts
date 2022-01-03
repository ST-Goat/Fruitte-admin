import axiosServices from "./axiosServices";
import { Pagination } from "shared/comom.enum";

export type FaqItem = {
  id: number | string;
  question: string;
  answer: string;
};

export const fetchFaq = async (params: {
  pagination: Pagination;
  filters?: any;
}): Promise<{
  data: FaqItem[];
  total: number;
}> => {
  const { page, pageSize } = params.pagination;
  return axiosServices.get("admin/faqs").then((response) => ({
    data: response.data.content.slice((page - 1) * pageSize, page * pageSize),
    total: response.data.content.length,
  }));
};

export const createNewFaq = async ({
  data,
}: {
  data: Exclude<FaqItem, "id">;
}) => {
  return axiosServices.post("admin/faqs", { ...data });
};

export const editExistingFaq = async ({
  faqId,
  data,
}: {
  faqId: number | string;
  data: Exclude<FaqItem, "id">;
}) => {
  return axiosServices.put(`admin/faqs/${faqId}`, { ...data });
};
