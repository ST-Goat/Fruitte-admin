import { Field, FieldInputProps } from "formik";
import AutoCompleteCustomizer, {
  Option,
  SelectProps,
} from "pages/common/Autocomplete";

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
          <AutoCompleteCustomizer
            field={field}
            name={name}
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
