import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export type Tab = {
  id: number;
  children: React.ReactNode;
  keyLabel: string;
};
export type TabHeaderProps = {
  tabs: Array<Tab>;
  tabIdCurrent: number;
  onChange: (newId: number) => void;
  children: React.ReactNode;
};
const TabHeader = ({
  tabs,
  tabIdCurrent,
  onChange,
  children,
}: TabHeaderProps) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#828282" }}>
        <Tabs
          value={tabIdCurrent}
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            onChange(newValue);
          }}
          aria-label="farm-detail-tab"
        >
          {tabs.map((item) => (
            <Tab
              key={`farm-detail-tab-${item.id}`}
              sx={{
                "&": {
                  padding: "1rem 3rem",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                },
              }}
              label={t(item.keyLabel)}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ padding: "1.75rem 3rem", paddingBottom: "6rem" }}>
        {children}
      </Box>
    </Box>
  );
};

export default TabHeader;
