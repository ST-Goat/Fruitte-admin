import { useState } from "react";
import LeftHeader from "../components/LeftHeader";
import TabHeader from "../components/TabHeader";
import AddOrEdit from "../components/AddOrEdit";

const tabList = [
  {
    id: 0,
    children: <AddOrEdit isCreate />,
    keyLabel: "common.farm",
  },
];
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

function FarmDetail() {
  const [tabIdCurrent, setTabIdCurrent] = useState(0);
  return (
    <div>
      <LeftHeader />
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
