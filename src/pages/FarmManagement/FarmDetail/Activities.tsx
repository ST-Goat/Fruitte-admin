import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoActivities from "../components/NoActivities";
import TableCustomizer from "pages/common/Table";
import TablePaginations from "pages/common/Paginations";
import DateRangePickerCustomizer from "pages/common/DateRangePicker";

import { farmManagementActivityUrl } from "routes";
import { initialPagination } from "../Container";
import { gettotalRowCurrent } from "utilities";
import { Activity, fetchAllActivityByFarmId } from "services/farmActivity";
import { format, subDays } from "date-fns";

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
  },
  {
    id: "Activity-name-col",
    keyLabel: "pages.farmManagement.activityName",
    keyData: "activityName",
  },

  {
    id: "Price-one-person-col",
    keyLabel: "pages.farmManagement.perPerson",
    keyData: "oneMemberPrice",
  },

  {
    id: "Price-two-person-col",
    keyLabel: "pages.farmManagement.twoPerson",
    keyData: "twoMembersPrice",
  },

  {
    id: "Price-three-person-col",
    keyLabel: "pages.farmManagement.threePerson",
    keyData: "threeMembersPrice",
  },

  {
    id: "Price-four-person-col",
    keyLabel: "pages.farmManagement.fourPerson",
    keyData: "fourMembersPrice",
  },
];
export const convertFarmActivityDataView = (
  data: Array<Activity>,
  page: number,
  rowsPerPage: number,
  translate: (text: string) => string
): Array<any> => {
  return data.map((item, i) => ({
    no: (page - 1) * rowsPerPage + i + 1,
    activityName: item.name,
    ...item,
  }));
};

function Activities({ farmId }: { farmId: string | number }) {
  const { i18n, t } = useTranslation();
  const [pagination, setPagination] = useState(initialPagination);
  const [dateRange, setDateRange] = useState([
    subDays(new Date(), 30),
    new Date(),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<{
    data: Activity[];
    total: number;
  }>({
    data: [],
    total: 0,
  });

  useEffect(() => {
    async function getFarmActivitiesPerMonth({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) {
      setIsLoading(true);
      try {
        const response = await fetchAllActivityByFarmId({
          farmId: farmId,
          filters: {
            startDate: startDate,
            endDate: endDate,
          },
        });
        setActivities({
          data: response,
          total: response.length,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    if (startDate && endDate) {
      getFarmActivitiesPerMonth({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      });
    }
  }, [dateRange, farmId]);

  const dataTable = useMemo(() => {
    return {
      data: convertFarmActivityDataView(
        activities.data,
        pagination.page,
        pagination.pageSize,
        t
      ),
      total: activities.total,
    };
  }, [activities, pagination, t]);

  const handleChangePage = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };
  return (
    <div>
      <div className="flex justify-between mt-8 mb-16">
        <DateRangePickerCustomizer
          defaultValue={dateRange as [any, any]}
          onChange={(newValue) => {
            setDateRange(newValue);
          }}
        />
        <Link to={`${farmManagementActivityUrl}/test-id`}>
          <ButtonCustomizer
            className="flex justify-center items-center w-64 rounded rounded-3xl"
            color="secondary"
          >
            <AddCircleIcon />
            <Text className="ml-2">
              {t("pages.farmManagement.createActivity")}
            </Text>
          </ButtonCustomizer>
        </Link>
      </div>
      {dataTable.data.length === 0 || isLoading ? (
        <NoActivities i18n={i18n} />
      ) : (
        <TablePaginations
          count={dataTable.total}
          rowsPerPage={pagination.pageSize}
          page={pagination.page}
          handleChangePage={handleChangePage}
        >
          <div className="rounded-md border-2 border-grey-300">
            <TableCustomizer
              headers={headers}
              loading={false}
              totalRow={gettotalRowCurrent(
                dataTable.total,
                pagination.page,
                pagination.pageSize
              )}
              data={dataTable.data}
            />
          </div>
        </TablePaginations>
      )}
    </div>
  );
}

export default Activities;
