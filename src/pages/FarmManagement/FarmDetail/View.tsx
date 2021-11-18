import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Text from "pages/common/components/Text";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ButtonCustomizer from "pages/common/Button";

import { farmManagementUrl } from "routes";
import FarmForm from "./FarmForm";

function FarmView() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center">
        <div className="flex-grow">
          <Link to={farmManagementUrl}>
            <div className="flex items-center">
              <ArrowBackIosNewIcon fontSize="small" />
              <Text>{t("common.goBack")}</Text>
            </div>
          </Link>
          <Text className="mt-5 font-bold text-lg">
            {t("pages.farmManagement.title")}
          </Text>
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
        <FarmForm />
      </div>
    </>
  );
}

export default FarmView;
