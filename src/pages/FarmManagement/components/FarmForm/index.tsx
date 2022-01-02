import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, FormikProps } from "formik";
import { Link } from "react-router-dom";
import { difference } from "lodash";

import InputWithLabel, {
  MIN_LEFT_WIDTH,
} from "pages/common/Formik/Input/InputWithLabel";
import Text from "pages/common/components/Text";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonCustomizer from "pages/common/Button";

import { farmManagementUrl } from "routes";

import { createNewFarm, updateFarmWithData } from "services/farmManagement";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useAppDispatch } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";

const ListField = [
  {
    id: "farmName__field",
    keyLabel: "pages.farmManagement.farmName",
    name: "name",
    type: "text",
  },
  {
    id: "email__field",
    keyLabel: "common.email",
    name: "email",
    type: "text",
  },
  {
    id: "phoneNumber__field",
    keyLabel: "common.phoneNumber",
    name: "phone",
    type: "text",
  },
  {
    id: "address__field",
    keyLabel: "common.address",
    name: "address",
    type: "text",
  },
  {
    id: "settlementCycle__field",
    keyLabel: "pages.farmManagement.settlementCycle",
    name: "settlementCycle",
    type: "text",
  },
  {
    id: "accountHolder__field",
    keyLabel: "pages.farmManagement.accountHolder",
    name: "accountHolder",
    type: "text",
  },
  {
    id: "nameOfBank__field",
    keyLabel: "pages.farmManagement.nameOfBank",
    name: "bankName",
    type: "text",
  },
  {
    id: "accountNumber__field",
    keyLabel: "pages.farmManagement.accountNumber",
    name: "accountNumber",
    type: "text",
  },
  {
    id: "settlementRate__field",
    keyLabel: "pages.farmManagement.settlementRate",
    name: "incomeRate",
    type: "text",
  },
  {
    id: "farmUser__field",
    keyLabel: "pages.farmManagement.farmUser",
    name: "farmers",
    type: "text",
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
                if (item.id === "farmUser__field") {
                  return (
                    <div className="flex items-center mb-8 w-2/3" key={item.id}>
                      <div className="flex-grow">
                        <InputWithLabel
                          id={item.id}
                          name={item.name}
                          type={item.type}
                          label={t(item.keyLabel)}
                          disabled={isCreate ? false : fieldDisabled[item.id]}
                          onClickIcon={() => handleOnClickIcon(item)}
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
                      <div className="px-4">
                        <RemoveCircleIcon
                          color="action"
                          fontSize="large"
                          sx={styleIconAction}
                        />
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="mb-8" key={item.id}>
                    <InputWithLabel
                      id={item.id}
                      name={item.name}
                      type={item.type}
                      label={t(item.keyLabel)}
                      onClickIcon={() => handleOnClickIcon(item)}
                      disabled={isCreate ? false : fieldDisabled[item.id]}
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
              <div className="w-full flex justify-start items-center">
                <div
                  className="mr-16"
                  style={{ minWidth: MIN_LEFT_WIDTH }}
                ></div>
                <div>
                  <AddCircleOutlineIcon
                    color="action"
                    fontSize="large"
                    sx={styleIconAction}
                  />
                </div>
                <Text className="px-4 text-xl">
                  {t("pages.farmManagement.addFarmUser")}
                </Text>
              </div>
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
