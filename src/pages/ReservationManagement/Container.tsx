import { useTranslation } from "react-i18next";

import ReservationView from "./View";
import Controller from "./components/Controller";
import TablePaginations from "pages/common/Paginations";

function ReservationContainer() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-2xl font-bold">{t("pages.reservation.title")}</h1>
      <div className="mt-8">
        <Controller />
      </div>
      <div className="mt-4">
        <TablePaginations
          count={100}
          rowsPerPage={10}
          page={1}
          handleChangePage={(newPage) => {}}
        >
          <ReservationView />
        </TablePaginations>
      </div>
    </>
  );
}

export default ReservationContainer;
