import { useTranslation } from "react-i18next";
import { Form, Formik, FormikProps } from "formik";
import Input from "pages/common/Formik/Input";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import TextBox from "pages/common/Formik/TextBox";

const MIN_LEFT_WIDTH = "150px";
const FieldWithLabel = ({
  id,
  name,
  type,
  placeholder = "",
  label,
  ...props
}: {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  label: string;
} & { [key: string]: string }) => {
  return (
    <div className="flex flex-start items-center">
      <label
        style={{ minWidth: MIN_LEFT_WIDTH }}
        className="mr-16"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex-grow">
        <Input
          {...props}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const FeedbackBox = ({ t }: { t: (text: string) => string }) => {
  return (
    <>
      <div className="w-full flex justify-end">
        <hr style={{ minWidth: MIN_LEFT_WIDTH }} className="mr-16" />
        <div className="w-full">
          {/* ============= HEADER =============== */}
          <div className="flex mb-8">
            <Text
              style={{ lineHeight: "64px", height: "64px" }}
              className="flex-grow text-3xl text-center font-bold"
            >
              {t("pages.farmManagement.feedback")}
            </Text>
            <ButtonCustomizer className="flex flex-col items-center justify-center px-8 py-8 rounded-md">
              <p>{t("pages.farmManagement.complete")}</p>
              <p>{t("pages.farmManagement.process")}</p>
            </ButtonCustomizer>
          </div>
          {/* ================= FEEDBACK BOX ====================== */}
          <div className="w-full rounded-md border-2 border-grey-default">
            <Text className="py-4 px-4 pr-48">
              농장유저 : 이것은 피드백 입니다.이것은 피드백 입니다.이것은 피드백
              입니다.이것은 피드백 입니다.이것은 피드백 입니다.이것은 피드백
              입니다.이것은 피드백 입니다.이것은 피드백 입니다.이것은 피드백
              입니다. 2021/01/01 12:23
            </Text>
            <Text className="py-4 px-4 pl-48">
              프루떼 : 이것은 피드백 입니다.이것은 피드백 입니다.이것은 피드백
              입니다.이것은 피드백 입니다.이것은 피드백 입니다.이것은 피드백
              입니다.이것은 피드백 입니다.이것은 피드백 입니다.이것은 피드백
              입니다. 2021/01/01 12:23
            </Text>
          </div>
          <div className="w-full flex items-center justify-end mt-8">
            <div className="flex-grow">
              <TextBox name="comment" rows={2} />
            </div>
            <ButtonCustomizer className="h-20 px-8 ml-16 rounded-md">
              {t("common.send")}
            </ButtonCustomizer>
          </div>
        </div>
      </div>
    </>
  );
};

const ListField = [
  {
    id: "farmName__field",
    keyLabel: "pages.farmManagement.farmName",
    name: "farmName",
    type: "text",
  },
  {
    id: "experienceName__field",
    keyLabel: "pages.farmManagement.experienceName",
    name: "experienceName",
    type: "text",
  },
  {
    id: "userName__field",
    keyLabel: "pages.farmManagement.userName",
    name: "userName",
    type: "text",
  },
  {
    id: "productName__field",
    keyLabel: "pages.farmManagement.productName",
    name: "productName",
    type: "text",
  },
  {
    id: "price__field",
    keyLabel: "pages.farmManagement.price",
    name: "price",
    type: "text",
  },
  {
    id: "paymentStatus__field",
    keyLabel: "pages.farmManagement.paymentStatus",
    name: "paymentStatus",
    type: "text",
  },
  {
    id: "refundAmount__field",
    keyLabel: "pages.farmManagement.refundAmount",
    name: "refundAmount",
    type: "text",
  },
  {
    id: "reservationDate__field",
    keyLabel: "pages.farmManagement.reservationDate",
    name: "reservationDate",
    type: "text",
  },
];

function FarmForm() {
  const { t } = useTranslation();
  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={() => {}}>
      {(props: FormikProps<any>) => (
        <Form>
          {ListField.map((item) => (
            <div className="w-2/3 max-w-7xl mb-8" key={item.id}>
              <FieldWithLabel
                id={item.id}
                name={item.name}
                type={item.type}
                label={t(item.keyLabel)}
              />
            </div>
          ))}
          <div className="w-2/3 max-w-7xl mt-32">
            <FeedbackBox t={t} />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FarmForm;
