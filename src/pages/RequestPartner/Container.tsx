import { useState, useCallback, useEffect } from "react";

import { PaginationDefault } from "shared/comom.enum";
import { Partner, fetchPartners } from "services/userManagement";

import type { Filters } from "services/userManagement";
import RequestPartnerView from "./View";

export type PartnerState = {
  data: Array<Partner>;
  total: number;
};

const RequestPartnerContainer = () => {
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
  });
  const [pagination, setPagination] = useState({
    page: PaginationDefault.PAGE,
    pageSize: PaginationDefault.PAGE_SIZE,
  });
  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState<PartnerState>({
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
      const response = await fetchPartners({
        pagination: pagination,
        filters: filters,
      });
      setPartners({
        data: response.content,
        // total: response.metadata.total,
        total: response.content.length,
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
    <>
      <RequestPartnerView
        filters={filters}
        submitFilters={submitFilters}
        onChangeFilters={onChangeFilters}
        partners={partners}
        loading={loading}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        handleChangePage={(newPage: number) => {
          setPagination((prev) => ({ ...prev, page: newPage }));
        }}
      />
    </>
  );
};

export default RequestPartnerContainer;
