import axiosServices from "./axiosServices";

const endpointUrl = "admin/settings";

export enum SettingType {
  "ABOUT_US" = "ABOUT_US",
  "SERVICE_FRUIT_PICNIC" = "SERVICE_FRUIT_PICNIC",
  "SERVICE_FRUIT_STORE" = "SERVICE_FRUIT_STORE",
  "ABOUT_US_DETAIL" = "ABOUT_US_DETAIL",
}

export type SettingItem = {
  id: string | number;
  type: SettingType;
  content: string;
};

export const fetchSettings = async (): Promise<SettingItem[]> => {
  return axiosServices
    .get(endpointUrl)
    .then((response) => response.data.content);
};

export const editSettingItem = async ({ id, content, type }: SettingItem) => {
  return axiosServices.put(`${endpointUrl}/${id}`, {
    content,
    type,
  });
};
