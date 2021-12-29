import axiosServices from "./axiosServices";
import type { FormikErrors } from "formik";

export type LoginPayload = {
  email: string;
  password: string;
  isFarmer: boolean;
  setErrors?: (errors: FormikErrors<any>) => void;
};

export const login = async ({
  email,
  password,
  isFarmer = false,
}: LoginPayload) => {
  return axiosServices.post("common/login", {
    email,
    password,
    isFarmer,
  });
};
