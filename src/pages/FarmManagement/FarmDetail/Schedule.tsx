import { Formik, Form, FormikProps } from "formik";
import Grid from "@mui/material/Grid";
import Text from "pages/common/components/Text";
import Select from "pages/common/Formik/Select";
import DatePicker from "pages/common/Formik/DatePicker";
import TimePicker from "pages/common/Formik/TimePicker";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import cn from "classnames";
import { guid } from "utilities";
import { useState } from "react";
import ButtonCustomizer from "pages/common/Button";

const options = [
  { label: "체험명", value: "체험명" },
  { label: "체험명1", value: "체험명1" },
  { label: "체험명2", value: "체험명2" },
];

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

const TimeRangePicker = ({ handleRemove }: { handleRemove: () => void }) => {
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
        <TimePicker name="startTime" />
        <div className="w-16" />
        <TimePicker name="endTime" />
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

const SchedulePrevious = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <RowStyled
          key={item}
          leftContent={
            <Text className="h-full font-bold text-lg py-8 border-b border-grey-300">
              19:00 <br />
              2021/10/10
            </Text>
          }
          rightContent={
            <div className="h-full py-8 border-b border-grey-300">
              <Text className="font-bold text-lg">체험명</Text>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
                commodi velit eum voluptatem non saepe totam. Excepturi,
                molestiae! Molestias alia
              </Text>
            </div>
          }
        />
      ))}
    </>
  );
};

type TimeRangeItem = {
  id: string;
  start: Date;
  end: Date;
  onePerson: number;
  twoPerson: number;
  threePerson: number;
  fourPerson: number;
};
function Schedule() {
  const [timeRangeList, setTimeRangeList] = useState<Array<TimeRangeItem>>([]);

  const handleAddNewTimeRange = () => {
    const newTimeRangeItem = {
      id: guid(),
      start: new Date(),
      end: new Date(),
      onePerson: 0,
      twoPerson: 0,
      threePerson: 0,
      fourPerson: 0,
    };
    setTimeRangeList((prev) => [...prev, newTimeRangeItem]);
  };
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
                rightContent={<Select name="activity" options={options} />}
              />
              <RowStyled
                leftContent={<Text className="font-bold text-xl">날짜</Text>}
                rightContent={
                  <div className="w-80">
                    <DatePicker name="date" />
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
                저장
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
        <SchedulePrevious />
      </Grid>
    </div>
  );
}

export default Schedule;
