import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TablePaginations from "pages/common/Paginations";
import Controller from "./components/Controller";
import TableCustomizer, { HeaderItem } from "pages/common/Table";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";

import type { TablePaginationProps } from "pages/common/Paginations";
import type { Filters } from "./Container";

import { FarmListResponse } from "services/farmManagement";
import { FarmActivityResponses } from "services/farmActivity";
import { gettotalRowCurrent } from "utilities";
import { farmCreationUrl, farmDetailUrl } from "routes";

type FarmManagementProps = Omit<
  Omit<TablePaginationProps, "children">,
  "count"
> & {
  filters: Filters;
  dataTable: FarmListResponse | FarmActivityResponses;
  loading: Boolean;
  submitFilters: () => void;
  onChangeFilters: (name: string, value: any) => void;
  onChangeTableView: () => void;
  headers: HeaderItem[];
};

function FarmManagementView({
  filters,
  submitFilters,
  onChangeFilters,
  headers,
  dataTable,
  loading,
  rowsPerPage,
  page,
  handleChangePage,
  onChangeTableView,
}: FarmManagementProps) {
  const history = useHistory();
  const { t } = useTranslation();
  const translationKey = {
    farmList: "pages.farmManagement.farmList",
    activityList: "pages.farmManagement.activityList",
  };
  const [showRightController, setshowRightController] = useState(false);
  const [tittleHeader, setTitleHeader] = useState({
    primary: translationKey.farmList,
    secondary: translationKey.activityList,
  });
  const handleChangeTitle = () => {
    setTitleHeader((prev) => {
      const isFarmController = prev.primary === translationKey.activityList;
      setshowRightController(!isFarmController);
      return {
        primary: prev.secondary,
        secondary: prev.primary,
      };
    });
    onChangeTableView();
  };
  return (
    <div>
      <div>
        <Text className="font-bold text-lg">
          {t("pages.farmManagement.title")}
        </Text>
        <div className="flex">
          <Text
            onClick={handleChangeTitle}
            className="font-bold text-2xl inline-block align-bottom cursor-pointer"
          >
            {t(tittleHeader.primary)}
          </Text>
          <Text
            onClick={handleChangeTitle}
            className="ml-4 font-bold text-lg underline leading-8 inline-block align-bottom cursor-pointer"
          >
            {t(tittleHeader.secondary)}
          </Text>
          <div className="flex flex-grow justify-end">
            {tittleHeader.primary === translationKey.farmList && (
              <ButtonCustomizer className="rounded-xl">
                <Link to={farmCreationUrl}>
                  {t("pages.farmManagement.addFarmUser")}
                </Link>
              </ButtonCustomizer>
            )}
          </div>
        </div>
      </div>
      <Controller
        filters={filters}
        onSubmit={submitFilters}
        onChange={onChangeFilters}
        rightController={showRightController}
      />
      <div className="mt-6">
        <TablePaginations
          count={dataTable.total}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
        >
          <div className="rounded-md border-2 border-grey-300">
            <TableCustomizer
              headers={headers}
              hover
              loading={loading}
              totalRow={gettotalRowCurrent(dataTable.total, page, rowsPerPage)}
              data={dataTable.data.map((item, i) => ({
                ...item,
                no: (page - 1) * rowsPerPage + i + 1,
              }))}
              handleClickRow={(row) => {
                history.push(`${farmDetailUrl}/${row.id}`);
              }}
            />
          </div>
        </TablePaginations>
      </div>
    </div>
  );
}

export default FarmManagementView;
