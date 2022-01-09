import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoActivities from "../components/NoActivities";
import TableCustomizer from "pages/common/Table";
import TablePaginations from "pages/common/Paginations";

import { farmDetailUrl } from "routes";
import { initialPagination } from "../Container";
import { gettotalRowCurrent } from "utilities";
import { Activity, fetchAllActivityByFarmId } from "services/farmActivity";

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
  const history = useHistory();
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<{
    data: Activity[];
    total: number;
  }>({
    data: [],
    total: 0,
  });

  useEffect(() => {
    async function getFarmActivitiesPerMonth() {
      setIsLoading(true);
      try {
        const response = await fetchAllActivityByFarmId({
          farmId: farmId,
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
    getFarmActivitiesPerMonth();
  }, [farmId]);

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
      <div className="flex justify-end mt-8 mb-16">
        <Link to={`${farmDetailUrl}/${farmId}/farm-activites/create`}>
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
              hover
              totalRow={gettotalRowCurrent(
                dataTable.total,
                pagination.page,
                pagination.pageSize
              )}
              data={dataTable.data}
              handleClickRow={(row) => {
                history.push(
                  `${farmDetailUrl}/${farmId}/farm-activites/${row.id}`
                );
              }}
            />
          </div>
        </TablePaginations>
      )}
    </div>
  );
}

export default Activities;
