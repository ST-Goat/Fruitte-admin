import { Field, FieldInputProps, FieldMetaProps } from "formik";
import AutoCompleteCustomizer, {
  Option,
  SelectProps,
} from "pages/common/Autocomplete";

function Select({
  name,
  onChange,
  fullWidth = true,
  options,
  validate,
  ...props
}: SelectProps) {
  return (
    <div>
      <Field name={name} validate={validate}>
        {({
          field,
          meta,
        }: {
          field: FieldInputProps<any>;
          meta: FieldMetaProps<any>;
        }) => (
          <AutoCompleteCustomizer
            field={field}
            name={name}
            meta={meta}
            options={options}
            onChange={onChange}
            fullWidth={fullWidth}
            {...props}
          />
        )}
      </Field>
    </div>
  );
}

export default Select;
