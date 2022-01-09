import React from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { FieldInputProps } from "formik";
import Stack from "@mui/material/Stack";

export type DatePickerProps = {
  value: Date;
  onChange?: (newValue: Date | null) => void;
  fullWidth?: boolean;
  field?: FieldInputProps<any>;
  name?: string;
} & {
  [key: string]: any;
};

function DatePicker({
  value,
  onChange,
  fullWidth = true,
  field,
  name,
  ...props
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={3}>
        <DesktopDatePicker
          inputFormat="yyyy/MM/dd"
          disableMaskedInput
          {...props}
          value={value}
          onChange={(newValue: Date | null) => {
            onChange && onChange(newValue);
            field &&
              name &&
              field.onChange({
                target: {
                  name: name,
                  value: newValue,
                },
              });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                border: "1px solid #76848d",
                borderRadius: "5px",
                "&": {
                  borderColor: "#4C9C2E",
                },
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default DatePicker;
