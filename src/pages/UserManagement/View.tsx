import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

import BreadCrumb from "pages/common/BreadCrumb";
import TablePaginations from "pages/common/Paginations";
import Controller from "./components/Controller";
import TableCustomizer from "pages/common/Table";

import type { TablePaginationProps } from "pages/common/Paginations";
import type { Filters } from "./Container";

import type { UserListResponse } from "services/userManagement";
import { gettotalRowCurrent } from "utilities";

type UserManagementViewProps = Omit<
  Omit<TablePaginationProps, "children">,
  "count"
> & {
  filters: Filters;
  users: UserListResponse;
  loading: Boolean;
  submitFilters: () => void;
  onChangeFilters: (name: string, value: any) => void;
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

function UserManagementView({
  filters,
  submitFilters,
  onChangeFilters,
  users,
  loading,
  rowsPerPage,
  page,
  handleChangePage,
}: UserManagementViewProps) {
  const history = useHistory();
  const location = useLocation();
  return (
    <div>
      <BreadCrumb />
      <Controller
        filters={filters}
        onSubmit={submitFilters}
        onChange={onChangeFilters}
      />
      <div className="mt-6">
        <TablePaginations
          count={users.total}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
        >
          <div className="rounded-md border-2 border-grey-300">
            <TableCustomizer
              headers={headers}
              hover
              loading={loading}
              totalRow={gettotalRowCurrent(users.total, page, rowsPerPage)}
              data={users.data.map((item, i) => ({
                ...item,
                no: (page - 1) * rowsPerPage + i + 1,
              }))}
              handleClickRow={(row) => {
                history.push(`${location.pathname}/${row.id}`);
              }}
            />
          </div>
        </TablePaginations>
      </div>
    </div>
  );
}

export default UserManagementView;