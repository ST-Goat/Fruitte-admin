import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Formik, Form, FieldArray, FormikProps } from "formik";
import { startOfDay, endOfDay, isWithinInterval, format } from "date-fns";

import Grid from "@mui/material/Grid";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import RowStyled from "../components/FarmSchedule/RowStyled";
import Controller from "../components/FarmSchedule/Controller";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ScheduleInfors from "../components/FarmSchedule/ScheduleInfors";
import SchedulePrevious from "../components/FarmSchedule/SchedulePrevious";

import {
  Activity,
  fetchAllActivityByFarmId,
  fetchFarmActivityDetail,
} from "services/farmActivity";
import type { ScheduleInfor as TypeScheduleInfor } from "services/farmSchedules";
import {
  createNewScheduleOfAcitivityId,
  editExistedSchedule,
  deleteExistedSchedule,
} from "services/farmSchedules";

import { isDate, useAppDispatch } from "utilities";
import { differenceBy, find } from "lodash";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { SNACKBAR_VARIANTS } from "shared/comom.enum";

const checkScheduleInDate = (scheduleStartAt: Date, DateSelected: Date) => {
  const startDate = startOfDay(new Date(DateSelected));
  const endDate = endOfDay(new Date(DateSelected));
  return isWithinInterval(new Date(scheduleStartAt), {
    start: startDate,
    end: endDate,
  });
};

const createNewScheduleList = async (
  schedules: TypeScheduleInfor[],
  acitivityId: string | number
) => {
  if (schedules.length === 0) return;
  return Promise.all([
    ...schedules.map((item) =>
      createNewScheduleOfAcitivityId({
        activityId: acitivityId,
        data: {
          startAt: item.startAt,
          oneMemberCapacity: item.oneMemberCapacity,
          twoMembersCapacity: item.twoMembersCapacity,
          threeMembersCapacity: item.threeMembersCapacity,
          fourMembersCapacity: item.fourMembersCapacity,
        },
      })
    ),
  ]);
};

const editExitedScheduleList = async (schedules: TypeScheduleInfor[]) => {
  if (schedules.length === 0) return;
  return Promise.all([
    ...schedules.map((item) =>
      editExistedSchedule({
        scheduleId: item.id,
        data: {
          startAt: item.startAt,
          oneMemberCapacity: item.oneMemberCapacity,
          twoMembersCapacity: item.twoMembersCapacity,
          threeMembersCapacity: item.threeMembersCapacity,
          fourMembersCapacity: item.fourMembersCapacity,
        },
      })
    ),
  ]);
};

const deleteScheduleList = async (scheduleIds: Array<string | number>) => {
  if (!scheduleIds) return;
  return Promise.all([
    ...scheduleIds.map((id) => deleteExistedSchedule({ scheduleId: id })),
  ]);
};

const TWO_HOURS = 7200;
function Schedule({ farmId }: { farmId: string }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedulePrevious, setSchedulePrevious] = useState<TypeScheduleInfor[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState<{
    scheduleInfors: any[];
  }>({
    scheduleInfors: [],
  });

  const rangeTimeSchedule = selectedActivity?.duration ?? TWO_HOURS;

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
  async function fetchSchedulePrevious({
    activityId,
  }: {
    activityId: string | number;
  }) {
    setIsLoading(true);
    try {
      // need control with activity id here
      const { schedulesInActivity } = await fetchFarmActivityDetail({
        activityId: activityId,
      });
      setSchedulePrevious(schedulesInActivity);
      setInitialFormData((prev) => ({
        ...prev,
        scheduleInfors: schedulesInActivity.filter((item) =>
          checkScheduleInDate(item.startAt, selectedDate)
        ),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    //fetchFarmSchedules
    if (selectedActivity && selectedActivity.id) {
      fetchSchedulePrevious({
        activityId: selectedActivity?.id,
      });
    }
  }, [selectedActivity, selectedDate]);

  const handleSubmit = async (values: any) => {
    try {
      const listScheduleInfors = values.scheduleInfors;
      if (!listScheduleInfors || listScheduleInfors.length === 0) {
        return;
      }
      const editedSchedules: TypeScheduleInfor[] = [];
      const newSchedules: TypeScheduleInfor[] = [];
      listScheduleInfors.forEach((schedule: TypeScheduleInfor) => {
        if (!schedule.id) {
          newSchedules.push(schedule);
          return;
        }
        const match = find(initialFormData.scheduleInfors, schedule);
        if (!match) editedSchedules.push(schedule);
      });
      const deletedSchedules: TypeScheduleInfor[] = differenceBy(
        initialFormData.scheduleInfors,
        values.scheduleInfors,
        "id"
      );

      if (selectedActivity) {
        await Promise.all([
          createNewScheduleList(newSchedules, selectedActivity?.id),
          editExitedScheduleList(editedSchedules),
          deleteScheduleList(deletedSchedules.map((item) => item.id)),
        ]);
        await fetchSchedulePrevious({ activityId: selectedActivity?.id });
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Grid
        sx={{
          border: "1px solid #BDBDBD",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
        container
      >
        <Controller
          translate={t}
          activities={activities}
          selectedDate={selectedDate}
          onChangeDate={(newDate) => {
            if (isDate(newDate)) {
              setSelectedDate(newDate as Date);
            }
          }}
          setSelectedActivity={setSelectedActivity}
        />
        {isLoading ? (
          <>{t("common.loading")}</>
        ) : (
          <Formik initialValues={initialFormData} onSubmit={handleSubmit}>
            {({ values }: FormikProps<any>) => (
              <Form className="w-full">
                <Grid container item xs={12}>
                  <RowStyled
                    leftContent={
                      <Text className="mt-4 font-bold text-xl">
                        {t("pages.farmSchedule.reservationTime")}
                      </Text>
                    }
                    rightContent={
                      <FieldArray name="scheduleInfors">
                        {(arrayHelpers) => (
                          <>
                            <ScheduleInfors
                              fieldName="scheduleInfors"
                              values={values.scheduleInfors}
                              arrayHelpers={arrayHelpers}
                              duration={rangeTimeSchedule}
                            />
                            <div className="mt-4 ml-12">
                              <AddCircleIcon
                                onClick={() => {
                                  arrayHelpers.push({
                                    startAt: new Date(),
                                    oneMemberCapacity: 0,
                                    twoMembersCapacity: 0,
                                    threeMembersCapacity: 0,
                                    fourMembersCapacity: 0,
                                  });
                                }}
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
                          </>
                        )}
                      </FieldArray>
                    }
                  />

                  <RowStyled
                    leftContent={<></>}
                    rightContent={
                      <ButtonCustomizer
                        type="submit"
                        className="px-8 rounded-3xl mt-8"
                      >
                        {t("common.save")}
                      </ButtonCustomizer>
                    }
                  />
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </Grid>
      <Grid
        sx={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
        container
      >
        <Grid item xs={12}>
          <div className="py-4 bg-secondary1-default">
            <Text className="font-bold text-xl text-white-default ml-4">
              {t("pages.farmSchedule.createdSchedule").toUpperCase()}
            </Text>
          </div>
        </Grid>
        <SchedulePrevious
          activityDetail={selectedActivity}
          data={schedulePrevious}
          loading={isLoading}
        />
      </Grid>
    </div>
  );
}

export default Schedule;
