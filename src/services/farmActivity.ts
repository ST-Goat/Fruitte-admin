import { PaginationDefault } from "shared/comom.enum";

export type FarmProps = {
  id: string;
  farmName: string;
  experienceName: string;
  userName: string;
  productName: string;
  price: string;
  paymentStatus: string;
  refundAmount: string;
  reservationDate: string;
  feedback: string;
};

export type FarmActivityResponses = {
  data: Array<FarmProps>;
  total: number;
};

const fakeFarmList: Array<FarmProps> = [
  {
    id: "농장명-1",
    farmName: "체험명",
    experienceName: "체험명",
    userName: "4인팀+옵션",
    productName: "10,000원",
    price: "완료",
    paymentStatus: "-",
    refundAmount: "1,000원",
    reservationDate: "10/23/2021",
    feedback: "미처리",
  },
  {
    id: "농장명-2",
    farmName: "농장명-2",
    experienceName: "체험명",
    userName: "4인팀+옵션",
    productName: "10,000원",
    price: "완료",
    paymentStatus: "-",
    refundAmount: "1,000원",
    reservationDate: "10/23/2021",
    feedback: "미처리",
  },
  {
    id: "농장명-3",
    farmName: "농장명-3",
    experienceName: "체험명",
    userName: "4인팀+옵션",
    productName: "10,000원",
    price: "완료",
    paymentStatus: "-",
    refundAmount: "1,000원",
    reservationDate: "10/23/2021",
    feedback: "미처리",
  },
];

export const fetchFarmActivities = async (
  params: {
    pagination: {
      page: number;
      pageSize: number;
    };
    filters: any;
  } = {
    pagination: {
      page: PaginationDefault.PAGE,
      pageSize: PaginationDefault.PAGE_SIZE,
    },
    filters: {},
  }
): Promise<FarmActivityResponses> => {
  const { page, pageSize } = params.pagination;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: fakeFarmList.slice((page - 1) * pageSize, page * pageSize),
        total: fakeFarmList.length,
      });
    }, 1000);
  });
};
