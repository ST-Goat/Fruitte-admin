import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { farmManagementUrl } from "routes";

import Text from "pages/common/components/Text";

function LeftHeader({
  goBackUrl = farmManagementUrl,
  title = "",
}: {
  goBackUrl?: string | undefined;
  title?: string;
}) {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = () => {
    if (!goBackUrl) {
      history.goBack();
    }
  };
  return (
    <div>
      <Link to={goBackUrl}>
        <div className="flex items-center" onClick={goBack}>
          <ArrowBackIosNewIcon fontSize="small" />
          <Text>{t("common.goBack")}</Text>
        </div>
      </Link>
      <Text className="mt-5 font-bold text-lg">
        {!title ? t("pages.farmManagement.title") : title}
      </Text>
    </div>
  );
}

export default LeftHeader;
