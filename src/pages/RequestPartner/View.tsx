import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BreadCrumb from "pages/common/BreadCrumb";
import TablePaginations from "pages/common/Paginations";
import Controller from "./components/Controller";
import TableCustomizer from "pages/common/Table";

import type { TablePaginationProps } from "pages/common/Paginations";
import type { Filters } from "services/userManagement";
import { REQUEST_PARTNER_STATUS } from "services/userManagement";

import { gettotalRowCurrent } from "utilities";
import type { PartnerState } from "./Container";

type PartnerViewProps = Omit<
  Omit<TablePaginationProps, "children">,
  "count"
> & {
  filters: Filters;
  partners: PartnerState;
  loading: Boolean;
  submitFilters: () => void;
  onChangeFilters: (name: string, value: any) => void;
};

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
    styledHead: {
      style: { width: "60px", textAlign: "left" },
    },
    styledBodyCol: {
      style: { width: "60px", textAlign: "left" },
    },
  },
  {
    id: "Name-col",
    keyLabel: "pages.requestPartner.name",
    keyData: "name",
    styledHead: {
      style: { minWidth: "100px" },
    },
  },
  {
    id: "Email-col",
    keyLabel: "pages.requestPartner.description",
    keyData: "farmDescription",
    styledHead: {
      style: { minWidth: "100px" },
    },
  },
  {
    id: "Phone-col",
    keyLabel: "pages.requestPartner.phone",
    keyData: "phone",
  },
  {
    id: "Status-col",
    keyLabel: "pages.requestPartner.status",
    keyData: "status",
  },
  {
    id: "CreateDate-col",
    keyLabel: "pages.requestPartner.createDate",
    keyData: "createdAt",
  },
];

const ItemStatus = ({ status }: { status: REQUEST_PARTNER_STATUS }) => {
  const { t } = useTranslation();
  switch (status) {
    case REQUEST_PARTNER_STATUS.PENDING:
      return (
        <span className="font-bold text-black-default">
          {t("pages.requestPartner.pendingStatus")}
        </span>
      );
    case REQUEST_PARTNER_STATUS.APPROVE:
      return (
        <span className="font-bold text-green-700">
          {t("pages.requestPartner.approveStatus")}
        </span>
      );
    case REQUEST_PARTNER_STATUS.DECLINE:
      return (
        <span className="font-bold text-red-700">
          {t("pages.requestPartner.declinedStatus")}
        </span>
      );
    default:
      return <span className="font-bold">-</span>;
  }
};

function RequestPartnerView({
  filters,
  submitFilters,
  onChangeFilters,
  partners,
  loading,
  rowsPerPage,
  page,
  handleChangePage,
}: PartnerViewProps) {
  return (
    <div>
      <BreadCrumb />
      <Controller
        filters={filters}
        onSubmit={submitFilters}
        onChange={onChangeFilters}
      />
      <div className="mt-6">
        <TablePaginations
          count={partners.total}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
        >
          <div className="rounded-md border-2 border-grey-300">
            <TableCustomizer
              headers={headers}
              loading={loading}
              totalRow={gettotalRowCurrent(partners.total, page, rowsPerPage)}
              data={partners.data.map((item, i) => ({
                ...item,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
                status: () => <ItemStatus status={item.status} />,
                no: (page - 1) * rowsPerPage + i + 1,
              }))}
            />
          </div>
        </TablePaginations>
      </div>
    </div>
  );
}

export default RequestPartnerView;
