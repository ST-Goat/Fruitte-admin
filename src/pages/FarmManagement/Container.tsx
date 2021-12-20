import { useState, useCallback, useEffect } from "react";

import FarmManagementView from "./View";

import { PaginationDefault } from "shared/comom.enum";
import { FarmListResponse, fetchFarmList } from "services/farmManagement";
import {
  FarmActivityResponses,
  fetchFarmActivities,
} from "services/farmActivity";
export type Filters = {
  search: string;
};

const farmHeaders = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
  },
  {
    id: "Farm-col",
    keyLabel: "pages.farmManagement.farmName",
    keyData: "farmName",
  },
  {
    id: "Activity-name-col",
    keyLabel: "pages.farmManagement.activityName",
    keyData: "activityName",
  },
  {
    id: "Price-col",
    keyLabel: "pages.farmManagement.price",
    keyData: "price",
  },
  {
    id: "State-stautus-col",
    keyLabel: "pages.farmManagement.state",
    keyData: "state",
  },
  {
    id: "Reservation-date-col",
    keyLabel: "pages.farmManagement.reservationDate",
    keyData: "reservationDate",
  },
];

const activityHeaders = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
  },
  {
    id: "Farm-col",
    keyLabel: "pages.farmManagement.farmName",
    keyData: "farmName",
  },
  {
    id: "Activity-name-col",
    keyLabel: "pages.farmManagement.activityName",
    keyData: "activityName",
  },
  {
    id: "Phone-col",
    keyLabel: "common.phoneNumber",
    keyData: "phone",
  },
  {
    id: "State-stautus-col",
    keyLabel: "pages.farmManagement.state",
    keyData: "state",
  },
  {
    id: "Reservation-date-col",
    keyLabel: "pages.farmManagement.reservationDate",
    keyData: "reservationDate",
  },
];

const VIEW_FARM_LIST = "view-farm-list";
const VIEW_FARM_ACTIVITIES = "view-farm-activities";
const initialPagination = {
  page: PaginationDefault.PAGE,
  pageSize: PaginationDefault.PAGE_SIZE,
};
type ViewCurrent = typeof VIEW_FARM_LIST | typeof VIEW_FARM_ACTIVITIES;
function FarmManagementContainer() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
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
      console.log(name, value);
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
  useEffect(() => {
    if (viewCurrent === VIEW_FARM_LIST) {
      fetchFarmData(pagination, filters);
    } else {
      fetchActivityData(pagination, filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize, viewCurrent]);

  const submitFilters = () => {
    fetchFarmData(pagination, filters);
  };
  return (
    <div>
      <FarmManagementView
        filters={filters}
        submitFilters={submitFilters}
        onChangeFilters={onChangeFilters}
        dataTable={viewCurrent === VIEW_FARM_LIST ? farms : activities}
        headers={viewCurrent === VIEW_FARM_LIST ? farmHeaders : activityHeaders}
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
