import { memo } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { ArrayHelpers, Field, FieldInputProps } from "formik";
import addSeconds from "date-fns/addSeconds";
import isEqual from "lodash/isEqual";

import Text from "pages/common/components/Text";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import TimePickerCustomizer from "pages/common/TimePicker";
import DateTimePickerCustomizer from "pages/common/DateTimePicker";

import type { ScheduleInfor } from "services/farmSchedules";

export type ScheduleInforItem = Omit<ScheduleInfor, "id"> & { rowId: any };
export type ScheduleInforProps = {
  values: ScheduleInforItem[];
  fieldName: string;
  arrayHelpers: ArrayHelpers;
  duration: number;
};
const ScheduleInfors = memo(
  ({ values, fieldName, arrayHelpers, duration }: ScheduleInforProps) => {
    const { t } = useTranslation();

    return (
      <>
        {values && values.length > 0 ? (
          values.map((schedule: ScheduleInforItem, index: number) => (
            <div key={index}>
              <div className="mb-8">
                <div
                  className={classNames(
                    "flex items-center py-2 pl-2",
                    "bg-secondary1-default rounded rounded-md"
                  )}
                >
                  <div>
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
                  <Text className="mx-4 text-white-default">
                    {t("common.from")}
                  </Text>
                  <div className="bg-white-default rounded-md">
                    <Field name={`${fieldName}[${index}].startAt`}>
                      {({ field }: { field: FieldInputProps<any> }) => (
                        <TimePickerCustomizer
                          {...field}
                          value={field.value}
                          onChange={(newValue: Date | null) => {
                            field.onChange({
                              target: {
                                name: field.name,
                                value: newValue,
                              },
                            });
                          }}
                        />
                      )}
                    </Field>
                  </div>
                  <Text className="mx-4 text-white-default">
                    {t("common.to")}
                  </Text>
                  <div className="bg-white-default rounded-md">
                    <TimePickerCustomizer
                      readOnly
                      value={addSeconds(
                        new Date(schedule.startAt).getTime(),
                        duration
                      )}
                    />
                  </div>
                  <Text className="mx-4 text-white-default">
                    {t("common.before")}
                  </Text>
                  <div className="bg-white-default rounded-md">
                    <DateTimePickerCustomizer
                      value={new Date()}
                      onChange={() => {}}
                    />
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
