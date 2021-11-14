import { PaginationDefault } from "shared/comom.enum";
const fakeUserList = [
  {
    id: "Lizzie Wang",
    name: "Lizzie Wang",
    email: "lz.wang@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
  {
    id: "Sean Tran",
    name: "Sean Tran",
    email: "sean@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
  {
    id: "Lizzie Wang11",
    name: "Lizzie Wang",
    email: "lz.wang@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
  {
    id: "Sean Tran1",
    name: "Sean Tran1",
    email: "sean@gmail1.com",
    phone: "010-1231-1234",
    status: "deactive",
    create: "10/23/2021",
  },
  {
    id: "Lizzie Wang2",
    name: "Lizzie Wang2",
    email: "lz.wang2@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
  {
    id: "Sean Tr123an321231",
    name: "Sean Tran3",
    email: "sean3@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
  {
    id: "Sean Tran31231312221",
    name: "Sean Tran1",
    email: "sean@gmail1.com",
    phone: "010-1231-1234",
    status: "deactive",
    create: "10/23/2021",
  },
  {
    id: "Lizzie Wan123g222",
    name: "Lizzie Wang2",
    email: "lz.wang2@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
  {
    id: "Sean Tran312322",
    name: "Sean Tran3",
    email: "sean3@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
  {
    id: "Sean Tran12132221",
    name: "Sean Tran1",
    email: "sean@gmail1.com",
    phone: "010-1231-1234",
    status: "deactive",
    create: "10/23/2021",
  },
  {
    id: "Lizzie Wang221232",
    name: "Lizzie Wang2",
    email: "lz.wang2@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
  {
    id: "Sean Tran322132",
    name: "Sean Tran3",
    email: "sean3@gmail.com",
    phone: "010-1231-1234",
    status: "active",
    create: "10/23/2021",
  },
];

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  create: string;
};

export type UserListResponse = { data: User[]; total: number };

export const fetchUserList = async (
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
): Promise<UserListResponse> => {
  const { page, pageSize } = params.pagination;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: fakeUserList.slice((page - 1) * pageSize, page * pageSize),
        total: fakeUserList.length,
      });
    }, 1000);
  });
};
