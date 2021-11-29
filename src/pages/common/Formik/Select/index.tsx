import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Field, FieldInputProps } from "formik";
import React from "react";

export type Option = {
  label: string;
  value: any;
};

export type SelectProps = {
  name: string;
  options: Array<Option>;
  onChange?: (event: React.ChangeEvent<any>) => void;
  fullWidth?: boolean;
} & {
  [key: string]: any;
};

function Select({
  name,
  onChange,
  fullWidth = true,
  options,
  ...props
}: SelectProps) {
  return (
    <div>
      <Field name={name}>
        {({ field }: { field: FieldInputProps<any> }) => (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            fullWidth={fullWidth}
            onChange={(event: React.SyntheticEvent, value: any) => {
              onChange && onChange(event);
              if (Boolean(value))
                field.onChange({
                  target: {
                    name: name,
                    value: value.value,
                  },
                });
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  border: "1px solid #76848d",
                  borderRadius: "5px",
                  "&": {
                    borderColor: "#4C9C2E",
                  },
                  "& .Mui-focused": {
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4C9C2E !important",
                    },
                  },
                }}
                {...params}
                {...field}
                {...props}
                onChange={(e) => {
                  onChange && onChange(e);
                  field.onChange(e);
                }}
              />
            )}
          />
        )}
      </Field>
    </div>
  );
}

export default Select;
