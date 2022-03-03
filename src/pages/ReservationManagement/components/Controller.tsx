import { useState } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import ButtonCustomizer from "pages/common/Button";
import SearchBox from "pages/common/SearchBox";
import AutoCompleteCustomizer from "pages/common/Autocomplete";

import { ReservationStatus } from "services/reservation";
import type { Filters } from "../Container";
import type { Pagination } from "shared/comom.enum";
import { initialPagination } from "../Container";

function Controller({
  handleSearchString,
  setFilters,
  setPagination,
}: {
  handleSearchString: () => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
}) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="flex">
          <div className="flex-grow mr-4">
            <SearchBox
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setFilters((prev) => ({ ...prev, search: event.target.value }));
              }}
            />
          </div>
          <ButtonCustomizer onClick={handleSearchString}>
            {t("common.search")}
          </ButtonCustomizer>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="flex justify-end">
          <AutoCompleteCustomizer
            name="sort"
            placeholder="sort by"
            defaultValue={{ label: "None", value: undefined }}
            isOptionEqualToValue={(option: any, value: any) =>
              option.value === value.value
            }
            onChange={(newValue) => {
              setFilters((prev) => ({
                ...prev,
                status: newValue?.value ?? undefined,
              }));
              setPagination(initialPagination);
            }}
            fullWidth={false}
            options={[
              { label: "None", value: undefined },
              { label: "Booked", value: ReservationStatus.BOOKING },
              { label: "Completed", value: ReservationStatus.COMPLETED },
              { label: "Cancelled", value: ReservationStatus.CANCELLED },
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
