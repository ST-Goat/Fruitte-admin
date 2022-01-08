import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import OptionalProducts, { OptionalProductProps } from "./OptionalProducts";
import BoxEditor from "./BoxEditor";

import {
  NewActivityData,
  ExistedActivityData,
  createNewActivityByFarmId,
  updateExistedActivityByFarmId,
  deleteFarmActivity,
} from "services/farmActivity";
import { farmDetailUrl } from "routes";
import { HttpStatus } from "shared/comom.enum";

type FieldItem = {
  id: string;
  keyLabel: string;
  name: string;
  type?: string;
  component: React.FC<InputProps & UploadImageProps & OptionalProductProps>;
};

const fields: Array<FieldItem> = [
  {
    id: "field-name",
    keyLabel: "pages.farmActivity.activityName",
    name: "name",
    component: Input,
  },
  {
    id: "field-images",
    keyLabel: "common.images",
    name: "activityImages",
    component: UploadImages,
  },
  {
    id: "field-one-person",
    keyLabel: "pages.farmManagement.perPerson",
    name: "oneMemberPrice",
    type: "number",
    component: Input,
  },
  {
    id: "field-two-person",
    keyLabel: "pages.farmManagement.twoPerson",
    name: "twoMembersPrice",
    type: "number",
    component: Input,
  },
  {
    id: "field-three-person",
    keyLabel: "pages.farmManagement.threePerson",
    name: "threeMembersPrice",
    type: "number",
    component: Input,
  },
  {
    id: "field-four-person",
    keyLabel: "pages.farmManagement.fourPerson",
    name: "fourMembersPrice",
    type: "number",
    component: Input,
  },
  {
    id: "field-optional-products",
    keyLabel: "pages.farmActivity.optionalProducts",
    name: "activityAdditionalServices",
    component: OptionalProducts,
  },
  {
    id: "field-duration",
    keyLabel: "pages.farmActivity.duration",
    name: "duration",
    type: "number",
    component: Input,
  },
  {
    id: "field-materials",
    keyLabel: "pages.farmActivity.materials",
    name: "note",
    component: Input,
  },
  {
    id: "field-description",
    keyLabel: "pages.farmActivity.briefDescription",
    name: "description",
    component: BoxEditor,
  },
  {
    id: "field-information",
    keyLabel: "pages.farmActivity.information",
    name: "info",
    component: BoxEditor,
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
  return (
    <item.component
      id={item.id}
      name={item.name}
      fieldValue={value}
      setFieldValue={setFieldValue}
      type={item.type ?? "text"}
      placeholder="input any thing here..."
    />
  );
};

const initialValues: NewActivityData = {
  name: "",
  description: "",
  info: "",
  note: "",
  duration: 0,
  oneMemberPrice: 0,
  twoMembersPrice: 0,
  threeMembersPrice: 0,
  fourMembersPrice: 0,
  activityImages: [],
  activityAdditionalServices: [],
};
function ActivityFormItem() {
  const { t } = useTranslation();
  const history = useHistory();
  const { farmId, activityId }: { farmId: string; activityId: string } =
    useParams();
  const [initialFormData, setInitialFormData] = useState(initialValues);

  const isCreate = useMemo(() => activityId === "create", [activityId]);

  useEffect(() => {
    if (!isCreate) {
      //fetch data with activity id
      // setInitialFormData with response
    }
  }, [isCreate]);

  const handleSubmit = async (values: any) => {
    const newData: { [key: string]: any } = {
      name: values.name,
      description: values.description,
      info: values.info,
      note: values.note,
      duration: Number(values.duration),
      oneMemberPrice: Number(values.oneMemberPrice),
      twoMembersPrice: Number(values.twoMembersPrice),
      threeMembersPrice: Number(values.threeMembersPrice),
      fourMembersPrice: Number(values.fourMembersPrice),
    };
    if (isCreate) {
      newData.activityImages = values.activityImages;
      newData.activityAdditionalServices = values.activityAdditionalServices;
      const response = await createNewActivityByFarmId({
        farmId: farmId,
        data: newData as NewActivityData,
      });
      if (response.status === HttpStatus.OK) {
        history.push(`${farmDetailUrl}/${farmId}`);
      }
    } else {
      // put new data
      newData.activityImages = values.activityImages;
      newData.newActivityAdditionalServices = [];
      newData.editActivityAdditionalServices = [];
      newData.delActivityAdditionalServices = [];
      const response = await updateExistedActivityByFarmId({
        farmId: farmId,
        activityId: activityId,
        data: newData as ExistedActivityData,
      });
    }
  };

  const handleDeleteActivity = async () => {
    await deleteFarmActivity({
      farmId: farmId,
      activityId: activityId,
    });
  };
  return (
    <Formik initialValues={initialFormData} onSubmit={handleSubmit}>
      {({ values, handleSubmit, setFieldValue }: FormikProps<any>) => (
        <Form>
          <Grid container item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LeftHeader />
              </Grid>
              <RowStyled
                leftContent={
                  <Text className={cn("text-lg font-bold")}>
                    {t("pages.farmActivity.title")}
                  </Text>
                }
                rightContent={
                  <div className="flex justify-end">
                    {!isCreate && (
                      <DeleteIcon
                        onClick={handleDeleteActivity}
                        sx={{
                          cursor: "pointer",
                          "&:active": {
                            transform: "scale(0.8)",
                          },
                        }}
                      />
                    )}
                  </div>
                }
              />
              <Grid item xs={12}>
                <div className="border-b-2 border-grey-default" />
              </Grid>
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
                  <ButtonCustomizer className="w-36">
                    {t("common.save")}
                  </ButtonCustomizer>
                  <ButtonCustomizer className="w-36 ml-4" color="secondary">
                    {t("common.cancel")}
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
