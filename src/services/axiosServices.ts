import axios from "axios";
import CONFIGS from "shared/configs";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";

import { loginUrl } from "routes";
import { addTokenToStorage, removeTokenInStorage } from "utilities/helper";
import fetchAccessToken from "services/refreshToken";
import { store } from "redux/store";
import { enqueueSnackbar } from "redux/slices/snackbar";

type Options = {
  params: any;
};

let isAlreadyFetchingAccessToken = false;
let subscribers: any[] = [];

function onAccessTokenFetched(access_token: string, refresh_token: string) {
  subscribers = subscribers.filter((callback) =>
    callback(access_token, refresh_token)
  );
}

function addSubscriber(callback: any) {
  subscribers.push(callback);
}

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
    const {
      config,
      response: { status, data },
    } = error;
    const originalRequest = config;
    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
          fetchAccessToken(this.service)
            .then(({ data: { access_token, refresh_token } }) => {
              isAlreadyFetchingAccessToken = false;
              onAccessTokenFetched(access_token, refresh_token);
            })
            .catch((err) => {
              removeTokenInStorage();
              window.location.replace(loginUrl);
              sessionStorage.setItem(
                CONFIGS.TOAST,
                JSON.stringify({
                  message: err.message,
                  variant: SNACKBAR_VARIANTS.ERROR,
                })
              );
              return Promise.reject(err);
            });
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((access_token: string, refresh_token: string) => {
            originalRequest.headers.Authorization = "Bearer " + access_token;
            addTokenToStorage({
              accessToken: access_token,
              refreshToken: refresh_token,
            });
            resolve(axios(originalRequest));
          });
        });
        return retryOriginalRequest;
      case HttpStatus.FORBIDDEN:
        removeTokenInStorage();
        window.location.replace(loginUrl);
        sessionStorage.setItem(
          CONFIGS.TOAST,
          JSON.stringify({
            message: error.message,
            variant: SNACKBAR_VARIANTS.ERROR,
          })
        );
        return Promise.reject(error);
      default:
        const { error: errResponse } = data;
        store.dispatch(
          enqueueSnackbar({
            message: errResponse?.message ?? `Error with ${status}`,
            variant: SNACKBAR_VARIANTS.ERROR,
          })
        );
        return Promise.reject(error);
    }
  };

  async get(endpoint: string, options?: Options) {
    return this.service.get(endpoint, options);
  }

  async post(endpoint: string, payload?: any, options?: Options) {
    return this.service.post(endpoint, payload, options);
  }

  async put(endpoint: string, payload?: any, options?: Options) {
    return this.service.put(endpoint, payload, options);
  }

  async delete(endpoint: string, options?: Options) {
    return this.service.delete(endpoint, options);
  }
}
export default new AxiosService();
