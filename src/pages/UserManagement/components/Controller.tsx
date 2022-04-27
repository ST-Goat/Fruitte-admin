import { useTranslation } from "react-i18next";

import SearchBox from "pages/common/SearchBox";
import Grid from "@mui/material/Grid";

import type { Filters } from "services/userManagement";
import ButtonCustomizer from "pages/common/Button";
import { UserState } from "../Container";
import { exportExcelFile, transformObject } from "utilities";
import { HEADER_EXPORT_EXCEL_FILE } from "shared/comom.enum";

function Controller({
  filters,
  onChange,
  onSubmit,
  users,
}: {
  filters: Filters;
  onChange: (name: string, value: string | undefined) => void;
  onSubmit: () => void;
  users: UserState;
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
            <SearchBox
              name="keyword"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
          <Grid item>
            <ButtonCustomizer
              variant="other"
              className="text-white font-bold"
              bgColor="secondary"
              onClick={() =>
                exportExcelFile({
                  data: users.data.map((item) => ({
                    ...transformObject(
                      {
                        name: item.name,
                        email: item.email,
                        phone: item.phone,
                        totalBookedReservations: item?.totalBookedReservations,
                        isActive: item.isActive
                          ? "pages.userManagement.active"
                          : "pages.userManagement.inactive",
                        updatedAt: new Date(
                          item.updatedAt
                        ).toLocaleDateString(),
                      },
                      t
                    ),
                  })),
                  header: transformObject(HEADER_EXPORT_EXCEL_FILE.USER, t),
                  fileName: t("pages.userManagement.excelFileName"),
                })
              }
            >
              {t("common.export")}
            </ButtonCustomizer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Controller;
