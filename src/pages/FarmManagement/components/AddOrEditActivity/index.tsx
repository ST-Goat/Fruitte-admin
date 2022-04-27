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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmModal from "pages/common/ConfirmModal";

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
import { differenceBy, difference, isEqual, without } from "lodash";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { useAppDispatch } from "utilities";
import { uploadFiles } from "services/upload";

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
  if (!/^\d+$/g.test(text)) error = "이 숫자는 양수여야 합니다!";
  return error;
};

const validatePositiveNumber = (text: string) => {
  let error = "";
  if (!text || Number(text) < 0)
    error = "이 숫자는 양수여야 합니다!";
  return error;
};

const requiredField = (text: string) => {
  let error = "";
  if (!text) error = "필수정보 입니다";
  return error;
};

const validateMaxEnrolment = (text: string) => {
  let error = "";
  if (!text || Number(text) < 0 || Number(text) > 4)
    error = "이 숫자는 0보다 커야 하고 최대값은 4입니다.";
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
    id: "field-open-days",
    keyLabel: "pages.farmActivity.openDays",
    name: "openDays",
    component: Input,
  },
  {
    id: "field-max-enrolment",
    keyLabel: "pages.farmActivity.maxEnrolment",
    name: "maxEnrolment",
    type: "number",
    validate: validateMaxEnrolment,
    component: Input,
  },
  {
    id: "field-one-person",
    keyLabel: "pages.farmManagement.perPerson",
    name: "servicePrice[1]",
    type: "number",
    validate: validatePositiveNumber,
    component: Input,
  },
  {
    id: "field-two-person",
    keyLabel: "pages.farmManagement.twoPerson",
    name: "servicePrice[2]",
    type: "number",
    validate: validatePositiveNumber,
    component: Input,
  },
  {
    id: "field-three-person",
    keyLabel: "pages.farmManagement.threePerson",
    name: "servicePrice[3]",
    type: "number",
    validate: validatePositiveNumber,
    component: Input,
  },
  {
    id: "field-four-person",
    keyLabel: "pages.farmManagement.fourPerson",
    name: "servicePrice[4]",
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

const FieldWrapper = ({
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
      validate={item.validate}
      type={item.type ?? "text"}
      placeholder="input any thing here..."
    />
  );
};

const handleUploadImageAws3 = async (
  listImage: Array<any>,
  callback?: ({ loading }: { loading: boolean }) => void
): Promise<{ main: string; sub: string[] }> => {
  const result: any = {
    main: "",
    sub: [],
  };
  if (callback) callback({ loading: true });
  const response = await Promise.all(
    listImage.map((item) =>
      typeof item === "string"
        ? new Promise((resolve) => resolve(item))
        : uploadFiles({ file: item }).then((response) =>
          response.isSuccess ? response.data?.link : null
        )
    )
  ).finally(() => {
    if (callback) callback({ loading: false });
  });
  result.main = response[0];
  result.sub = response.slice(1);
  return result;
};

const initialValues: NewActivityData = {
  name: "",
  description: "",
  info: "",
  note: "",
  duration: 0,
  servicePrice: {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
  },
  openDays: "",
  maxEnrolment: 0,
  activityImages: [],
  activityAdditionalServices: [],
};
function ActivityFormItem() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
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
        servicePrice: activityResponse.servicePrice,
        activityImages: [
          activityResponse.mainPictureUrl,
          ...activityResponse.activityImages,
        ],
        openDays: activityResponse.openDays,
        maxEnrolment: Number(activityResponse.maxEnrolment),
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
      servicePrice: {
        "1": Number(values.servicePrice[1]),
        "2": Number(values.servicePrice[2]),
        "3": Number(values.servicePrice[3]),
        "4": Number(values.servicePrice[4]),
      },
      openDays: values.openDays,
      maxEnrolment: Number(values.maxEnrolment),
    };
    try {
      if (isCreate) {
        // create new data
        // handle upload image with Aws3
        const { main, sub } = await handleUploadImageAws3(
          values.activityImages,
          ({ loading }) => {
            setIsLoadingUpload(loading);
          }
        );
        newData.mainPictureUrl = main;
        newData.activityImages = sub;
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
        // handle upload image with Aws3
        // newData.activityImages = handleUploadImageAws3(values.activityImages);
        const { main, sub } = await handleUploadImageAws3(
          values.activityImages,
          ({ loading }) => {
            setIsLoadingUpload(loading);
          }
        );
        newData.mainPictureUrl = main;
        newData.activityImages = sub;
        newData.delImageLinks = difference(
          without(initialFormData.activityImages, main),
          sub
        );
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
    }).then((_) => {
      dispatch(
        enqueueSnackbar({
          message: "Success!",
          variant: SNACKBAR_VARIANTS.SUCCESS,
        })
      );
      history.push(`${farmDetailUrl}/${farmId}`);
    });
  };

  if (isLoading) return <>{t("common.loading")}</>;
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
    <>
      <Formik initialValues={initialFormData} onSubmit={handleSubmit}>
        {({ values, setFieldValue }: FormikProps<any>) => (
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
                          onClick={() => setIsOpenModal(true)}
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
                        <FieldWrapper
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingUpload}
      >
        <CircularProgress color="success" size={64} />
      </Backdrop>
      <ConfirmModal
        open={isOpenModal}
        handleAccepted={handleDeleteActivity}
        handleClose={() => setIsOpenModal(false)}
        title={t("pages.farmActivity.confirmDelete")}
      />
    </>
  );
}

export default ActivityFormItem;
