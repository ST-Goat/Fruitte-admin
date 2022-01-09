import React from "react";
import DatePickerCustomizer from "pages/common/DatePicker";
import { Field, FieldInputProps } from "formik";
import Stack from "@mui/material/Stack";

export type DatePickerProps = {
  name: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
  fullWidth?: boolean;
} & {
  [key: string]: any;
};

function DatePicker({
  name,
  onChange,
  fullWidth = true,
  ...props
}: DatePickerProps) {
  return (
    <div>
      <Field name={name}>
        {({ field }: { field: FieldInputProps<any> }) => (
          <DatePickerCustomizer field={field} name={name} value={field.value} />
        )}
      </Field>
    </div>
  );
}

export default DatePicker;
