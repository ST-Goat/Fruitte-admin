import { useTranslation } from "react-i18next";
import format from "date-fns/format";

import RowStyled from "./RowStyled";
import Text from "pages/common/components/Text";

import { ScheduleInfor } from "services/farmSchedules";
import { Activity } from "services/farmActivity";
import { useEffect, useState } from "react";
import classNames from "classnames";

const DEFAULT_LIMIT = 3;
const SchedulePrevious = ({
  data,
  activityDetail,
  loading,
}: {
  data: ScheduleInfor[];
  activityDetail: Activity | undefined;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  useEffect(() => {
    setLimit(DEFAULT_LIMIT);
  }, [activityDetail]);
  if (loading)
    return (
      <div className="w-full py-8 text-center font-bold text-xl">
        {t("common.loading").toUpperCase()}
      </div>
    );
  if (!data || !activityDetail || data.length === 0)
    return (
      <div className="w-full py-8 text-center font-bold text-xl">
        {t("common.noData").toUpperCase()}
      </div>
    );
  return (
    <>
      {data.slice(0, limit).map((item: ScheduleInfor) => (
        <RowStyled
          key={item.id}
          leftContent={
            <Text className="h-full font-bold text-lg py-8 border-b border-grey-300">
              {format(new Date(item.startAt), "HH:mm")} <br />
              {format(new Date(item.startAt), "yyyy/MM/dd")}
            </Text>
          }
          rightContent={
            <div className="h-full py-8 border-b border-grey-300">
              <Text className="font-bold text-lg">{activityDetail.name}</Text>
              <ul>
                <li>
                  {t("common.from")}{": "}{format(new Date(item.startAt), 'yyyy/MM/dd')}{" "}  {t("common.before")}{": "} {format(new Date(item.lastBookingTime), 'yyyy/MM/dd')}
                </li>
                <li>
                  {t("pages.farmSchedule.onePerson")}{": "}{item.oneMemberCapacity}
                </li>
                <li>
                  {t("pages.farmSchedule.twoPerson")}{": "}{item.twoMembersCapacity}
                </li>
                <li>
                  {t("pages.farmSchedule.threePerson")}{": "}{item.threeMembersCapacity}
                </li>
                <li>
                  {t("pages.farmSchedule.fourPerson")}{": "}{item.fourMembersCapacity}
                </li>
              </ul>
            </div>
          }
        />
      ))}
      {limit < data.length && (
        <Text
          onClick={() => setLimit((prev) => prev + DEFAULT_LIMIT)}
          className={classNames(
            "w-full mt-4",
            "text-center font-bold text-lg",
            "cursor-pointer",
            "hover:underline",
            "active:transform active:scale-95"
          )}
        >
          Show more
        </Text>
      )}
    </>
  );
};

export default SchedulePrevious;
