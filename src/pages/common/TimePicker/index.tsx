import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";

export type TimePickerCustomizerProps = {
  value: Date | null;
  onChange?: (newValue: Date | null) => void;
  error?: boolean;
  backgroundInputColor?: string;
  helperText?: any;
} & { [key: string]: any };
const TimePickerCustomizer = ({
  value,
  onChange,
  error = false,
  backgroundInputColor = "transparent",
  helperText = "",
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
          {...props}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default TimePickerCustomizer;
