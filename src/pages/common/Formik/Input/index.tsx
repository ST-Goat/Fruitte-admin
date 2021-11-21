import React from "react";
import { Field, FieldInputProps, FieldMetaProps } from "formik";
import InputWithLabel from "./InputWithLabel";
import cn from "classnames";

export type InputProps = {
  id?: string | undefined;
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
  disabled?: boolean;
};

const styledInputDefault = cn(
  "w-full py-4 px-5",
  "border border-primary-default rounded-xl shadow-md",
  "focus:outline-none focus:border-2 focus:border-primary-default",
  "disabled:outline-none disabled:border-1 disabled:border-grey-default disabled:opacity-60"
);

function Input({
  id,
  name,
  type,
  placeholder,
  onChange,
  autoFocus,
  validate,
  EndIcon,
  StartIcon,
  styledWrapper,
  styledInput,
  styledIconWrapper,
  onClickIcon,
  disabled = false,
}: InputProps) {
  return (
    <Field name={name} validate={validate}>
      {({
        field,
        meta,
      }: {
        field: FieldInputProps<any>;
        meta: FieldMetaProps<any>;
      }) => {
        const isError = validate && meta.touched && meta.error;
        return (
          <div className={cn("relative", styledWrapper)}>
            <input
              id={id}
              type={type}
              autoFocus={autoFocus}
              disabled={disabled}
              className={
                Boolean(styledInput)
                  ? styledInput
                  : styledInputDefault.replaceAll(
                      isError
                        ? "border-primary-default"
                        : "border-error-default",
                      isError
                        ? "border-error-default"
                        : "border-primary-default"
                    )
              }
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
                  "absolute top-0 h-full flex items-center",
                  disabled && "opacity-60",
                  EndIcon && "right-5",
                  StartIcon && "left-5",
                  styledIconWrapper
                )}
              >
                {EndIcon ?? StartIcon}
              </div>
            )}
            {isError && (
              <div className="error ml-2 text-red-700 italic">{meta.error}</div>
            )}
          </div>
        );
      }}
    </Field>
  );
}

export { InputWithLabel };
export default Input;
