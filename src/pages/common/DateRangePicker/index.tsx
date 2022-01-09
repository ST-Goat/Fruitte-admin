import * as React from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { isDate } from "utilities/helper";

export default function DateRangePickerCustomizer({
  defaultValue,
  onChange,
}: {
  defaultValue?: [any, any];
  onChange: (newValue: [any, any]) => void;
}) {
  const [value, setValue] = React.useState<DateRange<Date>>(
    defaultValue ?? [null, null]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Start Date"
        endText="End Date"
        inputFormat="yyyy/MM/dd"
        disableMaskedInput
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          if (!newValue.some((item) => !isDate(item))) {
            onChange(newValue);
          }
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField size="small" {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField size="small" {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
