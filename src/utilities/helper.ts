import CONFIGS from "shared/configs";

export const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const addTokenToStorage = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(CONFIGS.HEADER_PAYLOAD_KEY, accessToken);
  localStorage.setItem(CONFIGS.REFRESH_TOKEN_KEY, refreshToken);
};

export const removeTokenInStorage = () => {
  localStorage.removeItem(CONFIGS.HEADER_PAYLOAD_KEY);
  localStorage.removeItem(CONFIGS.REFRESH_TOKEN_KEY);
};

export const validatePhone = (phone: string) => {
  let error;
  if (!phone) error = "Phone is required!";
  if (!/[0-9]{3}-[0-9]{3}-[0-9]{4}/g.test(phone))
    error = "Phone format is incorrect!";
  return error;
};

export const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = "Email is required!";
  } else if (
    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
      value
    )
  ) {
    error = "Email format is incorrect!";
  }
  return error;
};
