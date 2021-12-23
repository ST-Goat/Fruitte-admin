import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import ButtonCustomizer from "pages/common/Button";
import SearchBox from "pages/common/SearchBox";
import AutoCompleteCustomizer from "pages/common/Autocomplete";

function Controller() {
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
      <Grid item xs={6}>
        <div className="flex justify-end">
          <AutoCompleteCustomizer
            name="sort"
            placeholder="sort by"
            onChange={() => {}}
            fullWidth={false}
            options={[
              { label: "Booked", value: 1 },
              { label: "Completed", value: 2 },
              { label: "Cancelled by Admin", value: 3 },
              { label: "Cancelled by Farrmer", value: 4 },
            ]}
            size="small"
            style={{ minWidth: 200 }}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default Controller;
