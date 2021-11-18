import { useTranslation } from "react-i18next";

const MainView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="font-bold text-lg">{t("pages.dashboard.title")}</h1>
      <table style={{ minWidth: "650px" }} className="mt-5 w-2/3">
        <thead>
          <tr>
            <th className="w-1/3 font-bold text-left text-lg">
              {t("pages.dashboard.recentReservations")}
            </th>
            <th className="w-1/3 font-bold text-left text-lg">
              {t("pages.dashboard.nextSettlement")}
            </th>
            <th className="w-1/3 font-bold text-left text-lg">
              {t("pages.dashboard.unprocessed")}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${t("pages.dashboard.settlementDay")} : 21/12/12`}</td>
            <td>{`${t("pages.dashboard.settlementDay")}: 21/12/12`}</td>
            <td>{`${t("pages.dashboard.question")} : 21`}</td>
          </tr>
          <tr>
            <td>{`${t("pages.dashboard.totalAmount")} : 21/12/12`}</td>
            <td>{`${t("pages.dashboard.totalAmount")}: 21/12/12`}</td>
            <td>{`${t("pages.dashboard.proposal")} : 1`}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="text-left">feedback: feedback</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainView;
