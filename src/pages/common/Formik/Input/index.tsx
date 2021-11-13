import React from "react";
import { Field, FieldInputProps, FieldMetaProps } from "formik";
import cn from "classnames";

export type InputProps = {
  name: string;
  type: string;
  onChange?: (value: any) => void;
  placeholder?: string;
  autoFocus?: boolean;
  validate?: (value: string) => string | undefined;
  EndIcon?: React.ReactElement;
  StartIcon?: React.ReactElement;
  styledInput?: string;
  styledWrapper?: string;
  styledIconWrapper?: string;
  onClickIcon?: (event: React.MouseEvent) => void;
};

function Input({
  name,
  type,
  placeholder,
  onChange,
  autoFocus,
  validate,
  EndIcon,
  StartIcon,
  styledWrapper,
  styledInput = "w-full py-2 px-4 rounded-xl shadow-md",
  styledIconWrapper,
  onClickIcon,
}: InputProps) {
  return (
    <Field name={name} validate={validate}>
      {({
        field,
        meta,
      }: {
        field: FieldInputProps<any>;
        meta: FieldMetaProps<any>;
      }) => (
        <div className={cn("relative mb-6", styledWrapper)}>
          <input
            type={type}
            autoFocus={autoFocus}
            className={styledInput}
            placeholder={placeholder}
            {...field}
            onChange={(value) => {
              field.onChange(value);
              onChange && onChange(value);
            }}
          />
          {(EndIcon || StartIcon) && (
            <div
              onClick={onClickIcon}
              className={cn(
                "absolute top-2",
                EndIcon && "right-2",
                StartIcon && "left-2",
                styledIconWrapper
              )}
            >
              {EndIcon ?? StartIcon}
            </div>
          )}
          {validate && meta.touched && meta.error && (
            <div className="error ml-2 text-red-700 italic">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

export default Input;
