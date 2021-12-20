import { useTranslation } from "react-i18next";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import AutoCompleteCustomizer from "pages/common/Autocomplete";
import ButtonCustomizer from "pages/common/Button";

function Controller({
  isViewUnsettled,
  onChange,
  filters,
  handleProgress,
}: {
  isViewUnsettled: boolean;
  onChange: any;
  filters: any;
  handleProgress: () => void;
}) {
  const { t } = useTranslation();

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
            name="search"
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
            <ButtonCustomizer className="mr-4">
              {t("common.search")}
            </ButtonCustomizer>
            {!isViewUnsettled && (
              <AutoCompleteCustomizer
                name="search"
                onChange={() => {}}
                fullWidth
                options={[]}
                size="small"
                style={{ minWidth: 150 }}
              />
            )}
          </div>
          <ButtonCustomizer
            onClick={handleProgress}
            color="brown"
            className="rounded rounded-xl"
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
