import { useTranslation } from "react-i18next";
import cn from "classnames";

import { Field, FieldArray, ArrayHelpers } from "formik";
import Text from "pages/common/components/Text";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export type OptionalProductProps = {
  name: string;
  fieldValue: Array<{
    name: string;
    price: number;
  }>;
};

function OptionalProducts({
  name: fieldName,
  fieldValue,
}: OptionalProductProps) {
  const { t } = useTranslation();

  return (
    <FieldArray name={fieldName}>
      {(arrayHelpers: ArrayHelpers) => (
        <>
          {fieldValue && fieldValue.length > 0 ? (
            fieldValue.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <Field
                  type="text"
                  name={`${fieldName}[${index}].name`}
                  className={cn(
                    "w-1/3 py-4 px-5 mr-4",
                    "border border-primary-default rounded-xl shadow-md",
                    "focus:outline-none focus:border-2 focus:border-primary-default",
                    "disabled:outline-none disabled:border-1 disabled:border-grey-default disabled:opacity-60"
                  )}
                />
                <Field
                  type="number"
                  name={`${fieldName}[${index}].price`}
                  className={cn(
                    "w-1/3 py-4 px-5 mr-4",
                    "border border-primary-default rounded-xl shadow-md",
                    "focus:outline-none focus:border-2 focus:border-primary-default",
                    "disabled:outline-none disabled:border-1 disabled:border-grey-default disabled:opacity-60"
                  )}
                />
                <div
                  className={cn(
                    "flex cursor-pointer h-full",
                    "active:transform active:scale-95",
                    "hover:opacity-80"
                  )}
                  onClick={() => arrayHelpers.remove(index)}
                >
                  <RemoveIcon />
                  <Text className="font-bold">{t("common.remove")}</Text>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
          <div className={cn("flex cursor-pointer")}>
            <AddIcon />
            <Text
              className="font-bold"
              onClick={() => arrayHelpers.push({ name: "", price: 0 })}
            >
              {t("common.insert")}
            </Text>
          </div>
        </>
      )}
    </FieldArray>
  );
}

export default OptionalProducts;
