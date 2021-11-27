import { useState } from "react";
import cn from "classnames";

import { Field, FieldInputProps } from "formik";
import Text from "pages/common/components/Text";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { guid } from "utilities";

export type OptionItem = {
  id: string;
  name: string;
  price: string;
};

const InputGroup = ({
  rowId,
  name,
  price,
  onChange,
  handleRemove,
}: Omit<OptionItem, "id"> & {
  rowId: string;
  handleRemove: (rowId: string) => void;
  onChange: (rowId: string, newValue: Omit<OptionItem, "id">) => void;
}) => {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { name, price };
    onChange(rowId, {
      ...newValue,
      [ev.target.name]: ev.target.value,
    });
  };
  return (
    <div className="flex items-center">
      <input
        type="text"
        name="name"
        // value={name}
        className={cn(
          "w-1/3 py-4 px-5 mr-4",
          "border border-primary-default rounded-xl shadow-md",
          "focus:outline-none focus:border-2 focus:border-primary-default",
          "disabled:outline-none disabled:border-1 disabled:border-grey-default disabled:opacity-60"
        )}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        // value={price}
        className={cn(
          "w-1/3 py-4 px-5 mr-4",
          "border border-primary-default rounded-xl shadow-md",
          "focus:outline-none focus:border-2 focus:border-primary-default",
          "disabled:outline-none disabled:border-1 disabled:border-grey-default disabled:opacity-60"
        )}
        onChange={handleChange}
      />
      <div
        className={cn(
          "flex cursor-pointer h-full",
          "active:transform active:scale-95",
          "hover:opacity-80"
        )}
        onClick={() => handleRemove(rowId)}
      >
        <RemoveIcon />
        <Text className="font-bold">제거 하기</Text>
      </div>
    </div>
  );
};

export type OptionalProductProps = {
  defaultVaule?: Array<OptionItem>;
};

function OptionalProducts({ defaultVaule }: OptionalProductProps) {
  const [options, setOptions] = useState<Array<OptionItem>>([]);

  const addNewRow = () => {
    const newItem = {
      id: guid(),
      name: "",
      price: "",
    };
    setOptions((prev) => [...prev, newItem]);
  };

  const handleRemove = (rowId: string) => {
    setOptions((prev) => prev.filter((item) => item.id !== rowId));
  };

  const handleChange = (rowId: string, newValue: any) => {
    const matchIndex = options.findIndex((item) => item.id === rowId);
    console.log(options, "options");
    setOptions([
      ...options.slice(0, matchIndex),
      { id: rowId, ...newValue },
      ...options.slice(matchIndex + 1),
    ]);
  };

  return (
    <Field
      name="optionalProducts"
      render={({ field }: { field: FieldInputProps<any> }) => {
        return (
          <div>
            {options.map((row) => (
              <div key={row.id} className="mb-4">
                <InputGroup
                  {...row}
                  rowId={row.id}
                  handleRemove={handleRemove}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className={cn("flex cursor-pointer")}>
              <AddIcon />
              <Text className="font-bold" onClick={addNewRow}>
                추가하기
              </Text>
            </div>
          </div>
        );
      }}
    />
  );
}

export default OptionalProducts;
