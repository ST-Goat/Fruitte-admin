import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import type { FieldInputProps } from "formik";

export type Option = {
  label: string;
  value: any;
};

export type SelectProps = {
  name?: string;
  options: Array<Option>;
  onChange?: (newValue: any) => void;
  fullWidth?: boolean;
  field?: FieldInputProps<any>;
} & {
  [key: string]: any;
};

function AutoCompleteCustomizer({
  name,
  onChange,
  fullWidth = true,
  options,
  field,
  ...props
}: SelectProps) {
  return (
    <div>
      <Autocomplete
        disablePortal
        options={options}
        fullWidth={fullWidth}
        getOptionLabel={(option) => option.label}
        {...props}
        value={field?.value ?? props.value}
        onChange={(event: React.SyntheticEvent, value: any, reason) => {
          if (reason === "clear") {
            onChange && onChange(undefined);
            field &&
              field.onChange({
                target: {
                  name: name,
                  value: undefined,
                },
              });
            return;
          }
          onChange && onChange(value);
          if (Boolean(value))
            field &&
              field.onChange({
                target: {
                  name: name,
                  value: value,
                },
              });
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              border: "1px solid #76848d",
              borderRadius: "0.75rem",
              "& fieldset": { borderRadius: "0.7rem" },
              "&": {
                borderColor: "#4C9C2E",
              },
              "& .Mui-focused": {
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #4C9C2E !important",
                },
              },
            }}
            {...params}
          />
        )}
      />
    </div>
  );
}

export default AutoCompleteCustomizer;
