import React from "react";
import { useTranslation } from "react-i18next";

import InquiryView from "./View";
import Controller from "./components/Controller";
import TablePaginations from "pages/common/Paginations";

const InquiryContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-2xl font-bold">{t("pages.inquiry.title")}</h1>
      <div className="mt-8">
        <Controller />
      </div>
      <div className="mt-4">
        <TablePaginations
          count={100}
          rowsPerPage={10}
          page={1}
          handleChangePage={(newPage) => {}}
        >
          <InquiryView />
        </TablePaginations>
      </div>
    </>
  );
};

export default InquiryContainer;
