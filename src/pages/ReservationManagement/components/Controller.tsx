import { useState } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import ButtonCustomizer from "pages/common/Button";
import SearchBox from "pages/common/SearchBox";
import AutoCompleteCustomizer from "pages/common/Autocomplete";

import { ReservationStatus } from "services/reservation";
import type { Filters } from "../Container";
import { HEADER_EXPORT_EXCEL_FILE, Pagination } from "shared/comom.enum";
import { initialPagination } from "../Container";
import DateRangePickerCustomizer from "pages/common/DateRangePicker";
import { format } from "date-fns";
import { exportExcelFile, transformObject } from "utilities/helper";

const getReservationStatus = (status: string) => {
  switch (status) {
    case ReservationStatus.BOOKING:
      return "pages.reservation.bookingStatus";

    case ReservationStatus.CANCELLED:
      return "pages.reservation.cancelStatus";

    case ReservationStatus.COMPLETED:
      return "pages.reservation.completeStatus";

    default:
      return "-";
  }
};

function Controller({
  handleSearchString,
  setFilters,
  setPagination,
  filters,
  reservations,
}: {
  handleSearchString: () => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
  filters: any;
  reservations: any[];
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
      <Grid item>
        <ButtonCustomizer
          variant="other"
          className="text-white font-bold"
          bgColor="secondary"
          onClick={() =>
            exportExcelFile({
              data: reservations.map((item) => ({
                ...transformObject(
                  {
                    bookingDate: new Date(
                      item.bookingDate
                    ).toLocaleDateString(),
                    user: item.user,
                    activityName: [item.farmInfo.name, item.farmActivity.name]
                      .map((item) => `- ${item}`)
                      .join("\n"),
                    status: getReservationStatus(item.reservationStatus),
                    cancel:
                      item.reservationStatus === ReservationStatus.BOOKING
                        ? "CANCEL"
                        : "-",
                  },
                  t
                ),
              })),
              header: transformObject(
                HEADER_EXPORT_EXCEL_FILE.RESERVATION_MANAGEMENT,
                t
              ),
              fileName: t("pages.reservation.excelFileName"),
            })
          }
        >
          {t("common.export")}
        </ButtonCustomizer>
      </Grid>
      <Grid item xs={6}>
        <div className="flex justify-end">
          <div className="mr-4">
            <DateRangePickerCustomizer
              defaultValue={[filters.startDate, filters.endDate]}
              onChange={([start, end]) => {
                setFilters((prev) => ({ ...prev, startDate: format(new Date(start), 'yyyy-MM-dd'), endDate: format(new Date(end), 'yyyy-MM-dd') }))
              }}
            />
          </div>
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
