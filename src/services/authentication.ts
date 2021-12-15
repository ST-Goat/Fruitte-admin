import axiosServices from "./axiosServices";
import type { FormikErrors } from "formik";

export type LoginPayload = {
  mobile: string;
  password: string;
  isFarmer: boolean;
  setErrors?: (errors: FormikErrors<any>) => void;
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
