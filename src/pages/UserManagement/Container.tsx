import { useState, useCallback, useEffect } from "react";

import UserManagementView from "./View";

import { PaginationDefault } from "shared/comom.enum";
import { User, fetchUserList } from "services/userManagement";

import type { Filters } from "services/userManagement";

export type UserState = {
  data: Array<User>;
  total: number;
};

function UserManagementContainer() {
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
  });
  const [pagination, setPagination] = useState({
    page: PaginationDefault.PAGE,
    pageSize: PaginationDefault.PAGE_SIZE,
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserState>({
    data: [],
    total: 0,
  });
  const [reload, setReload] = useState(false);

  const submitFilters = () => {
    setPagination({
      page: PaginationDefault.PAGE,
      pageSize: PaginationDefault.PAGE_SIZE,
    });
    setReload(!reload);
  };
  const onChangeFilters = useCallback(
    (name: string, value: string | undefined) => {
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
      setUsers({
        data: response.content,
        total: response.metadata.total,
        // total: response.content.length,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUserListData(pagination, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize, reload]);

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
