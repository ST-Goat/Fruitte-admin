import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import cn from "classnames";
import { Formik, Form, FormikProps } from "formik";
import format from "date-fns/format";

import Grid from "@mui/material/Grid";
import Text from "pages/common/components/Text";
import Select from "pages/common/Formik/Select";
import DatePickerCustomizer from "pages/common/Formik/DatePicker";
import TimePickerCustomizer from "pages/common/Formik/TimePicker";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import ButtonCustomizer from "pages/common/Button";

import { Activity, fetchAllActivityByFarmId } from "services/farmActivity";
import {
  fetchFarmSchedules,
  ScheduleInfor,
  ScheduleItem,
} from "services/farmSchedules";

import { guid } from "utilities";
import { TextField } from "@mui/material";

const MAGIRN_LEFT = "ml-16";
const MAGIRN_RIGHT = "mr-16";
const MAGIRN_BOTTOM = "mb-8";

const RowStyled = ({
  leftContent,
  rightContent,
}: {
  leftContent: any;
  rightContent: any;
}) => (
  <>
    <Grid item xs={2}>
      <div className={cn(MAGIRN_LEFT, MAGIRN_BOTTOM, "h-full")}>
        {leftContent}
      </div>
    </Grid>
    <Grid item xs={10}>
      <div className={cn(MAGIRN_RIGHT, MAGIRN_BOTTOM, "h-full")}>
        {rightContent}
      </div>
    </Grid>
  </>
);

type TimeRangeItem = {
  id: string;
  start: Date;
  onePerson: number;
  twoPerson: number;
  threePerson: number;
  fourPerson: number;
};

const TimeRangePicker = ({
  item,
  handleRemove,
  duration,
}: {
  item: TimeRangeItem;
  duration: number;
  handleRemove: () => void;
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div className="mr-4">
          <RemoveCircleIcon
            onClick={handleRemove}
            fontSize="large"
            sx={{
              color: "#828282",
              cursor: "pointer",
              "&:active": {
                transform: "scale(0.9)",
              },
            }}
          />
        </div>
        <TimePickerCustomizer name="start" />
        <div className="w-16" />
        <TimePickerCustomizer
          name="end"
          readOnly
          value={new Date(item.start.getTime() + duration * 1000)}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 ml-12 mt-8">
        <div className="flex items-center">
          <Text>1인팀</Text>
          <input
            className="ml-4 p-4 border border-primary-default rounded-md"
            defaultValue={0}
            type="number"
          />
        </div>
        <div className="flex items-center">
          <Text>2인팀</Text>
          <input
            className="ml-4 p-4 border border-primary-default rounded-md"
            defaultValue={0}
            type="number"
          />
        </div>
        <div className="flex items-center">
          <Text>3인팀</Text>
          <input
            className="ml-4 p-4 border border-primary-default rounded-md"
            defaultValue={0}
            type="number"
          />
        </div>
        <div className="flex items-center">
          <Text>4인팀</Text>
          <input
            className="ml-4 p-4 border border-primary-default rounded-md"
            defaultValue={0}
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

const SchedulePrevious = ({ data }: { data: ScheduleItem[] }) => {
  const lastActivityInfor = data[data.length - 1];
  if (!lastActivityInfor) return <></>;
  return (
    <>
      {lastActivityInfor.scheduleInfos.map((item: ScheduleInfor) => (
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
              <Text className="font-bold text-lg">
                {lastActivityInfor.name}
              </Text>
              <Text>{lastActivityInfor.description}</Text>
            </div>
          }
        />
      ))}
    </>
  );
};

const TWO_HOURS = 7200;
function Schedule({ farmId }: { farmId: string }) {
  const { t } = useTranslation();
  const [timeRangeList, setTimeRangeList] = useState<Array<TimeRangeItem>>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [schedulePrevious, setSchedulePrevious] = useState<ScheduleItem[]>([]);

  const rangeTimeSchedule = selectedActivity?.duration ?? TWO_HOURS;

  const handleAddNewTimeRange = () => {
    const newTimeRangeItem = {
      id: guid(),
      start: new Date(),
      onePerson: 0,
      twoPerson: 0,
      threePerson: 0,
      fourPerson: 0,
    };
    setTimeRangeList((prev) => [...prev, newTimeRangeItem]);
  };

  useEffect(() => {
    async function fetchAllActivityOptions() {
      try {
        const response: Activity[] = await fetchAllActivityByFarmId({
          farmId: farmId,
        });
        setActivities(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllActivityOptions();
  }, [farmId]);

  useEffect(() => {
    //fetchFarmSchedules
    async function fetchSchedulePrevious() {
      try {
        // need control with activity id here
        const response = await fetchFarmSchedules();
        setSchedulePrevious(response.slice(-3));
      } catch (error) {
        console.log(error);
      }
    }
    fetchSchedulePrevious();
  }, [selectedActivity]);

  return (
    <div>
      <Formik
        initialValues={{ activity: "", date: "", rangeTime: [] }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleSubmit, setFieldValue }: FormikProps<any>) => (
          <Form>
            <Grid
              sx={{
                border: "1px solid #BDBDBD",
                paddingTop: "4rem",
                paddingBottom: "4rem",
              }}
              container
            >
              <RowStyled
                leftContent={<Text className="font-bold text-xl">체험</Text>}
                rightContent={
                  <Select
                    name="activity"
                    options={activities.map((item) => ({
                      id: item.id,
                      label: item.name,
                      value: item.id,
                    }))}
                    onChange={(e) => {
                      const idSelected = e.target.value;
                      setSelectedActivity(
                        activities.find((item) => item.id === idSelected)
                      );
                    }}
                  />
                }
              />
              <RowStyled
                leftContent={<Text className="font-bold text-xl">날짜</Text>}
                rightContent={
                  <div className="w-80">
                    <DatePickerCustomizer name="date" />
                  </div>
                }
              />
              <RowStyled
                leftContent={<Text className="font-bold text-xl">날짜</Text>}
                rightContent={
                  <div>
                    {timeRangeList.map((item) => (
                      <TimeRangePicker
                        key={item.id}
                        item={item}
                        duration={rangeTimeSchedule}
                        handleRemove={() => {
                          setTimeRangeList((prev) =>
                            prev.filter(
                              (timeRangeItem) => timeRangeItem.id !== item.id
                            )
                          );
                        }}
                      />
                    ))}

                    <div className="mt-4 ml-12">
                      <AddCircleIcon
                        onClick={handleAddNewTimeRange}
                        fontSize="large"
                        sx={{
                          color: "#4C9C2E",
                          cursor: "pointer",
                          "&:active": {
                            transform: "scale(0.9)",
                          },
                        }}
                      />
                    </div>
                  </div>
                }
              />
            </Grid>
            <div className="flex items-center justify-end pr-64">
              <ButtonCustomizer type="submit" className="px-8 rounded-3xl mt-8">
                {t("common.save")}
              </ButtonCustomizer>
            </div>
          </Form>
        )}
      </Formik>
      <Grid
        sx={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
        container
      >
        <Grid item xs={12}>
          <div className="h-16 bg-grey-default" />
        </Grid>
        <SchedulePrevious data={schedulePrevious} />
      </Grid>
    </div>
  );
}

export default Schedule;
