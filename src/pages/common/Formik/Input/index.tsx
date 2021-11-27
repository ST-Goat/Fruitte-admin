import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Field, FieldInputProps, FieldMetaProps } from "formik";
import InputWithLabel from "./InputWithLabel";

import { useDebounce } from "utilities";

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

const RenderInput = ({
  id,
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
  field,
  meta,
  name,
}: InputProps & {
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
}) => {
  const isError = validate && meta.touched && meta.error;
  const [fieldValue, setFieldValue] = useState(field.value ?? "");
  const debouncedValue = useDebounce(fieldValue);

  useEffect(() => {
    field.onChange({
      target: {
        name: name,
        value: debouncedValue,
      },
    });
  }, [debouncedValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
    onChange && onChange(event);
  };
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
                isError ? "border-primary-default" : "border-error-default",
                isError ? "border-error-default" : "border-primary-default"
              )
        }
        placeholder={placeholder}
        value={fieldValue}
        onChange={handleChange}
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
};

function Input({ name, validate, ...props }: InputProps) {
  return (
    <Field name={name} validate={validate}>
      {({
        field,
        meta,
      }: {
        field: FieldInputProps<any>;
        meta: FieldMetaProps<any>;
      }) => (
        <RenderInput
          {...props}
          name={name}
          field={field}
          meta={meta}
          validate={validate}
        />
      )}
    </Field>
  );
}

export { InputWithLabel, RenderInput };
export default Input;
