import { useState, useCallback, useEffect } from "react";

import FarmManagementView from "./View";

import { PaginationDefault } from "shared/comom.enum";
import { FarmListResponse, fetchFarmList } from "services/farmManagement";

export type Filters = {
  search: string;
};

function FarmManagementContainer() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
  });
  const [pagination, setPagination] = useState({
    page: PaginationDefault.PAGE,
    pageSize: PaginationDefault.PAGE_SIZE,
  });
  const [loading, setLoading] = useState(false);
  const [farms, setFarms] = useState<FarmListResponse>({
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
      const response = await fetchFarmList({
        pagination: pagination,
        filters: filters,
      });
      setFarms(response);
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
      <FarmManagementView
        filters={filters}
        submitFilters={submitFilters}
        onChangeFilters={onChangeFilters}
        farms={farms}
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

export default FarmManagementContainer;
