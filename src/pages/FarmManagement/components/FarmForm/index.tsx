import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, FormikProps } from "formik";
import { Link } from "react-router-dom";
import { difference } from "lodash";

import InputWithLabel from "pages/common/Formik/Input/InputWithLabel";
import Text from "pages/common/components/Text";
import EditIcon from "@mui/icons-material/Edit";
import ButtonCustomizer from "pages/common/Button";

import { farmManagementUrl } from "routes";

import { createNewFarm, updateFarmWithData } from "services/farmManagement";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useAppDispatch } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";
import SelectAdvance from "./SelectAdvance";

const ListField = [
  {
    id: "farmName__field",
    keyLabel: "pages.farmManagement.farmName",
    name: "name",
    type: "text",
    component: InputWithLabel,
  },
  {
    id: "email__field",
    keyLabel: "common.email",
    name: "email",
    type: "text",
    component: InputWithLabel,
  },
  {
    id: "phoneNumber__field",
    keyLabel: "common.phoneNumber",
    name: "phone",
    type: "text",
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
    type: "text",
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

const styleIconAction = () => ({
  "&": {
    cursor: "pointer",
  },
  "&:active": {
    transform: "scale(0.8)",
  },
});

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

const fakeOwners = [
  { label: "owner 1", value: 0 },
  { label: "owner 2", value: 1 },
  { label: "owner 3", value: 2 },
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
  const [fieldDisabled, setFieldDisabled] = useState<{
    [key: string]: boolean;
  }>(
    ListField.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: isCreate ? false : true,
      }),
      {}
    )
  );
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);

  const settlementCycleOptions = [
    { label: t("pages.farmManagement.twoWeeks"), value: 15 },
    { label: t("pages.farmManagement.fourWeeks"), value: 1 },
  ];

  const ownerOptions = fakeOwners;

  const handleOnClickIcon = (item: { id: string }) => {
    if (!isCreate) {
      setFieldDisabled((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    }
  };

  const handleSubmit = async (values: any) => {
    setIsLoadingProcess(true);
    const commonData = {
      accountHolder: values.accountHolder,
      accountNumber: values.accountNumber,
      address: values.address,
      bankName: values.bankName,
      description: "",
      email: values.email,
      incomeRate: Number(values.incomeRate),
      name: values.name,
      phone: values.phone,
      settlementCycle: Number(values.settlementCycle),
    };
    if (isCreate) {
      // post with create
      const response = await createNewFarm({
        data: {
          ...commonData,
          userIds: values.farmers,
        },
      });
    } else {
      const newUserIds = difference(values.farmers, initData.farmers);
      const deleteUserIds = difference(initData.farmers, values.farmers);
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
    setIsLoadingProcess(false);
  };

  const getOptionForSelectField = (fieldId: string) => {
    switch (fieldId) {
      case "settlementCycle__field":
        return settlementCycleOptions;
      case "farmUser__field":
        return ownerOptions;
      default:
        return [];
    }
  };

  return (
    <div className="px-16">
      <Text className="m-auto text-center font-bold text-4xl">
        {t("pages.farmManagement.farmName")}
      </Text>
      <div className="w-full mt-16">
        <Formik initialValues={initData} onSubmit={handleSubmit}>
          {(props: FormikProps<any>) => (
            <Form>
              {ListField.map((item) => {
                return (
                  <div className="mb-8" key={item.id}>
                    <item.component
                      id={item.id}
                      name={item.name}
                      type={item.type}
                      label={t(item.keyLabel)}
                      multiple={item.id === "farmUser__field"}
                      disableCloseOnSelect={item.id === "farmUser__field"}
                      options={getOptionForSelectField(item.id)}
                      onClickIcon={() => handleOnClickIcon(item)}
                      disabled={
                        isCreate || item.type === "select"
                          ? false
                          : fieldDisabled[item.id]
                      }
                      EndIcon={
                        !isCreate && (
                          <EditIcon
                            color="action"
                            fontSize="large"
                            sx={styleIconAction}
                          />
                        )
                      }
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
