import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import FaqView from "./View";
import TablePaginations from "pages/common/Paginations";
import ButtonCustomizer from "pages/common/Button";

import { FaqItem, fetchFaq } from "services/faq";
import { Pagination, PaginationDefault } from "shared/comom.enum";
import { Link } from "react-router-dom";
import { faqCreateUrl } from "routes";

export type Faqs = {
  data: FaqItem[];
  total: number;
};

const FaqContainer = () => {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState<Faqs>({
    data: [],
    total: 0,
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: PaginationDefault.PAGE,
    pageSize: PaginationDefault.PAGE_SIZE,
  });

  useEffect(() => {
    async function getFaqList() {
      try {
        const response = await fetchFaq({ pagination });
        setFaqs(response);
      } catch (error) {
        console.log(error);
      }
    }
    getFaqList();
  }, [pagination]);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-lg">{t("pages.faq.title")}</h1>
        <Link to={faqCreateUrl}>
          <ButtonCustomizer>{t("pages.faq.createFaq")}</ButtonCustomizer>
        </Link>
      </div>
      <TablePaginations
        count={faqs.total}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        handleChangePage={(newPage) => {
          setPagination((prev) => ({ ...prev, page: newPage }));
        }}
      >
        <FaqView faqs={faqs} pagination={pagination} />
      </TablePaginations>
    </>
  );
};

export default FaqContainer;
