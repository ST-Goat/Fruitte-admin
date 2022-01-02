import { Formik, Form, FormikProps } from "formik";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import LeftHeader from "../LeftHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Text from "pages/common/components/Text";
import Input, { InputProps } from "pages/common/Formik/Input";
import ButtonCustomizer from "pages/common/Button";
import UploadImages, { UploadImageProps } from "./UploadImages";
import EditIcon from "@mui/icons-material/Edit";
import OptionalProducts, { OptionalProductProps } from "./OptionalProducts";
import BoxEditor from "./BoxEditor";
import { useState } from "react";

type FieldItem = {
  id: string;
  keyLabel: string;
  name: string;
  component: React.FC<InputProps & UploadImageProps & OptionalProductProps>;
  typeComponent: "input-with-control" | "image-upload" | "optional-products";
};

const fields: Array<FieldItem> = [
  {
    id: "field-name",
    keyLabel: "체험 명",
    name: "name",
    component: Input,
    typeComponent: "input-with-control",
  },
  {
    id: "field-images",
    keyLabel: "이미지",
    name: "images",
    component: UploadImages,
    typeComponent: "image-upload",
  },
  {
    id: "field-one-person",
    keyLabel: "1인 요금",
    name: "rate1",
    component: Input,
    typeComponent: "input-with-control",
  },
  {
    id: "field-two-person",
    keyLabel: "2인 요금",
    name: "rate2",
    component: Input,
    typeComponent: "input-with-control",
  },
  {
    id: "field-three-person",
    keyLabel: "3인 요금",
    name: "rate3",
    component: Input,
    typeComponent: "input-with-control",
  },
  {
    id: "field-four-person",
    keyLabel: "4인 요금",
    name: "rate4",
    component: Input,
    typeComponent: "input-with-control",
  },
  {
    id: "field-optional-products",
    keyLabel: "옵션 상품",
    name: "optionalProducts",
    component: OptionalProducts,
    typeComponent: "optional-products",
  },
  {
    id: "field-duration",
    keyLabel: "체험 시간",
    name: "timeActivity",
    component: Input,
    typeComponent: "input-with-control",
  },
  {
    id: "field-materials",
    keyLabel: "준비물",
    name: "materials",
    component: Input,
    typeComponent: "input-with-control",
  },
  {
    id: "field-description",
    keyLabel: "요약 설명",
    name: "description",
    component: BoxEditor,
    typeComponent: "input-with-control",
  },
  {
    id: "field-information",
    keyLabel: "상세 정보",
    name: "information",
    component: BoxEditor,
    typeComponent: "input-with-control",
  },
];

const MAGIRN_LEFT = "ml-16";
const MAGIRN_RIGHT = "mr-16";

const RowStyled = ({
  leftContent,
  rightContent,
}: {
  leftContent: any;
  rightContent: any;
}) => (
  <>
    <Grid item xs={2}>
      <div className={cn(MAGIRN_LEFT)}>{leftContent}</div>
    </Grid>
    <Grid item xs={10}>
      <div className={cn(MAGIRN_RIGHT)}>{rightContent}</div>
    </Grid>
  </>
);

const Field = ({
  item,
  value,
  setFieldValue,
}: {
  item: FieldItem;
  value: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}) => {
  const [disabled, setDisabled] = useState(true);
  return (
    <item.component
      id={item.id}
      name={item.name}
      fieldValue={value}
      setFieldValue={setFieldValue}
      type="text"
      placeholder="input any thing here..."
      onClickIcon={() => setDisabled(!disabled)}
      onBlur={() => setDisabled(true)}
      disabled={disabled}
      EndIcon={
        item.typeComponent === "input-with-control" ? (
          <EditIcon
            color="action"
            fontSize="large"
            sx={{
              "&": {
                cursor: "pointer",
              },
              "&:active": {
                transform: "scale(0.8)",
              },
            }}
          />
        ) : undefined
      }
    />
  );
};

const initialValues = {
  name: "",
  images: null,
  rate1: "10,000 원",
  rate2: "20,000 원",
  rate3: "30,000 원",
  rate4: "50,000 원",
  optionalProducts: [],
  timeActivity: "",
  materials: "",
  description: "",
  information: "",
};
function ActivityFormItem() {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleSubmit, setFieldValue }: FormikProps<any>) => (
        <Form>
          <Grid container item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LeftHeader />
              </Grid>
              <Grid item xs={12}>
                <div className="border-b-2 border-grey-default">
                  <Text className={cn(MAGIRN_LEFT, "text-lg font-bold")}>
                    체험
                  </Text>
                </div>
              </Grid>
              <RowStyled
                leftContent={
                  <Text className={cn("text-lg font-bold")}>체험 1</Text>
                }
                rightContent={
                  <DeleteIcon
                    sx={{
                      cursor: "pointer",
                      "&:active": {
                        transform: "scale(0.8)",
                      },
                    }}
                  />
                }
              />
              {fields.map((item, i) => {
                return (
                  <RowStyled
                    key={item.id}
                    leftContent={
                      <Text className={cn("text-lg font-bold")}>
                        {t(item.keyLabel)}
                      </Text>
                    }
                    rightContent={
                      <Field
                        item={item}
                        value={values[item.name]}
                        setFieldValue={setFieldValue}
                      />
                    }
                  />
                );
              })}
              <Grid item xs={12}>
                <div className="flex justify-center mt-8 mb-32">
                  <ButtonCustomizer className="w-36">저장</ButtonCustomizer>
                  <ButtonCustomizer className="w-36 ml-4" color="secondary">
                    취소
                  </ButtonCustomizer>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default ActivityFormItem;
