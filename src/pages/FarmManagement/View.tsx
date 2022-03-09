import { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import format from "date-fns/format";

import TablePaginations from "pages/common/Paginations";
import Controller from "./components/Controller";
import TableCustomizer, { HeaderItem } from "pages/common/Table";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";

import { VIEW_FARM_LIST } from "./Container";
import type { TablePaginationProps } from "pages/common/Paginations";
import type { ViewCurrent } from "./Container";
import type { Activity, Filters } from "services/farmActivity";
import { FarmItem, FarmListResponse } from "services/farmManagement";
import {
  FarmActivityResponses,
  FarmActivityStatus,
} from "services/farmActivity";
import { gettotalRowCurrent } from "utilities";
import { farmCreationUrl, farmDetailUrl } from "routes";

const farmHeaders: HeaderItem[] = [
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
    id: "Owner-name-col",
    keyLabel: "pages.farmManagement.userName",
    keyData: "ownerName",
  },
  {
    id: "Owner-phone-col",
    keyLabel: "common.phoneNumber",
    keyData: "ownerPhone",
  },
  {
    id: "State-col",
    keyLabel: "pages.farmManagement.state",
    keyData: "status",
  },
  {
    id: "Create-date-col",
    keyLabel: "pages.farmManagement.createDate",
    keyData: "createAt",
  },
];

export const activityHeaders: HeaderItem[] = [
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
    styledHead: {
      align: "left",
    },
  },
  {
    id: "Status-col",
    keyLabel: "common.status",
    keyData: "status",
  },
  {
    id: "Create-date-col",
    keyLabel: "pages.farmManagement.createDate",
    keyData: "createAt",
  },
];

type FarmManagementProps = Omit<
  Omit<TablePaginationProps, "children">,
  "count"
> & {
  filters: Filters;
  view: ViewCurrent;
  farms: FarmListResponse;
  activities: FarmActivityResponses;
  loading: Boolean;
  submitFilters: (newFilter: Filters) => void;
  onChangeFilters: (name: string, value: any) => void;
  onChangeTableView: () => void;
};

type FarmView = {
  id: number | string;
  no: number;
  farmName: string;
  ownerName: string;
  ownerPhone: string;
  status: React.FC;
  createAt: string;
};

type FarmActivityView = {
  id: number | string;
  no: number;
  farmName: string;
  activityName: string;
  price: React.FC;
  status: React.FC;
  createAt: string;
};

const convertFarmDataView = (
  data: Array<FarmItem>,
  page: number,
  rowsPerPage: number,
  translate: (text: string) => string
): Array<FarmView> => {
  if (!data || data.length === 0) return [];
  return data.map((item, i) => ({
    id: item.id,
    no: (page - 1) * rowsPerPage + i + 1,
    farmName: item.name,
    ownerName: Boolean(item.owner) ? item.owner.name : "-",
    ownerPhone: Boolean(item.owner) ? item.owner.phone : "-",
    status: () => (
      <span
        className={
          Boolean(item.status) ? "text-primary-default" : "text-black-default"
        }
      >
        {Boolean(item.status)
          ? translate("common.normal")
          : translate("common.unused")}
      </span>
    ),
    createAt: format(new Date(item.createdAt), "yyyy/MM/dd"),
  }));
};

export const convertFarmActivityDataView = (
  data: Array<Activity>,
  page: number,
  rowsPerPage: number,
  translate: (text: string) => string
): Array<FarmActivityView> => {
  return data.map((item, i) => ({
    id: item.id,
    no: (page - 1) * rowsPerPage + i + 1,
    farmName: item.farmName,
    activityName: item.name,
    price: () => (
      <ul>
        <li className="text-left">
          <b>{`${translate("pages.farmManagement.perPerson")}: `}</b>
          {item.servicePrice[1]}
        </li>
        <li className="text-left">
          <b>{`${translate("pages.farmManagement.twoPerson")}: `}</b>
          {item.servicePrice[2]}
        </li>
        <li className="text-left">
          <b>{`${translate("pages.farmManagement.threePerson")}: `}</b>
          {item.servicePrice[3]}
        </li>
        <li className="text-left">
          <b>{`${translate("pages.farmManagement.fourPerson")}: `}</b>
          {item.servicePrice[4]}
        </li>
      </ul>
    ),
    status: () => (
      <span
        className={
          item.status === FarmActivityStatus.ACTIVE
            ? "text-primary-default"
            : "text-black-default"
        }
      >
        {item.status === FarmActivityStatus.ACTIVE
          ? translate("common.normal")
          : translate("common.unused")}
      </span>
    ),
    createAt: format(new Date(item.createDate), "yyyy/MM/dd"),
  }));
};

function FarmManagementView({
  filters,
  view,
  farms,
  activities,
  submitFilters,
  onChangeFilters,
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

  const headers = view === VIEW_FARM_LIST ? farmHeaders : activityHeaders;

  const dataTable = useMemo(() => {
    return view === VIEW_FARM_LIST
      ? {
          data: convertFarmDataView(farms.data, page, rowsPerPage, t),
          total: farms.total,
        }
      : {
          data: convertFarmActivityDataView(
            activities.data,
            page,
            rowsPerPage,
            t
          ),
          total: activities.total,
        };
  }, [view, farms, activities, page, rowsPerPage, t]);
  return (
    <div>
      <div>
        <Text className="font-bold text-lg">
          {t("pages.farmManagement.title")}
        </Text>
        <div className="flex">
          <Text
            // onClick={handleChangeTitle}
            className="font-bold text-2xl inline-block align-bottom"
          >
            {t(tittleHeader.primary)}
          </Text>
          <Text
            onClick={handleChangeTitle}
            className={classNames(
              "ml-4 inline-block align-bottom",
              "font-base text-lg leading-8 cursor-pointer",
              "hover:underline"
            )}
          >
            {t(tittleHeader.secondary)}
          </Text>
          <div className="flex flex-grow justify-end">
            {tittleHeader.primary === translationKey.farmList && (
              <Link to={farmCreationUrl}>
                <ButtonCustomizer>
                  {t("pages.farmManagement.createFarm")}
                </ButtonCustomizer>{" "}
              </Link>
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
              hover={view === VIEW_FARM_LIST}
              loading={loading}
              totalRow={gettotalRowCurrent(dataTable.total, page, rowsPerPage)}
              data={dataTable.data}
              handleClickRow={(row) => {
                if (view === VIEW_FARM_LIST) {
                  history.push(`${farmDetailUrl}/${row.id}`);
                }
              }}
            />
          </div>
        </TablePaginations>
      </div>
    </div>
  );
}

export default FarmManagementView;
