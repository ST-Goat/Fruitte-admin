import { MIN_LEFT_WIDTH } from "pages/common/Formik/Input/InputWithLabel";
import Select from "pages/common/Formik/Select";
import type { Option } from "pages/common/Autocomplete";

const SelectAdvance = ({
  label,
  id,
  name,
  options,
  placeholder,
  ...props
}: {
  label: string;
  id: string;
  name: string;
  options: Option[];
  placeholder?: string;
}) => {
  return (
    <div className="flex flex-start items-center">
      <label
        style={{ minWidth: MIN_LEFT_WIDTH }}
        className="mr-16"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex-grow">
        <Select
          {...props}
          id={id}
          name={name}
          options={options}
          placeholder={placeholder}
          isOptionEqualToValue={(option: Option, value: Option) =>
            option.value === value.value
          }
        />
      </div>
    </div>
  );
};

export default SelectAdvance;
