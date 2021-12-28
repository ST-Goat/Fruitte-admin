import axios from "axios";
import CONFIGS from "shared/configs";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";

import { loginUrl } from "routes";

type Options = {
  params: any;
};
class AxiosService {
  service: any;
  constructor() {
    const service = axios.create({
      withCredentials: false,
      responseType: "json",
      baseURL: CONFIGS.API_ENDPOINT,
    });
    service.interceptors.request.use(this.handleInterceptRequest);
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleInterceptRequest(config: any) {
    const headerPayload = localStorage.getItem(CONFIGS.HEADER_PAYLOAD_KEY);
    config.headers.Authorization = headerPayload
      ? `Bearer ${headerPayload}`
      : "";
    return config;
  }

  handleSuccess(response: { data: any; status: number }) {
    // do something with the response
    return response;
  }

  handleError = (error: any) => {
    try {
      switch (error.response.status) {
        case HttpStatus.UNAUTHORIZED:
          localStorage.removeItem(CONFIGS.HEADER_PAYLOAD_KEY);
          sessionStorage.setItem(
            CONFIGS.TOAST,
            JSON.stringify({
              message: error.message,
              variant: SNACKBAR_VARIANTS.ERROR,
            })
          );
          window.location.replace(loginUrl);
          return Promise.reject(error);
        case HttpStatus.FORBIDDEN:
          localStorage.removeItem(CONFIGS.HEADER_PAYLOAD_KEY);
          sessionStorage.setItem(
            CONFIGS.TOAST,
            JSON.stringify({
              message: error.message,
              variant: SNACKBAR_VARIANTS.ERROR,
            })
          );
          window.location.replace(loginUrl);
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    } catch (e) {
      return Promise.reject(error);
    }
  };

  async get(endpoint: string, options?: Options) {
    // await refreshToken
    return this.service.get(endpoint, options);
  }

  async post(endpoint: string, payload?: any, options?: Options) {
    // await refreshToken
    return this.service.post(endpoint, payload, options);
  }

  async put(endpoint: string, payload?: any, options?: Options) {
    // await refreshToken
    return this.service.put(endpoint, payload, options);
  }

  async delete(endpoint: string, options?: Options) {
    // await refreshToken
    return this.service.delete(endpoint, options);
  }
}
export default new AxiosService();
