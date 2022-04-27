import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import AutoCompleteCustomizer from "pages/common/Autocomplete";
import ButtonCustomizer from "pages/common/Button";

import { fetchAllFarm } from "services/farmManagement";

import type { Option } from "pages/common/Autocomplete";
import type { FarmItem } from "services/farmManagement";


function Controller({
  isViewUnsettled,
  listIdSelected,
  onChange,
  filters,
  handleProgress,
  handleSubmitSearch
}: {
  isViewUnsettled: boolean;
  listIdSelected: Array<string | number>;
  onChange: any;
  filters: any;
  handleProgress: () => void;
  handleSubmitSearch: () => void;
}) {
  const { t } = useTranslation();
  const [farmOptions, setFarmOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllFarmOptions() {
      setLoading(true);
      try {
        const response = await fetchAllFarm();
        setFarmOptions([
          {
            id: 'all',
            label: t("common.all"),
            value: undefined
          },
          ...response.map((farm: FarmItem) => ({
            id: farm.id,
            label: farm.name,
            value: farm.id
          }))
        ])
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    getAllFarmOptions();
  }, [t]);

  if (loading) return <>...{t('common.loading')}</>;
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper
          square={false}
          elevation={4}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #76848d",
            height: "40px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            fullWidth
            name="keyword"
            onChange={(e: React.ChangeEvent<any>) =>
              onChange(e.target.name, e.target.value)
            }
            placeholder={""}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <div className="flex justify-between">
          <div className="flex">
            <ButtonCustomizer className="mr-4" onClick={() => {
              handleSubmitSearch();
            }}>
              {t("common.search")}
            </ButtonCustomizer>
            <AutoCompleteCustomizer
              name="farmId"
              value={farmOptions.find(item => item.value === filters.farmId)}
              onChange={(newValue) => {
                onChange("farmId", newValue?.value ?? undefined);
              }}
              fullWidth
              options={farmOptions}
              size="small"
              style={{ minWidth: 150 }}
            />

          </div>
          <ButtonCustomizer
            onClick={handleProgress}
            color="secondary"
            className="rounded rounded-xl"
            disabled={listIdSelected.length === 0}
          >
            {isViewUnsettled
              ? t("pages.settlement.settlementProcessing")
              : t("pages.settlement.unsettlementProcessing")}
          </ButtonCustomizer>
        </div>
      </Grid>
    </Grid>
  );
}

export default Controller;
