import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TablePaginations from "pages/common/Paginations";
import Controller from "./components/Controller";
import TableCustomizer from "pages/common/Table";
import Text from "pages/common/components/Text";
import type { TablePaginationProps } from "pages/common/Paginations";
import type { Filters } from "./Container";

import { FarmActivityResponses } from "services/farmActivity";
import { gettotalRowCurrent } from "utilities";

type FarmManagementProps = Omit<
  Omit<TablePaginationProps, "children">,
  "count"
> & {
  filters: Filters;
  farms: FarmActivityResponses;
  loading: Boolean;
  submitFilters: () => void;
  onChangeFilters: (name: string, value: any) => void;
};

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
  },
  {
    id: "Farm-col",
    keyLabel: "pages.farmActivity.farmName",
    keyData: "farmName",
  },
  {
    id: "Experience-name-col",
    keyLabel: "pages.farmActivity.experienceName",
    keyData: "experienceName",
  },
  {
    id: "User-name-col",
    keyLabel: "pages.farmActivity.userName",
    keyData: "userName",
  },
  {
    id: "Product-name-col",
    keyLabel: "pages.farmActivity.productName",
    keyData: "productName",
  },
  {
    id: "Price-col",
    keyLabel: "pages.farmActivity.price",
    keyData: "price",
  },
  {
    id: "Payment-stautus-col",
    keyLabel: "pages.farmActivity.paymentStatus",
    keyData: "paymentStatus",
  },
  {
    id: "Refund-amount-col",
    keyLabel: "pages.farmActivity.refundAmount",
    keyData: "refundAmount",
  },
  {
    id: "Reservation-date-col",
    keyLabel: "pages.farmActivity.reservationDate",
    keyData: "reservationDate",
  },
  {
    id: "Feedback-col",
    keyLabel: "pages.farmActivity.feedback",
    keyData: "feedback",
  },
];

function FarmActivityView({
  filters,
  submitFilters,
  onChangeFilters,
  farms,
  loading,
  rowsPerPage,
  page,
  handleChangePage,
}: FarmManagementProps) {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <Text className="font-bold text-lg">
          {t("pages.farmActivity.title")}
        </Text>
        <Text className="font-bold text-2xl">
          {t("pages.farmActivity.reservationList")}
        </Text>
      </div>
      <Controller
        filters={filters}
        onSubmit={submitFilters}
        onChange={onChangeFilters}
      />
      <div className="mt-6">
        <TablePaginations
          count={farms.total}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
        >
          <div className="rounded-md border-2 border-grey-300">
            <TableCustomizer
              headers={headers}
              hover
              loading={loading}
              totalRow={gettotalRowCurrent(farms.total, page, rowsPerPage)}
              data={farms.data.map((item, i) => ({
                ...item,
                no: (page - 1) * rowsPerPage + i + 1,
              }))}
              handleClickRow={(row) => {
                // history.push(`${location.pathname}/${row.id}`);
              }}
            />
          </div>
        </TablePaginations>
      </div>
    </div>
  );
}

export default FarmActivityView;
