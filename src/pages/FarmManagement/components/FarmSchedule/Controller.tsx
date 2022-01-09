import RowStyled from "./RowStyled";
import Text from "pages/common/components/Text";
import AutoCompleteCustomizer from "pages/common/Autocomplete";
import DatePickerCustomizer from "pages/common/DatePicker";

import { Activity } from "services/farmActivity";

const Controller = ({
  translate,
  activities,
  selectedDate,
  setSelectedActivity,
  onChangeDate,
}: {
  translate: (str: string) => string;
  activities: Activity[];
  selectedDate: Date;
  setSelectedActivity: React.Dispatch<Activity | undefined>;
  onChangeDate: (newDate: Date | null) => void;
}) => {
  return (
    <>
      <RowStyled
        leftContent={
          <Text className="mt-4 font-bold text-xl">
            {translate("pages.farmSchedule.activity")}
          </Text>
        }
        rightContent={
          <div>
            <AutoCompleteCustomizer
              options={activities.map((item) => ({
                id: item.id,
                label: item.name,
                value: item.id,
              }))}
              onChange={(newValue) => {
                const idSelected = newValue?.value;
                setSelectedActivity(
                  activities.find((item) => item.id === idSelected)
                );
              }}
            />
          </div>
        }
      />
      <RowStyled
        leftContent={
          <Text className="mt-4 font-bold text-xl">
            {translate("pages.farmSchedule.date")}
          </Text>
        }
        rightContent={
          <div className="w-72">
            <DatePickerCustomizer
              value={selectedDate}
              // onChange={(newDate) => {
              //   if (isDate(newDate)) setSelectedDate(newDate as Date);
              // }}
              onChange={onChangeDate}
            />
          </div>
        }
      />
    </>
  );
};
export default Controller;
