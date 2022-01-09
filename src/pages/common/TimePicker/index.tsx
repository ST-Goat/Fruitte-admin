import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";

export type TimePickerCustomizerProps = {
  value: Date | null;
  onChange?: (newValue: Date | null) => void;
} & { [key: string]: any };
const TimePickerCustomizer = ({
  value,
  onChange,
  ...props
}: TimePickerCustomizerProps) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={3}>
        <DesktopTimePicker
          value={value}
          onChange={(newValue: any) => onChange && onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                border: "1px solid #76848d",
                borderRadius: "5px",
                "&": {
                  borderColor: "#4C9C2E",
                },
                "& .Mui-focused fieldset": {
                  borderColor: "#4C9C2E !important",
                },
              }}
            />
          )}
          {...props}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default TimePickerCustomizer;
