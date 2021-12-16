import { useTranslation } from "react-i18next";

import SearchField from "./SearchField";
import Grid from "@mui/material/Grid";

import { Filters } from "../Container";
import ButtonCustomizer from "pages/common/Button";

function Controller({
  filters,
  onChange,
  onSubmit,
}: {
  filters: Filters;
  onChange: (name: string, value: string | undefined) => void;
  onSubmit: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <Grid container spacing={2}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          item
          spacing={2}
          xs={6}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <SearchField
              name="search"
              onChange={(e: React.ChangeEvent<any>) =>
                onChange(e.target.name, e.target.value)
              }
              placeholder={t("pages.userManagement.searchPlaceHolder")}
            />
          </Grid>
          <Grid item>
            <ButtonCustomizer
              variant="primary"
              className="text-white font-bold"
              onClick={onSubmit}
            >
              {t("common.search")}
            </ButtonCustomizer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Controller;