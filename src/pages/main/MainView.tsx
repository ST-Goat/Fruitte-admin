import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import CardStatistic, { CardIconKeys } from "./Card";

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

  const listView = useMemo(() => {
    return [
      {
        id: 1,
        icon: CardIconKeys.reservation,
        title: t("pages.dashboard.recentReservations"),
        subTitle: detail
          ? format(new Date(detail?.incomingReservationDate), "yyyy/MM/dd")
          : "",
        total: detail?.incomingAmount,
      },
      {
        id: 2,
        icon: CardIconKeys.settlement,
        title: t("pages.dashboard.nextSettlement"),
        subTitle: detail
          ? format(new Date(detail?.recentReservationDate), "yyyy/MM/dd")
          : "",
        total: detail?.recentAmount,
      },
      {
        id: 3,
        icon: CardIconKeys.question,
        title: t("pages.dashboard.question"),
        total: detail?.remainInquiry,
      },
      {
        id: 4,
        icon: CardIconKeys.assistant,
        title: t("pages.dashboard.proposal"),
        total: detail?.remainRequestPartner,
      },
      {
        id: 5,
        icon: CardIconKeys.feedback,
        title: t("pages.dashboard.feedback"),
        total: detail?.remainFeedback,
      },
    ];
  }, [detail, t]);

  return (
    <div>
      <h1 className="font-bold text-lg">{t("pages.dashboard.title")}</h1>
      {listView.map((item) => {
        return <CardStatistic key={item.id} {...item} />;
      })}
    </div>
  );
};

export default MainView;
