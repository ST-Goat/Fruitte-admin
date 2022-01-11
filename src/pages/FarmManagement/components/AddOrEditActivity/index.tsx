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
  ActivityAddition,
  ExistedActivityData,
  createNewActivityByFarmId,
  updateExistedActivityByFarmId,
  deleteFarmActivity,
  fetchFarmActivityDetail,
} from "services/farmActivity";
import { farmDetailUrl } from "routes";
import { SNACKBAR_VARIANTS } from "shared/comom.enum";
import { differenceBy, isEqual } from "lodash";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { useAppDispatch } from "utilities";

type FieldItem = {
  id: string;
  keyLabel: string;
  name: string;
  type?: string;
  validate?: (text: string) => string;
  component: React.FC<InputProps & UploadImageProps & OptionalProductProps>;
};

const validateInterger = (text: string) => {
  let error = "";
  if (!/^\d+$/g.test(text)) error = "This must be number and integer number!";
  return error;
};

const validatePositiveNumber = (text: string) => {
  let error = "";
  if (!text || Number(text) < 0)
    error = "This number must be a positive number!";
  return error;
};

const requiredField = (text: string) => {
  let error = "";
  if (!text) error = "This field is required!";
  return error;
};

const fields: Array<FieldItem> = [
  {
    id: "field-name",
    keyLabel: "pages.farmActivity.activityName",
    name: "name",
    validate: requiredField,
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
    validate: validatePositiveNumber,
    component: Input,
  },
  {
    id: "field-two-person",
    keyLabel: "pages.farmManagement.twoPerson",
    name: "twoMembersPrice",
    type: "number",
    validate: validatePositiveNumber,
    component: Input,
  },
  {
    id: "field-three-person",
    keyLabel: "pages.farmManagement.threePerson",
    name: "threeMembersPrice",
    type: "number",
    validate: validatePositiveNumber,
    component: Input,
  },
  {
    id: "field-four-person",
    keyLabel: "pages.farmManagement.fourPerson",
    name: "fourMembersPrice",
    type: "number",
    validate: validatePositiveNumber,
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
    validate: validateInterger,
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

const FieldWrapper = ({ item, value }: { item: FieldItem; value: any }) => {
  return (
    <item.component
      id={item.id}
      name={item.name}
      fieldValue={value}
      validate={item.validate}
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
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { farmId, activityId }: { farmId: string; activityId: string } =
    useParams();
  const [initialFormData, setInitialFormData] =
    useState<NewActivityData>(initialValues);
  const [isErrorActivityDetail, setIsErrorActivityDetail] = useState(false);

  const isCreate = useMemo(() => activityId === "create", [activityId]);

  const getFarmActivityDetails = async (id: string) => {
    try {
      const { farmActivity: activityResponse } = await fetchFarmActivityDetail({
        activityId: id,
      });
      setInitialFormData({
        name: activityResponse.name,
        description: activityResponse.description,
        info: activityResponse.activityInfo,
        note: activityResponse.note,
        duration: activityResponse.duration,
        oneMemberPrice: activityResponse.oneMemberPrice,
        twoMembersPrice: activityResponse.twoMembersPrice,
        threeMembersPrice: activityResponse.threeMembersPrice,
        fourMembersPrice: activityResponse.fourMembersPrice,
        activityImages: [],
        activityAdditionalServices: activityResponse.activityAdditionService,
      });
    } catch (error) {
      setIsErrorActivityDetail(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      //fetch data with activity id and setInitialFormData with response
      getFarmActivityDetails(activityId);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    try {
      if (isCreate) {
        // create new data
        newData.activityImages = values.activityImages;
        newData.activityAdditionalServices = values.activityAdditionalServices;
        await createNewActivityByFarmId({
          farmId: farmId,
          data: newData as NewActivityData,
        });
      } else {
        // put new data
        const listOptionalProducts = values.activityAdditionalServices;
        const editList: ActivityAddition[] = [];
        const newList: ActivityAddition[] = [];
        listOptionalProducts.forEach((option: any) => {
          if (Boolean(option.id)) {
            const match = initialFormData.activityAdditionalServices.find(
              (item) => item.id === option.id
            );
            if (match && !isEqual(option, match)) editList.push(option);
            return;
          }
          newList.push(option);
        });
        const delList: ActivityAddition[] = differenceBy(
          initialFormData.activityAdditionalServices,
          listOptionalProducts,
          "id"
        );
        newData.activityImages = values.activityImages;
        newData.newActivityAdditionalServices = newList.map((value: any) => ({
          name: value.name,
          price: value.price,
        }));
        newData.editActivityAdditionalServices = editList.map((value: any) => ({
          id: value.id,
          name: value.name,
          price: value.price,
        }));
        newData.delActivityAdditionalServices = delList.map(
          (value: any) => value.id
        );
        await updateExistedActivityByFarmId({
          farmId: farmId,
          activityId: activityId,
          data: newData as ExistedActivityData,
        });
      }
      history.push(`${farmDetailUrl}/${farmId}`);
      dispatch(
        enqueueSnackbar({
          message: "Success!",
          variant: SNACKBAR_VARIANTS.SUCCESS,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteActivity = async () => {
    await deleteFarmActivity({
      farmId: farmId,
      activityId: activityId,
    });
  };

  if (isLoading) return <>...Loading</>;
  if (!initialFormData || isErrorActivityDetail)
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LeftHeader />
        </Grid>
        <Grid item xs={12}>
          <div className="text-center text-xl font-bold text-red-600">
            Something was wrong <br />
            Can't find this activity's information, it is not exist or it is
            deleted!
          </div>
        </Grid>
      </Grid>
    );
  return (
    <Formik initialValues={initialFormData} onSubmit={handleSubmit}>
      {({ values }: FormikProps<any>) => (
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
                      <Text className={cn("text-lg font-bold", "mt-4")}>
                        {t(item.keyLabel)}
                      </Text>
                    }
                    rightContent={
                      <FieldWrapper item={item} value={values[item.name]} />
                    }
                  />
                );
              })}
              <Grid item xs={12}>
                <div className="flex justify-center mt-8 mb-32">
                  <ButtonCustomizer type="submit" className="w-36">
                    {t("common.save")}
                  </ButtonCustomizer>
                  <ButtonCustomizer
                    type="button"
                    className="w-36 ml-4"
                    color="secondary"
                  >
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
