import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDashboardDetail, DashboardDetail } from "services/dashboard";
import { HttpStatus } from "shared/comom.enum";

const MainView: React.FC = () => {
  const { t } = useTranslation();
  const [detail, setDetail] = useState<DashboardDetail | null>(null);

  useEffect(() => {
    async function getDetail() {
      try {
        const res = await getDashboardDetail();
        if (res.status === HttpStatus.OK) {
          setDetail(res.data.content);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDetail();
  }, []);

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
            <td>{`${t("pages.dashboard.settlementDay")} : ${
              detail
                ? format(
                    new Date(detail?.incomingReservationDate),
                    "yyyy/MM/dd"
                  )
                : ""
            }`}</td>
            <td>{`${t("pages.dashboard.settlementDay")}: ${
              detail
                ? format(new Date(detail?.recentReservationDate), "yyyy/MM/dd")
                : ""
            }`}</td>
            <td>{`${t("pages.dashboard.question")} : ${
              detail?.remainInquiry
            }`}</td>
          </tr>
          <tr>
            <td>{`${t("pages.dashboard.totalAmount")} : ${
              detail?.incomingAmount
            }`}</td>
            <td>{`${t("pages.dashboard.totalAmount")}: ${
              detail?.recentAmount
            }`}</td>
            <td>{`${t("pages.dashboard.proposal")} : ${
              detail?.remainRequestPartner
            }`}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>{`${t("pages.dashboard.feedback")} : ${
              detail?.remainRequestPartner
            }`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainView;
