import { useTranslation } from "react-i18next";
import { Form, Formik, FormikProps } from "formik";
import InputWithLabel, {
  MIN_LEFT_WIDTH,
} from "pages/common/Formik/Input/InputWithLabel";
import Text from "pages/common/components/Text";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";

const ListField = [
  {
    id: "farmName__field",
    keyLabel: "pages.farmManagement.farmName",
    name: "farmName",
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
    id: "paymentStatus__field",
    keyLabel: "pages.farmManagement.paymentStatus",
    name: "paymentStatus",
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
    name: "nameOfBank",
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
    name: "settlementRate",
    type: "text",
  },
  {
    id: "farmUser__field",
    keyLabel: "pages.farmManagement.farmUser",
    name: "farmUser",
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

const initialValues = {
  farmName: "",
  email: "",
  phone: "",
  address: "",
  settlementCycle: "",
  paymentStatus: "",
  accountHolder: "",
  nameOfBank: "",
  accountNumber: "",
  settlementRate: "",
  farmUser: "",
};

function AddOrEdit({ isCreate, data }: { isCreate: boolean; data?: any }) {
  const { t } = useTranslation();
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

  const handleOnClickIcon = (item: { id: string }) => {
    if (!isCreate) {
      setFieldDisabled((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    }
  };

  return (
    <div className="px-16">
      <Text className="m-auto text-center font-bold text-4xl">
        {t("pages.farmManagement.farmName")}
      </Text>
      <div className="w-full mt-16">
        <Formik initialValues={data ?? initialValues} onSubmit={() => {}}>
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
                        <EditIcon
                          color="action"
                          fontSize="large"
                          sx={styleIconAction}
                        />
                      }
                    />
                  </div>
                );
              })}
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-full flex justify-start items-center">
        <div className="mr-16" style={{ minWidth: MIN_LEFT_WIDTH }}></div>
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
    </div>
  );
}

export default AddOrEdit;
