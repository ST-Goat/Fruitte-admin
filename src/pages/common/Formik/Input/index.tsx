import React, { useEffect, useMemo, useState } from "react";
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
  onBlur?: () => void;
  disabled?: boolean;
};

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
  onBlur,
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

  const styledInputDefault = useMemo(() => {
    let result = [
      "w-full py-4 px-5",
      "border border-primary-default rounded-xl shadow-md",
      "focus:outline-none focus:border-2 focus:border-primary-default",
      "disabled:outline-none disabled:border-1 disabled:border-grey-default disabled:opacity-60",
    ];
    if (isError) {
      result = [
        "w-full py-4 px-5",
        "border border-error-default rounded-xl shadow-md",
        "focus:outline-none focus:border-2 focus:border-error-default",
        "disabled:outline-none disabled:border-1 disabled:border-grey-default disabled:opacity-60",
      ];
    }
    if (Boolean(EndIcon)) {
      result.push("pr-16");
    }
    if (Boolean(StartIcon)) {
      result.push("pl-16");
    }

    return cn(result);
  }, [isError, EndIcon, StartIcon]);

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
    <>
      <div className={cn("relative", styledWrapper)}>
        <input
          id={id}
          type={type}
          autoFocus={autoFocus}
          disabled={disabled}
          className={Boolean(styledInput) ? styledInput : styledInputDefault}
          onBlur={onBlur}
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
      </div>
      {isError && (
        <div className="error ml-2 text-red-700 italic">{meta.error}</div>
      )}
    </>
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
