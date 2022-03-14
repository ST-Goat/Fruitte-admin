import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import InquiryView from "./View";
import Controller from "./components/Controller";
import TablePaginations from "pages/common/Paginations";

import { PaginationDefault } from "shared/comom.enum";
import { fetchInquiryList, InquiryStatus } from "services/inquiry";

const initialPagination = {
  page: PaginationDefault.PAGE,
  pageSize: PaginationDefault.PAGE_SIZE,
};

export type Filters = { status: InquiryStatus | undefined };
const InquiryContainer = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: undefined,
  });
  const [pagination, setPagination] = useState(initialPagination);
  const [inquiries, setInquiries] = useState({
    data: [],
    total: 0,
  });

  const getInquiries = async (
    _page: number,
    _pageSize: number,
    _status: InquiryStatus | undefined
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchInquiryList({
        limit: _pageSize,
        skip: (_page - 1) * _pageSize,
        status: _status,
      });
      setInquiries({
        data: response.content,
        total: response.total,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInquiries(pagination.page, pagination.pageSize, filters.status);
  }, [pagination.page, pagination.pageSize, filters.status]);

  return (
    <>
      <h1 className="text-2xl font-bold">{t("pages.inquiry.title")}</h1>
      <div className="mt-8">
        <Controller
          filters={filters}
          onChange={(newFilters: Filters) => {
            setPagination(initialPagination);
            setFilters(newFilters);
          }}
        />
      </div>
      <div className="mt-4">
        <TablePaginations
          count={inquiries.total}
          rowsPerPage={pagination.pageSize}
          page={pagination.page}
          handleChangePage={(newPage) => {
            setPagination((prev) => ({ ...prev, page: newPage }));
          }}
        >
          <InquiryView
            inquiries={inquiries}
            loading={isLoading}
            page={pagination.page}
            pageSize={pagination.pageSize}
          />
        </TablePaginations>
      </div>
    </>
  );
};

export default InquiryContainer;
