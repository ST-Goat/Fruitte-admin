import { useTranslation } from "react-i18next";

import Text from "pages/common/components/Text";

import ButtonCustomizer from "pages/common/Button";
import LeftHeader from "../components/LeftHeader";
import FeedbackForm from "./FeedbackForm";

function Feedback() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center">
        <div className="flex-grow">
          <LeftHeader />
          <Text className="mt-5 font-bold text-2xl">
            {t("pages.farmManagement.reservationDetail")}
          </Text>
        </div>
        <ButtonCustomizer
          className="mr-16 text-lg underline"
          color="other"
          variant="other"
        >
          {t("pages.farmManagement.cancelReservation")}
        </ButtonCustomizer>
      </div>
      <div className="py-32 px-16">
        <FeedbackForm />
      </div>
    </>
  );
}

export default Feedback;
