/** @format */
import { EVENT_TYPES } from "shared/comom.enum";
import CONFIGS from "shared/configs";
import * as XLSX from "xlsx";

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
  if (!phone) error = "필수정보 입니다!";
  if (!/[0-9]{3}-[0-9]{4}-[0-9]{4}/g.test(phone))
    error = "정확한 휴대폰 번호를 입력해 주세요(xxx-xxxx-xxxx)";
  return error;
};

export const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = "필수정보 입니다!";
  } else if (
    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
      value
    )
  ) {
    error = "정확한 이메일을 입력해 주세요.";
  }
  return error;
};

export const isDate = (date: any) => {
  return date instanceof Date && !isNaN(date.valueOf());
};

export const getValueWithKeyAdvance = (
  obj: { [key in string]: any },
  key: string
) => {
  if (typeof key !== "string" || !obj) return null;
  let arr = key.split(".");
  arr = arr
    .map((item) => {
      return item.split(/\[|\]/g);
    })
    .flat()
    .filter((str) => str !== "");
  if (arr.length === 1) return obj[key];

  const calculateValue: any = (
    obj: { [key in string]: any },
    arrKey: string[]
  ) => {
    if (arrKey.length === 0) return obj;
    return calculateValue(obj[arrKey[0]], arrKey.slice(1));
  };

  return calculateValue(obj, arr);
};

export const triggerEvent = (
  eventType: EVENT_TYPES,
  data?: any,
  element = window
) => {
  const event = new CustomEvent(eventType, { detail: data });
  element.dispatchEvent(event);
};

export const formatNumber = (num?: number): string => {
  if (!num || typeof num !== "number") return "";
  const str = num.toString();
  return str.replace(/(.)(?=(\d{3})+$)/g, "$1,");
};

export const exportExcelFile = ({
  data,
  header,
  fileName,
  colWidth,
  sheetName = "Sheet1",
}: {
  data: any[];
  header: object;
  fileName?: string;
  colWidth?: number[];
  sheetName?: string;
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = "xlsx";
  const csvData = JSON.parse(JSON.stringify(data));

  if (header) {
    csvData.unshift(header);
  }

  const ws = XLSX.utils.json_to_sheet(csvData, { skipHeader: !!header });

  if (colWidth) {
    ws["!cols"] = colWidth.map((item) => ({ wch: item }));
  }

  const Sheets = {};
  // @ts-ignore: Unreachable code error
  Sheets[sheetName] = ws;
  const wb = { Sheets, SheetNames: [sheetName] };
  const excelBuffer = XLSX.write(wb, {
    bookType: fileExtension,
    type: "array",
  });
  const dataBlob = new Blob([excelBuffer], {
    type: fileType,
  });

  const url = window.URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName ?? "Export";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const transformObject = (
  origObj: object,
  convert = (value: string) => value
) => {
  return Object.keys(origObj).reduce(function (newObj, key: string) {
    // @ts-ignore: Unreachable code error
    let val = origObj[key];
    let newVal = convert(val);
    // @ts-ignore: Unreachable code error
    newObj[key] = newVal;
    return newObj;
  }, {});
};

export const transformList = (
  list: any[],
  key: string,
  convert = (value: string) => value
) => {
  return list.map((item) => ({
    ...item,
    [key]: convert(item[key]),
  }));
};
