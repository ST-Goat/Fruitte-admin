import { useTranslation } from "react-i18next";
import format from "date-fns/format";

import RowStyled from "./RowStyled";
import Text from "pages/common/components/Text";

import { ScheduleInfor } from "services/farmSchedules";
import { Activity } from "services/farmActivity";

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
      {data.map((item: ScheduleInfor) => (
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
              <Text>{activityDetail.description}</Text>
            </div>
          }
        />
      ))}
    </>
  );
};

export default SchedulePrevious;
