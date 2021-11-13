import BreadCrumb from "pages/common/BreadCrumb";
import TablePaginations from "pages/common/Paginations";
import Controller from "./components/Controller";
import TableCustomizer from "pages/common/Table";

import type { TablePaginationProps } from "pages/common/Paginations";

type UserManagementViewProps = Omit<TablePaginationProps, "children"> & {
  handleFilter: (data: any) => void;
};

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
    styledHead: {
      style: { width: "60px", textAlign: "left" },
    },
    styledBodyCol: {
      style: { width: "60px", textAlign: "left" },
    },
  },
  {
    id: "Name-col",
    keyLabel: "pages.userManagement.name",
    keyData: "name",
    styledHead: {
      style: { minWidth: "100px" },
    },
  },
  {
    id: "Email-col",
    keyLabel: "pages.userManagement.email",
    keyData: "email",
    styledHead: {
      style: { minWidth: "100px" },
    },
  },
  {
    id: "Phone-col",
    keyLabel: "pages.userManagement.phone",
    keyData: "phone",
  },
  {
    id: "Status-col",
    keyLabel: "pages.userManagement.status",
    keyData: "status",
  },
  {
    id: "CreateDate-col",
    keyLabel: "pages.userManagement.createDate",
    keyData: "create",
  },
];

const fakeData = [
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
];

function UserManagementView({
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleFilter,
}: UserManagementViewProps) {
  return (
    <div>
      <BreadCrumb />
      <Controller onSubmit={handleFilter} />
      <div className="mt-6">
        <TablePaginations
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
        >
          <div className="rounded-md border-2 border-grey-300">
            <TableCustomizer
              headers={headers}
              data={fakeData.map((user, i) => ({ ...user, no: page * 10 + i }))}
            />
          </div>
        </TablePaginations>
      </div>
    </div>
  );
}

export default UserManagementView;
