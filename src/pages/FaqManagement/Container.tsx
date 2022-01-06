import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import FaqView from "./View";
import TablePaginations from "pages/common/Paginations";
import ButtonCustomizer from "pages/common/Button";

import { FaqItem } from "services/faq";
import { Pagination, PaginationDefault } from "shared/comom.enum";
import { Link } from "react-router-dom";
import { faqCreateUrl } from "routes";
import { useAppDispatch, useAppSelector } from "utilities";
import { getAllFaq } from "redux/slices/faq";

export type Faqs = {
  data: FaqItem[];
  total: number;
};

const FaqContainer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, data: faqs } = useAppSelector((state) => state.faq);
  const [pagination, setPagination] = useState<Pagination>({
    page: PaginationDefault.PAGE,
    pageSize: PaginationDefault.PAGE_SIZE,
  });

  useEffect(() => {
    dispatch(getAllFaq(null));
  }, []);

  const { page, pageSize } = pagination;
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-lg">{t("pages.faq.title")}</h1>
        <Link to={faqCreateUrl}>
          <ButtonCustomizer>{t("pages.faq.createFaq")}</ButtonCustomizer>
        </Link>
      </div>
      <TablePaginations
        count={faqs.length}
        rowsPerPage={pageSize}
        page={page}
        handleChangePage={(newPage) => {
          setPagination((prev) => ({ ...prev, page: newPage }));
        }}
      >
        <FaqView
          faqs={{
            data: faqs.slice((page - 1) * pageSize, page * pageSize),
            total: faqs.length,
          }}
          loading={isLoading}
          pagination={pagination}
        />
      </TablePaginations>
    </>
  );
};

export default FaqContainer;
