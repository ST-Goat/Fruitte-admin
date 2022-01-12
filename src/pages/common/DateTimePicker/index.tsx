import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

export type DateTimePickerCustomizerProps = {
  value: Date | null;
  onChange?: (newValue: Date | null) => void;
  error?: boolean;
  helperText?: any;
  backgroundInputColor?: string;
} & {
  [key: string]: any;
};
const DateTimePickerCustomizer = ({
  value,
  onChange,
  error = false,
  helperText,
  backgroundInputColor = "transparent",
  ...props
}: DateTimePickerCustomizerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            sx={{
              borderRadius: "5px",
              "& .MuiInputBase-root": {
                "& fieldset": {
                  borderColor: !error
                    ? "#4C9C2E !important"
                    : "#EB5757 !important",
                  borderWidth: !error ? "1px" : "2px",
                },
              },
              "& .Mui-focused fieldset": {
                borderWidth: "2px",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: backgroundInputColor,
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
