import Input from ".";

export const MIN_LEFT_WIDTH = "150px";

export type InputWithLabelProps = {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  labelMinWidth?: string;
} & { [key: string]: any };
const InputWithLabel = ({
  id,
  name,
  type,
  placeholder = "",
  label,
  labelMinWidth,
  ...props
}: InputWithLabelProps) => {
  return (
    <div className="flex flex-start items-center">
      <label
        style={{ minWidth: labelMinWidth ?? MIN_LEFT_WIDTH }}
        className="mr-16"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex-grow">
        <Input
          {...props}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputWithLabel;
