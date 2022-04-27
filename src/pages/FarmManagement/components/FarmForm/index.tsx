import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, FormikProps } from "formik";
import { Link } from "react-router-dom";
import { difference, filter } from "lodash";

import InputWithLabel from "pages/common/Formik/Input/InputWithLabel";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import SelectAdvance from "./SelectAdvance";

import { farmManagementUrl } from "routes";

import {
  createNewFarm,
  FarmerItem,
  updateFarmWithData,
} from "services/farmManagement";
import { fetchUserList, User } from "services/userManagement";
import { DISTRICTS, HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useAppDispatch } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { validatePhone, validateEmail } from "utilities/helper";

const validateRequired = (text: string) => {
  let error;
  if (!text) {
    error = "This field is required!";
  }
  return error;
};

const validateSettlementRate = (num: number) => {
  let error;
  if (num < 0 || num > 100) error = "0~100사이를 입력해 주세요";
  return error;
};

const ListField = [
  {
    id: "farmName__field",
    keyLabel: "pages.farmManagement.farmName",
    name: "name",
    type: "text",
    validate: validateRequired,
    component: InputWithLabel,
  },
  {
    id: "email__field",
    keyLabel: "common.email",
    name: "email",
    type: "text",
    validate: validateEmail,
    component: InputWithLabel,
  },
  {
    id: "phoneNumber__field",
    keyLabel: "common.phoneNumber",
    name: "phone",
    type: "text",
    validate: validatePhone,
    component: InputWithLabel,
  },
  {
    id: "address__field",
    keyLabel: "common.address",
    name: "address",
    type: "text",
    component: InputWithLabel,
  },
  {
    id: "district__field",
    keyLabel: "common.district",
    name: "districtName",
    type: "select",
    validate: validateRequired,
    component: SelectAdvance,
  },
  {
    id: "settlementCycle__field",
    keyLabel: "pages.farmManagement.settlementCycle",
    name: "settlementCycle",
    type: "select",
    component: SelectAdvance,
  },
  {
    id: "accountHolder__field",
    keyLabel: "pages.farmManagement.accountHolder",
    name: "accountHolder",
    type: "text",
    component: InputWithLabel,
  },
  {
    id: "nameOfBank__field",
    keyLabel: "pages.farmManagement.nameOfBank",
    name: "bankName",
    type: "text",
    component: InputWithLabel,
  },
  {
    id: "accountNumber__field",
    keyLabel: "pages.farmManagement.accountNumber",
    name: "accountNumber",
    type: "text",
    component: InputWithLabel,
  },
  {
    id: "settlementRate__field",
    keyLabel: "pages.farmManagement.settlementRate",
    name: "incomeRate",
    type: "number",
    validate: validateSettlementRate,
    component: InputWithLabel,
  },
  {
    id: "farmUser__field",
    keyLabel: "pages.farmManagement.farmUser",
    name: "farmers",
    type: "select",
    component: SelectAdvance,
  },
];

const SubmitOrCancel = ({
  t,
  disabled,
}: {
  t: (key: string) => string;
  disabled: boolean;
}) => {
  return (
    <>
      <ButtonCustomizer
        disabled={disabled}
        type="submit"
        style={{ minWidth: "8rem" }}
      >
        {t("common.produce")}
      </ButtonCustomizer>
      <Link to={farmManagementUrl}>
        <ButtonCustomizer
          style={{ minWidth: "8rem", marginLeft: "2rem" }}
          color="secondary"
          disabled={disabled}
        >
          {t("common.cancel")}
        </ButtonCustomizer>
      </Link>
    </>
  );
};

function FarmForm({
  isCreate,
  initData,
  farmId,
}: {
  isCreate: boolean;
  initData: any;
  farmId?: any;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);
  const [allUsers, setAllUsers] = useState<
    Array<{ id: number; label: string; value: any }>
  >([]);
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  const settlementCycleOptions = [
    { label: t("pages.farmManagement.twoWeeks"), value: 15 },
    { label: t("pages.farmManagement.fourWeeks"), value: 1 },
  ];

  const districtOptions = [
    { label: t("pages.farmManagement.seoul"), value: DISTRICTS.seoul },
    { label: t("pages.farmManagement.gyeonggi"), value: DISTRICTS.gyeonggi },
    { label: t("pages.farmManagement.gangwon"), value: DISTRICTS.gangwon },
    {
      label: t("pages.farmManagement.chung_cheong"),
      value: DISTRICTS.chung_cheong,
    },
    {
      label: t("pages.farmManagement.chungcheongnam"),
      value: DISTRICTS.chungcheongnam,
    },
    { label: t("pages.farmManagement.jeollabuk"), value: DISTRICTS.jeollabuk },
    { label: t("pages.farmManagement.jeollanam"), value: DISTRICTS.jeollanam },
    {
      label: t("pages.farmManagement.gyeongsangbuk"),
      value: DISTRICTS.gyeongsangbuk,
    },
    {
      label: t("pages.farmManagement.gyeongsangnam"),
      value: DISTRICTS.chungcheongnam,
    },
    { label: t("pages.farmManagement.jeju"), value: DISTRICTS.jeju },
  ];

  let ignore = false;
  useEffect(() => {
    async function fetchAllUsers() {
      setIsLoadingInit(true);
      try {
        const response = await fetchUserList({});
        if (!ignore)
          setAllUsers(
            response.content.map((user: User) => ({
              id: user.id,
              label: !user.name ? user.email : user.name,
              value: user.id,
            }))
          );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingInit(false);
      }
    }
    fetchAllUsers();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ignore = true;
    };
  }, []);

  const handleSubmit = async (values: any) => {
    setIsLoadingProcess(true);
    const commonData = {
      accountHolder: values.accountHolder,
      accountNumber: values.accountNumber,
      address: values.address,
      bankName: values.bankName,
      description: "",
      districtName: values.districtName.value,
      email: values.email,
      incomeRate: JSON.parse(values.incomeRate),
      name: values.name,
      phone: values.phone,
      settlementCycle: JSON.parse(values.settlementCycle?.value),
    };
    const listIdFamerInits = initData.farmers.map((u: FarmerItem) => u.id);
    const listIdFamerValues = values.farmers.map((u: any) => u.value);
    try {
      if (isCreate) {
        // post with create
        const response = await createNewFarm({
          data: {
            ...commonData,
            userIds: listIdFamerValues,
          },
        });
        if (response.status === HttpStatus.OK) {
          dispatch(
            enqueueSnackbar({
              message: "Success!",
              variant: SNACKBAR_VARIANTS.SUCCESS,
            })
          );
        }
      } else {
        const newUserIds = difference(listIdFamerValues, listIdFamerInits);
        const deleteUserIds = difference(listIdFamerInits, listIdFamerValues);
        const response = await updateFarmWithData({
          farmId: farmId,
          data: {
            ...commonData,
            newUserIds: newUserIds as number[],
            deleteUserIds: deleteUserIds as number[],
          },
        });
        if (response.status === HttpStatus.OK) {
          dispatch(
            enqueueSnackbar({
              message: "Success!",
              variant: SNACKBAR_VARIANTS.SUCCESS,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingProcess(false);
    }
  };

  const getOptionForSelectField = (fieldId: string) => {
    switch (fieldId) {
      case "settlementCycle__field":
        return settlementCycleOptions;
      case "farmUser__field":
        return allUsers;
      case "district__field":
        return districtOptions;
      default:
        return [];
    }
  };

  const getInitialValues = useMemo(() => {
    const listIdInitFamers = initData.farmers.map(
      (item: FarmerItem) => item.id
    );
    return {
      ...initData,
      settlementCycle: settlementCycleOptions.find(
        (item) => item.value === initData.settlementCycle
      ),
      districtName: districtOptions.find(
        (i) => i.value === initData.districtName
      ),
      farmers: filter(allUsers, (o) => listIdInitFamers.includes(o.id)),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData, allUsers]);

  if (isLoadingInit) return <>...Loading</>;
  return (
    <div className="px-16">
      <Text className="m-auto text-center font-bold text-4xl">
        {t("pages.farmManagement.farmName")}
      </Text>
      <div className="w-full mt-16">
        <Formik initialValues={getInitialValues} onSubmit={handleSubmit}>
          {(props: FormikProps<any>) => (
            <Form>
              {ListField.map((item) => {
                return (
                  <div className="mb-8" key={item.id}>
                    <item.component
                      id={item.id}
                      name={item.name}
                      type={item.type}
                      label={
                        item.id === "settlementRate__field"
                          ? `${t(item.keyLabel)}(%)`
                          : t(item.keyLabel)
                      }
                      validate={!item.validate ? "" : item.validate}
                      multiple={item.id === "farmUser__field"}
                      disableCloseOnSelect={item.id === "farmUser__field"}
                      options={getOptionForSelectField(item.id)}
                    />
                  </div>
                );
              })}
              <div className="flex justify-end items-center w-full mt-16">
                <SubmitOrCancel disabled={isLoadingProcess} t={t} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FarmForm;
