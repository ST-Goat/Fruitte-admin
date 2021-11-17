import TextField from "@mui/material/TextField";
import { Field, FieldInputProps } from "formik";
import React from "react";

export type TextBoxProps = {
  name: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
  fullWidth?: boolean;
} & {
  [key: string]: any;
};
function TextBox({ name, onChange, fullWidth = true, ...props }: TextBoxProps) {
  return (
    <div>
      <Field name={name}>
        {({ field }: { field: FieldInputProps<any> }) => (
          <TextField
            sx={{
              border: "1px solid #76848d",
              borderRadius: "5px",
              "& .Mui-focused": {
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "black !important",
                },
              },
            }}
            multiline
            fullWidth={fullWidth}
            {...field}
            {...props}
            onChange={(e) => {
              onChange && onChange(e);
              field.onChange(e);
            }}
          />
        )}
      </Field>
    </div>
  );
}

export default TextBox;
