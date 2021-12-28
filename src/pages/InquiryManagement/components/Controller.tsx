import React from "react";
import { useTranslation } from "react-i18next";

import SearchBox from "pages/common/SearchBox";
import Grid from "@mui/material/Grid";
import ButtonCustomizer from "pages/common/Button";

const Controller = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="flex">
          <div className="flex-grow mr-4">
            <SearchBox />
          </div>
          <ButtonCustomizer>{t("common.search")}</ButtonCustomizer>
        </div>
      </Grid>
    </Grid>
  );
};

export default Controller;
