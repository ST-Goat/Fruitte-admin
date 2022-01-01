import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import LeftHeader from "../components/LeftHeader";
import Feedback from "./Feedback";
import TabHeader from "../components/TabHeader";
import FarmForm from "../components/FarmForm";
import Reservation from "./Reservation";
import Activities from "./Activities";
import Text from "pages/common/components/Text";
import Schedule from "./Schedule";

import { RouteParams } from "shared/comom.enum";

type TabPanelProps = {
  children?: React.ReactNode;
  current: number;
  id: number;
};

const fakeFarmData = {
  farmName: "농장명",
  email: "abc@gmail.com",
  phone: "010-1234-1234",
  address: "경기도 광주시, 1234",
  settlementCycle: "2주/ 4주",
  paymentStatus: "홍길동",
  accountHolder: "신한은행",
  nameOfBank: "123-134-1234-134",
  accountNumber: "40%",
  settlementRate: "이메일",
  farmUser: "농장 유저 추가",
};
function TabPanel(props: TabPanelProps) {
  const { children, id, current, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={id !== current}
      id={`simple-tabpanel-${current}`}
      aria-labelledby={`simple-tab-${current}`}
      {...other}
    >
      {id === current && children}
    </div>
  );
}

function FarmDetail() {
  const { id: farmId } = useParams<RouteParams>();
  const [tabIdCurrent, setTabIdCurrent] = useState(0);

  const tabList = useMemo(
    () => [
      {
        id: 0,
        children: <FarmForm isCreate={false} data={fakeFarmData} />,
        keyLabel: "common.farm",
      },
      {
        id: 1,
        children: <Activities />,
        keyLabel: "pages.farmManagement.activities",
      },
      {
        id: 2,
        children: <Schedule farmId={farmId} />,
        keyLabel: "pages.farmManagement.schedule",
      },
      {
        id: 3,
        children: <Reservation />,
        keyLabel: "common.reservation",
      },
      {
        id: 4,
        children: <Feedback />,
        keyLabel: "pages.farmManagement.feedback",
      },
    ],
    []
  );
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <LeftHeader />
        <Text className="underline cursor-pointer">미사용 처리</Text>
      </div>
      <TabHeader
        tabs={tabList}
        tabIdCurrent={tabIdCurrent}
        onChange={(newId) => {
          setTabIdCurrent(newId);
        }}
      >
        {tabList.map((item) => {
          const { id, keyLabel, ...props } = item;
          return (
            <TabPanel
              id={id}
              key={`farm-detail-tab-${id}`}
              {...props}
              current={tabIdCurrent}
            />
          );
        })}
      </TabHeader>
    </div>
  );
}

export default FarmDetail;
