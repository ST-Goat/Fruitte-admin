import axiosServices from "./axiosServices";

export type FaqItem = {
  id: number | string;
  question: string;
  answer: string;
};

export const fetchAllFaq = async (): Promise<FaqItem[]> => {
  return axiosServices
    .get("admin/faqs")
    .then((response) => response.data.content);
};

type DataFaqForm = Pick<FaqItem, Exclude<keyof FaqItem, "id">>;
export const createNewFaq = async ({ data }: { data: DataFaqForm }) => {
  return axiosServices.post("admin/faqs", { ...data });
};

export const editExistingFaq = async ({
  faqId,
  data,
}: {
  faqId: number | string;
  data: DataFaqForm;
}) => {
  return axiosServices.put(`admin/faqs/${faqId}`, { ...data });
};

export const deleteFaq = async (faqId: number | string) => {
  return axiosServices.delete(`admin/faqs/${faqId}`);
};
