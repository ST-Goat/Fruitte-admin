import { memo } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { ArrayHelpers, Field, FieldInputProps, FieldMetaProps } from "formik";
import addSeconds from "date-fns/addSeconds";
import isEqual from "lodash/isEqual";

import Text from "pages/common/components/Text";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import TimePickerCustomizer from "pages/common/TimePicker";
import DateTimePickerCustomizer from "pages/common/DateTimePicker";

import type { ScheduleInfor } from "services/farmSchedules";
import {
  endOfDay,
  isAfter,
  getMinutes,
  setMinutes,
  setHours,
  getHours,
} from "date-fns/esm";
import { isDate } from "lodash";

const validateStartAt = (
  value: Date,
  selectedDate: Date,
  lastBookingTime: Date
) => {
  let error = "";
  if (!isDate(value)) {
    error = "This value must be Date yyyy/MM/dd";
    return error;
  }
  const hours = getHours(value);
  const minutes = getMinutes(value);
  const dateValue = setHours(setMinutes(selectedDate, minutes), hours);
  if (isAfter(lastBookingTime, dateValue))
    error = "StartAt must be after last booking time (Before Field)";
  return error;
};

const validateLastBookingTime = (value: Date) => {
  let error = "";
  if (!isDate(value)) {
    error = "This value must be Date yyyy/MM/dd";
    return error;
  }
  return error;
};

export type ScheduleInforItem = Omit<ScheduleInfor, "id"> & { rowId: any };
export type ScheduleInforProps = {
  values: ScheduleInforItem[];
  fieldName: string;
  arrayHelpers: ArrayHelpers;
  duration: number;
  selectedDate: Date;
};
const ScheduleInfors = memo(
  ({
    values,
    fieldName,
    arrayHelpers,
    duration,
    selectedDate,
  }: ScheduleInforProps) => {
    const { t } = useTranslation();

    return (
      <>
        {values && values.length > 0 ? (
          values.map((schedule: ScheduleInforItem, index: number) => (
            <div key={index}>
              <div className="mb-8">
                <div
                  className={classNames(
                    "flex pt-5 h-24 pl-2",
                    "bg-secondary1-default rounded rounded-md"
                  )}
                >
                  <div className="mt-2">
                    <RemoveCircleIcon
                      onClick={() => {
                        arrayHelpers.remove(index);
                      }}
                      fontSize="large"
                      sx={{
                        color: "#ffffff",
                        cursor: "pointer",
                        "&:active": {
                          transform: "scale(0.9)",
                        },
                      }}
                    />
                  </div>
                  <Text className="mx-4 mt-4 text-white-default">
                    {t("common.from")}
                  </Text>
                  <div>
                    <Field
                      name={`${fieldName}[${index}].startAt`}
                      validate={(value: Date) =>
                        validateStartAt(
                          value,
                          selectedDate,
                          schedule.lastBookingTime
                        )
                      }
                    >
                      {({
                        field,
                        form,
                        meta,
                      }: {
                        field: FieldInputProps<any>;
                        form: any;
                        meta: FieldMetaProps<any>;
                      }) => (
                        <>
                          <TimePickerCustomizer
                            {...field}
                            value={field.value}
                            onChange={(newValue: Date | null) => {
                              let newDate = newValue;
                              if (isDate(newValue)) {
                                const newHours = getHours(newValue);
                                const newMinutes = getMinutes(newValue);
                                newDate = setHours(
                                  setMinutes(selectedDate, newMinutes),
                                  newHours
                                );
                              }
                              field.onChange({
                                target: {
                                  name: field.name,
                                  value: newDate,
                                },
                              });
                            }}
                            error={Boolean(meta.touched && meta.error)}
                            helperText={meta.touched && meta.error}
                            backgroundInputColor="#ffffff"
                          />
                        </>
                      )}
                    </Field>
                  </div>
                  <Text className="mx-4 mt-4 text-white-default">
                    {t("common.to")}
                  </Text>
                  <div>
                    <TimePickerCustomizer
                      readOnly
                      value={addSeconds(
                        new Date(schedule.startAt),
                        duration * 60
                      )}
                      backgroundInputColor="#ffffff"
                    />
                  </div>
                  <Text className="mx-4 mt-4 text-white-default">
                    {t("common.before")}
                  </Text>
                  <div>
                    <Field
                      name={`${fieldName}[${index}].lastBookingTime`}
                      validate={validateLastBookingTime}
                    >
                      {({
                        field,
                        form,
                        meta,
                      }: {
                        field: FieldInputProps<any>;
                        form: any;
                        meta: FieldMetaProps<any>;
                      }) => (
                        <DateTimePickerCustomizer
                          {...field}
                          value={field.value}
                          onChange={(newValue: Date | null) => {
                            return field.onChange({
                              target: {
                                name: field.name,
                                value: newValue,
                              },
                            });
                          }}
                          shouldDisableDate={(date: Date) =>
                            isAfter(date, endOfDay(new Date(selectedDate)))
                          }
                          // shouldDisableTime
                          error={Boolean(meta.touched && meta.error)}
                          helperText={meta.touched && meta.error}
                          backgroundInputColor="#ffffff"
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 ml-12 mt-8">
                  <div className="flex items-center">
                    <Text>{t("pages.farmSchedule.onePerson")}</Text>
                    <Field
                      className={classNames(
                        "ml-4 p-4 border border-primary-default rounded-md",
                        "outline-none",
                        "focus:border-2 focus:border-primary-default"
                      )}
                      name={`${fieldName}[${index}].oneMemberCapacity`}
                      type="number"
                    />
                  </div>
                  <div className="flex items-center">
                    <Text>{t("pages.farmSchedule.twoPerson")}</Text>
                    <Field
                      className={classNames(
                        "ml-4 p-4 border border-primary-default rounded-md",
                        "outline-none",
                        "focus:border-2 focus:border-primary-default"
                      )}
                      name={`${fieldName}[${index}].twoMembersCapacity`}
                      type="number"
                    />
                  </div>
                  <div className="flex items-center">
                    <Text>{t("pages.farmSchedule.threePerson")}</Text>
                    <Field
                      className={classNames(
                        "ml-4 p-4 border border-primary-default rounded-md",
                        "outline-none",
                        "focus:border-2 focus:border-primary-default"
                      )}
                      name={`${fieldName}[${index}].threeMembersCapacity`}
                      type="number"
                    />
                  </div>
                  <div className="flex items-center">
                    <Text>{t("pages.farmSchedule.fourPerson")}</Text>
                    <Field
                      className={classNames(
                        "ml-4 p-4 border border-primary-default rounded-md",
                        "outline-none",
                        "focus:border-2 focus:border-primary-default"
                      )}
                      name={`${fieldName}[${index}].fourMembersCapacity`}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </>
    );
  },
  (prevProps: ScheduleInforProps, nextProps: ScheduleInforProps) => {
    return isEqual(prevProps, nextProps);
  }
);

export default ScheduleInfors;
