import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import type { FieldInputProps } from "formik";
import { isArray } from "lodash";

export type Option = {
  id?: any;
  label: string;
  value: any;
};

export type SelectProps = {
  name?: string;
  options: Array<Option>;
  onChange?: (newValue: any) => void;
  fullWidth?: boolean;
  field?: FieldInputProps<any>;
  placeholder?: string;
} & {
  [key: string]: any;
};

function AutoCompleteCustomizer({
  name,
  onChange,
  fullWidth = true,
  options,
  field,
  meta,
  placeholder,
  ...props
}: SelectProps) {
  const isError = meta.touched && meta.error;

  return (
    <div>
      <Autocomplete
        disablePortal
        options={options}
        fullWidth={fullWidth}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id ?? option.label}>
              {option.label}
            </li>
          );
        }}
        {...props}
        value={field?.value ?? props.value}
        onChange={(event: React.SyntheticEvent, value: any, reason) => {
          if (reason === "clear") {
            onChange && onChange(undefined);
            field &&
              field.onChange({
                target: {
                  name: name,
                  value: isArray(value) ? [] : undefined,
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
            placeholder={placeholder ?? ""}
            sx={{
              border: `1px solid ${isError ? "#EB5757" : "#76848d"}`,
              borderRadius: "0.75rem",
              "& fieldset": { borderRadius: "0.7rem" },
              "&": {
                borderColor: isError ? "#EB5757" : "#4C9C2E",
              },
              "& .Mui-focused": {
                ".MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${
                    isError ? "#EB5757" : "#4C9C2E"
                  } !important`,
                },
              },
            }}
            {...params}
          />
        )}
      />
      {isError && (
        <div className="error ml-2 text-red-700 italic">{meta.error}</div>
      )}
    </div>
  );
}

export default AutoCompleteCustomizer;
