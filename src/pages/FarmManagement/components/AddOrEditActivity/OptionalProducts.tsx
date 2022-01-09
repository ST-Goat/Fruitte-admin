import { useState } from "react";
import cn from "classnames";

import { Field, FieldInputProps } from "formik";
import Text from "pages/common/components/Text";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { guid } from "utilities";
import { useTranslation } from "react-i18next";

export type OptionItem = {
  rowId?: string;
  name: string;
  price: number;
};

const InputGroup = ({
  rowId,
  name,
  price,
  onChange,
  handleRemove,
  translate,
}: Omit<OptionItem, "rowId"> & {
  rowId: string;
  handleRemove: (rowId: string) => void;
  onChange: (rowId: string, newValue: Omit<OptionItem, "rowId">) => void;
  translate: (str: string) => string;
}) => {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { name, price };
    onChange(rowId, {
      ...newValue,
      [ev.target.name]:
        ev.target.name === "price" ? Number(ev.target.value) : ev.target.value,
    });
  };
  return (
    <div className="flex items-center">
      <input
        type="text"
        name="name"
        value={name}
        className={cn(
          "w-1/3 py-4 px-5 mr-4",
          "border border-primary-default rounded-xl shadow-md",
          "focus:outline-none focus:border-2 focus:border-primary-default",
          "disabled:outline-none disabled:border-1 disabled:border-grey-default disabled:opacity-60"
        )}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        value={price}
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
        <Text className="font-bold">{translate("common.remove")}</Text>
      </div>
    </div>
  );
};

export type OptionalProductProps = {
  fieldValue: Array<OptionItem & { id: number | string }>;
  setFieldValue: (field: string, value: any) => void;
};

function OptionalProducts({ fieldValue, setFieldValue }: OptionalProductProps) {
  const { t } = useTranslation();

  const addNewRow = () => {
    const generateNewId = guid();
    const newItem = {
      rowId: generateNewId,
      name: "",
      price: 0,
    };
    setFieldValue("activityAdditionalServices", [...fieldValue, newItem]);
  };

  const handleRemove = (rowId: string) => {
    setFieldValue(
      "activityAdditionalServices",
      fieldValue.filter((item) =>
        Boolean(item.id) ? item.id !== rowId : item.rowId !== rowId
      )
    );
  };

  const handleChange = (rowId: string, newValue: any) => {
    const matchIndex = fieldValue.findIndex((item) => item.rowId === rowId);
    setFieldValue("activityAdditionalServices", [
      ...fieldValue.slice(0, matchIndex),
      { rowId: rowId, ...newValue },
      ...fieldValue.slice(matchIndex + 1),
    ]);
  };

  return (
    <Field name="activityAdditionalServices">
      {({ field }: { field: FieldInputProps<any> }) => {
        return (
          <div>
            {fieldValue.length > 0 &&
              fieldValue
                .map((item) => ({ ...item, rowId: item.rowId ?? item.id }))
                .map((row) => (
                  <div key={row.rowId} className="mb-4">
                    <InputGroup
                      {...row}
                      translate={t}
                      rowId={row.rowId as string}
                      handleRemove={handleRemove}
                      onChange={handleChange}
                    />
                  </div>
                ))}
            <div className={cn("flex cursor-pointer")}>
              <AddIcon />
              <Text className="font-bold" onClick={addNewRow}>
                {t("common.insert")}
              </Text>
            </div>
          </div>
        );
      }}
    </Field>
  );
}

export default OptionalProducts;
