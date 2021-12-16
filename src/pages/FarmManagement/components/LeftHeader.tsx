import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import Text from "pages/common/components/Text";

function LeftHeader({
  goBackUrl,
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
    } else {
      history.push(goBackUrl);
    }
  };
  return (
    <div>
      <div className="flex items-center" onClick={goBack}>
        <ArrowBackIosNewIcon className="cursor-pointer" fontSize="small" />
        <Text className="cursor-pointer">{t("common.goBack")}</Text>
      </div>
      <Text className="mt-5 font-bold text-lg">
        {!title ? t("pages.farmManagement.title") : title}
      </Text>
    </div>
  );
}

export default LeftHeader;
