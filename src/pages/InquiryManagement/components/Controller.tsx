import React from "react";
import { useTranslation } from "react-i18next";

import SearchBox from "pages/common/SearchBox";
import Grid from "@mui/material/Grid";
import ButtonCustomizer from "pages/common/Button";
import AutoCompleteCustomizer from "pages/common/Autocomplete";

import type { Filters } from "../Container";
import { InquiryStatus } from "services/inquiry";

const Controller = ({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (newFilters: Filters) => void;
}) => {
  const { t } = useTranslation();

  const statusOptions = [
    { label: t("common.all"), value: undefined },
    { label: t("pages.inquiry.done"), value: InquiryStatus.DONE },
    { label: t("pages.inquiry.new"), value: InquiryStatus.NEW },
  ];
  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item xs={6}>
        {/* <div className="flex">
          <div className="flex-grow mr-4">
            <SearchBox />
          </div>
          <ButtonCustomizer>{t("common.search")}</ButtonCustomizer>
        </div> */}
      </Grid>
      <Grid item xs={2}>
        <AutoCompleteCustomizer
          options={statusOptions}
          value={statusOptions.find(
            (status) => status.value === filters.status
          )}
          size="small"
          onChange={(newValue) => {
            onChange({
              ...filters,
              status: newValue ? newValue.value : undefined,
            });
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Controller;
