import axiosServices from "./axiosServices";

export type LoginPayload = {
  mobile: string;
  password: string;
  isFarmer: boolean;
};

export const login = async ({
  mobile,
  password,
  isFarmer = false,
}: LoginPayload) => {
  return axiosServices.post("common/login", {
    mobile,
    password,
    isFarmer,
  });
};
