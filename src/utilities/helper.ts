/** @format */

import { EVENT_TYPES } from 'shared/comom.enum';
import CONFIGS from 'shared/configs';

export const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
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
  if (!phone) error = '필수정보 입니다!';
  if (!/[0-9]{3}-[0-9]{4}-[0-9]{4}/g.test(phone))
    error = '정확한 휴대폰 번호를 입력해 주세요(xxx-xxxx-xxxx)';
  return error;
};

export const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = '필수정보 입니다!';
  } else if (
    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
      value,
    )
  ) {
    error = '정확한 이메일을 입력해 주세요.';
  }
  return error;
};

export const isDate = (date: any) => {
  return date instanceof Date && !isNaN(date.valueOf());
};

export const getValueWithKeyAdvance = (
  obj: { [key in string]: any },
  key: string,
) => {
  if (typeof key !== 'string' || !obj) return null;
  let arr = key.split('.');
  arr = arr
    .map(item => {
      return item.split(/\[|\]/g);
    })
    .flat()
    .filter(str => str !== '');
  if (arr.length === 1) return obj[key];

  const calculateValue: any = (
    obj: { [key in string]: any },
    arrKey: string[],
  ) => {
    if (arrKey.length === 0) return obj;
    return calculateValue(obj[arrKey[0]], arrKey.slice(1));
  };

  return calculateValue(obj, arr);
};

export const triggerEvent = (
  eventType: EVENT_TYPES,
  data?: any,
  element = window,
) => {
  const event = new CustomEvent(eventType, { detail: data });
  element.dispatchEvent(event);
};

export const formatNumber = (num?: number): string => {
  if (!num || typeof num !== 'number') return '';
  const str = num.toString();
  return str.replace(/(.)(?=(\d{3})+$)/g, '$1,');
};
