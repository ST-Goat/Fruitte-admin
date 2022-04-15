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
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useAppDispatch } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { validatePhone, validateEmail } from "utilities/helper";
import { CatchingPokemonSharp } from "@mui/icons-material";

const validateRequired = (text: string) => {
  let error;
  if (!text) {
    error = "This field is required!";
  }
  return error;
};

const validateSettlementRate = (num: number) => {
  let error;
  if (num < 0 || num > 100) error = "Percent must be between 0 and 100!";
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
    name: "district",
    type: "select",
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

// id must same value
const fakeFamers = [
  { id: 0, label: "fake famer 1", value: 0 },
  { id: 1, label: "fake famer 2", value: 1 },
  { id: 2, label: "fake famer 3", value: 2 },
];
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

  const settlementCycleOptions = [
    { label: t("pages.farmManagement.twoWeeks"), value: 15 },
    { label: t("pages.farmManagement.fourWeeks"), value: 1 },
  ];

  const districtOptions = [
    { label: t("pages.farmManagement.seoul"), value: "서울" },
    { label: t("pages.farmManagement.gyeonggi"), value: "경기도" },
    { label: t("pages.farmManagement.gangwon"), value: "강원도" },
    { label: t("pages.farmManagement.chung_cheong"), value: "충청북도" },
    { label: t("pages.farmManagement.chungcheongnam"), value: "충청남도" },
    { label: t("pages.farmManagement.jeollabuk"), value: "전라북도" },
    { label: t("pages.farmManagement.jeollanam"), value: "전라남도" },
    { label: t("pages.farmManagement.gyeongsangbuk"), value: "경상북도" },
    { label: t("pages.farmManagement.gyeongsangnam"), value: "경상남도" },
    { label: t("pages.farmManagement.jeju"), value: '제주도' },
  ]

  let ignore = false;
  useEffect(() => {
    async function fetchAllUsers() {
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
      }
    }
    fetchAllUsers();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ignore = true;
    };
  }, []);

  const handleSubmit = async (values: any) => {
    console.log({ values })
    setIsLoadingProcess(true);
    const commonData = {
      accountHolder: values.accountHolder,
      accountNumber: values.accountNumber,
      address: values.address,
      bankName: values.bankName,
      description: "",
      district: values.district.value,
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
      district: districtOptions.find(i => i.value === initData.district),
      farmers: filter(allUsers, (o) => listIdInitFamers.includes(o.id)),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData, allUsers]);
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
