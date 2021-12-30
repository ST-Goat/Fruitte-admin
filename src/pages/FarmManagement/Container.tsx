import { useState, useCallback, useEffect } from "react";

import FarmManagementView from "./View";

import { PaginationDefault } from "shared/comom.enum";
import { FarmListResponse, fetchFarmList } from "services/farmManagement";
import {
  FarmActivityResponses,
  Filters,
  fetchFarmActivities,
} from "services/farmActivity";

export const VIEW_FARM_LIST = "view-farm-list";
export const VIEW_FARM_ACTIVITIES = "view-farm-activities";
const initialPagination = {
  page: PaginationDefault.PAGE,
  pageSize: PaginationDefault.PAGE_SIZE,
};
export type ViewCurrent = typeof VIEW_FARM_LIST | typeof VIEW_FARM_ACTIVITIES;
function FarmManagementContainer() {
  const [filters, setFilters] = useState<Filters>({
    keywork: "",
    farmName: "",
    filterStatus: "",
  });
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [farms, setFarms] = useState<FarmListResponse>({
    data: [],
    total: 0,
  });
  const [activities, setActivities] = useState<FarmActivityResponses>({
    data: [],
    total: 0,
  });
  const [viewCurrent, setViewCurrent] = useState<ViewCurrent>(VIEW_FARM_LIST);

  const onChangeFilters = useCallback(
    (name: string, value: string | undefined) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  async function fetchActivityData(pagination: any, filters: Filters) {
    setLoading(true);
    try {
      const response = await fetchFarmActivities({
        pagination: pagination,
        filters: filters,
      });
      setActivities(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFarmData(pagination: any, filters: Filters) {
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

  const fetchViewData = (view: ViewCurrent, filterCurrent: Filters) => {
    if (view === VIEW_FARM_LIST) {
      fetchFarmData(pagination, filterCurrent);
    } else {
      fetchActivityData(pagination, filterCurrent);
    }
  };
  useEffect(() => {
    fetchViewData(viewCurrent, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize, viewCurrent]);

  const submitFilters = (newFilter: Filters) => {
    fetchViewData(viewCurrent, newFilter);
  };
  return (
    <div>
      <FarmManagementView
        filters={filters}
        submitFilters={submitFilters}
        onChangeFilters={onChangeFilters}
        view={viewCurrent}
        farms={farms}
        activities={activities}
        loading={loading}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        onChangeTableView={() => {
          setPagination(initialPagination);
          setViewCurrent((prev) => {
            if (prev === VIEW_FARM_LIST) return VIEW_FARM_ACTIVITIES;
            return VIEW_FARM_LIST;
          });
        }}
        handleChangePage={(newPage: number) => {
          setPagination((prev) => ({ ...prev, page: newPage }));
        }}
      />
    </div>
  );
}

export default FarmManagementContainer;
