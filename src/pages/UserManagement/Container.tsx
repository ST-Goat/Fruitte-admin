import { useState, useCallback, useEffect } from "react";

import UserManagementView from "./View";

import { PaginationDefault } from "shared/comom.enum";
import { UserListResponse, fetchUserList } from "services/userManagement";

export type Filters = {
  search: string;
  infor: string;
  status: string;
};

function UserManagementContainer() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    infor: "",
    status: "",
  });
  const [pagination, setPagination] = useState({
    page: PaginationDefault.PAGE,
    pageSize: PaginationDefault.PAGE_SIZE,
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserListResponse>({
    data: [],
    total: 0,
  });
  const submitFilters = () => {
    fetchUserListData(pagination, filters);
  };
  const onChangeFilters = useCallback(
    (name: string, value: string | undefined) => {
      console.log(name, value);
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  async function fetchUserListData(pagination: any, filters: Filters) {
    setLoading(true);
    try {
      const response = await fetchUserList({
        pagination: pagination,
        filters: filters,
      });
      setUsers(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUserListData(pagination, filters);
  }, [pagination.page, pagination.pageSize]);

  return (
    <div>
      <UserManagementView
        filters={filters}
        submitFilters={submitFilters}
        onChangeFilters={onChangeFilters}
        users={users}
        loading={loading}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        handleChangePage={(newPage: number) => {
          setPagination((prev) => ({ ...prev, page: newPage }));
        }}
      />
    </div>
  );
}

export default UserManagementContainer;
