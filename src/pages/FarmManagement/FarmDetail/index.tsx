import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LeftHeader from "../components/LeftHeader";
import Feedback from "./Feedback";
import TabHeader from "../components/TabHeader";
import FarmForm from "../components/FarmForm";
import Reservation from "./Reservation";
import Activities from "./Activities";
import Text from "pages/common/components/Text";
import Schedule from "./Schedule";
import ConfirmModal from "pages/common/ConfirmModal";

import { HttpStatus, RouteParams, SNACKBAR_VARIANTS } from "shared/comom.enum";
import {
  fetchFarmDetail,
  FarmerItem,
  deleteFarmWithId,
} from "services/farmManagement";
import { changeTabWithId } from "redux/slices/farm";
import { useAppDispatch, useAppSelector } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { farmManagementUrl } from "routes";

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
  districtName: "",
  accountHolder: "",
  bankName: "",
  accountNumber: "",
  incomeRate: 0,
  farmers: [] as FarmerItem[],
};

function FarmDetail() {
  const { t } = useTranslation();
  const { id: farmId } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const tabIdCurrent = useAppSelector(
    (state) => state.farm.tabControllers.selected
  );
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(initialFarmDetails);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
          districtName: response.districtName,
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
          <>{t("common.loading")}</>
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

  const handleDeleteFarm = async (_id: string) => {
    try {
      const response = await deleteFarmWithId(_id);
      if (response.status === HttpStatus.OK) {
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
        history.push(farmManagementUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <LeftHeader />
        <Text
          className="hover:underline cursor-pointer"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          {t("common.delete")}
        </Text>
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
      <ConfirmModal
        open={isOpenModal}
        handleAccepted={() => {
          setIsOpenModal(false);
          handleDeleteFarm(farmId);
        }}
        handleClose={() => {
          setIsOpenModal(false);
        }}
        title={t("pages.farmManagement.deleteFarmModalTitle")}
      />
    </div>
  );
}

export default FarmDetail;
