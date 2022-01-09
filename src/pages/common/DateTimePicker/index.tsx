import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

export type DateTimePickerCustomizerProps = {
  value: Date | null | undefined;
  onChange?: (newValue: Date | null | undefined) => void;
};
const DateTimePickerCustomizer = ({
  value,
  onChange,
  ...props
}: DateTimePickerCustomizerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
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
        value={value}
        onChange={(newValue) => onChange && onChange(newValue)}
        inputFormat="yyyy/MM/dd HH:mm"
        disableMaskedInput
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerCustomizer;
