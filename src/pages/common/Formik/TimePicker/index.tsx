import React from "react";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Field, FieldInputProps } from "formik";
import Stack from "@mui/material/Stack";

export type TimePickerProps = {
  name: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
  fullWidth?: boolean;
} & {
  [key: string]: any;
};

function TimePicker({
  name,
  onChange,
  fullWidth = true,
  ...props
}: TimePickerProps) {
  return (
    <div>
      <Field name={name}>
        {({ field }: { field: FieldInputProps<any> }) => (
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={3}>
              <DesktopTimePicker
                value={new Date()}
                onChange={(newValue: Date | null) => {
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
                    {...props}
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
            </Stack>{" "}
          </LocalizationProvider>
        )}
      </Field>
    </div>
  );
}

export default TimePicker;
