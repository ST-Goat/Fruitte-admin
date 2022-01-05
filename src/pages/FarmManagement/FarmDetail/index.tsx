import { useEffect, useMemo, useState } from "react";
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
import { fetchFarmDetail, FarmerItem } from "services/farmManagement";
import { changeTabWithId } from "redux/slices/farm";
import { useAppDispatch, useAppSelector } from "utilities";

type TabPanelProps = {
  children?: React.ReactNode;
  current: number;
  id: number;
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

export const initialFarmDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  settlementCycle: 15,
  accountHolder: "",
  bankName: "",
  accountNumber: "",
  incomeRate: 0,
  farmers: [] as FarmerItem[],
};

function FarmDetail() {
  const { id: farmId } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const tabIdCurrent = useAppSelector(
    (state) => state.farm.tabControllers.selected
  );
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(initialFarmDetails);

  useEffect(() => {
    async function getFarmData(farmId: string) {
      setIsLoading(true);
      try {
        const response = await fetchFarmDetail({ farmId: farmId });
        setDetail({
          name: response.name,
          email: response.email,
          phone: response.phone,
          address: response.address,
          settlementCycle: response.settlementCycle,
          accountHolder: response.accountHolder,
          bankName: response.bankName,
          accountNumber: response.accountNumber,
          incomeRate: response.incomeRate,
          farmers: response.farmers,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getFarmData(farmId);
  }, [farmId]);

  const tabList = useMemo(
    () => [
      {
        id: 0,
        children: isLoading ? (
          <>...loading</>
        ) : (
          <FarmForm farmId={farmId} isCreate={false} initData={detail} />
        ),
        keyLabel: "common.farm",
      },
      {
        id: 1,
        children: <Activities farmId={farmId} />,
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
    [isLoading, detail, farmId]
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
          dispatch(changeTabWithId(newId));
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
