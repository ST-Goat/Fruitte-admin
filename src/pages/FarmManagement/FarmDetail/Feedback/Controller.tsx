import { useTranslation } from "react-i18next";

import SearchBox from "pages/common/SearchBox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Filters } from ".";
import { FeedbackStatus } from "services/feedback";

const Controller = ({
  filters,
  onSubmit,
  onChange,
}: {
  filters: Filters;
  onSubmit: () => void;
  onChange: (newFilter: Filters) => void;
}) => {
  const { t } = useTranslation();
  const listStatus = [
    { id: 1, label: t("common.all"), value: undefined },
    { id: 2, label: t("common.open"), value: FeedbackStatus.ON_GOING },
    { id: 3, label: t("common.resolved"), value: FeedbackStatus.DONE },
  ];
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      item
      spacing={2}
    >
      <Grid item xs={6}></Grid>
      <Grid item xs={6} lg={2}>
        <Autocomplete
          fullWidth
          size="small"
          options={listStatus}
          defaultValue={listStatus[0]}
          value={listStatus.find((item) => item.value === filters.status)}
          getOptionLabel={(option) => option.label}
          onChange={(e, value, reason) => {
            if (reason === "clear") {
              onChange({
                ...filters,
                status: undefined,
              });
              onSubmit();
            } else {
              onChange({
                ...filters,
                status: value?.value,
              });
              onSubmit();
            }
          }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              sx={{
                "& fieldset": {
                  borderColor: "#4C9C2E",
                },
                "& .Mui-focused fieldset": {
                  borderColor: "#4C9C2E !important",
                },
              }}
              name="farmName"
              placeholder={t("common.farm")}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Controller;
