import CONFIGS from "shared/configs";

const fetchAccessToken = async (service: any) => {
  const accessToken = localStorage.getItem(CONFIGS.HEADER_PAYLOAD_KEY);
  const refreshToken = localStorage.getItem(CONFIGS.REFRESH_TOKEN_KEY);
  return service.post("common/refresh-token", {
    accessToken,
    refreshToken,
  });
};

export default fetchAccessToken;
