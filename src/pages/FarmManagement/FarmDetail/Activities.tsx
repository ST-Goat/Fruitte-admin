import { useState } from "react";
import { useTranslation } from "react-i18next";

import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoActivities from "../components/NoActivities";
import { Link } from "react-router-dom";

import { farmManagementActivityUrl } from "routes";

function Activities() {
  const { i18n, t } = useTranslation();
  const [acitivities, setActivities] = useState([]);

  return (
    <div>
      <div className="flex justify-end mt-8 mb-16">
        <Link to={`${farmManagementActivityUrl}/test-id`}>
          <ButtonCustomizer
            className="flex justify-center items-center w-64 rounded rounded-3xl"
            color="secondary"
          >
            <AddCircleIcon />
            <Text className="ml-2">
              {t("pages.farmManagement.createActivity")}
            </Text>
          </ButtonCustomizer>
        </Link>
      </div>
      {acitivities.length > 0 ? "list" : <NoActivities i18n={i18n} />}
    </div>
  );
}

export default Activities;
