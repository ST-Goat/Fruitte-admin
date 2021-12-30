import { useTranslation } from "react-i18next";

import SearchBox from "pages/common/SearchBox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Filters } from "services/farmActivity";
import ButtonCustomizer from "pages/common/Button";

import { FarmItem, fetchAllFarm } from "services/farmManagement";
import { useEffect, useState } from "react";

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
  const listStatus = [
    { id: 1, label: t("common.all"), value: "" },
    { id: 2, label: t("common.normal"), value: "ACTIVE" },
    { id: 3, label: t("common.unused"), value: "DEACTIVE" },
  ];
  const [farmOptions, setFarmOptions] = useState<
    Array<{
      id: string;
      label: string;
      value: string;
    }>
  >([]);

  useEffect(() => {
    async function fetchFarmData() {
      try {
        const responseData = await fetchAllFarm();
        setFarmOptions(
          responseData.map((item: FarmItem) => ({
            id: item.id,
            label: item.name,
            value: item.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchFarmData();
  }, []);
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
            <SearchBox
              name="keywork"
              value={filters.keywork}
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
                options={farmOptions}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => onChange("farmName", value?.value)}
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
            <Grid item xs={6} lg={4}>
              <Autocomplete
                fullWidth
                size="small"
                options={listStatus}
                isOptionEqualToValue={(option, value) => {
                  return option.value === value.value;
                }}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => onChange("filterStatus", value?.value)}
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
                    name="filterStatus"
                    placeholder={t("common.status")}
                  />
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
