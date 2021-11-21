import { useTranslation } from "react-i18next";

import SearchField from "./SearchField";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Filters } from "../Container";
import ButtonCustomizer from "pages/common/Button";

const listInfor = [
  { id: 1, label: "Name", value: "name" },
  { id: 2, label: "Phone", value: "phone" },
  { id: 3, label: "Email", value: "email" },
];

const listStatus = [
  { id: 1, label: "Active", value: "active" },
  { id: 2, label: "DeActive", value: "deactive" },
  { id: 3, label: "Request", value: "request" },
];

function Controller({
  filters,
  onChange,
  onSubmit,
  rightController = false,
}: {
  filters: Filters;
  onChange: (name: string, value: string | undefined) => void;
  onSubmit: () => void;
  rightController?: boolean;
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
              placeholder={""}
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
        {rightController && (
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            item
            spacing={2}
            xs={6}
          >
            <Grid item xs={6} lg={4}>
              <Autocomplete
                fullWidth
                size="small"
                options={listInfor}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => onChange("infor", value?.value)}
                renderInput={(params: any) => (
                  <TextField {...params} name="infor" label="Field" />
                )}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <Autocomplete
                fullWidth
                size="small"
                options={listStatus}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => onChange("status", value?.value)}
                renderInput={(params: any) => (
                  <TextField {...params} name="status" label="Status" />
                )}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Controller;
