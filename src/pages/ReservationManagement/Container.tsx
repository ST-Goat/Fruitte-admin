/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ReservationView from "./View";
import Controller from "./components/Controller";
import TablePaginations from "pages/common/Paginations";
import ConfirmModal from "pages/common/ConfirmModal";

import {
  cancelReservationById,
  fetchReservations,
  ReservationStatus,
} from "services/reservation";
import {
  HttpStatus,
  PaginationDefault,
  SNACKBAR_VARIANTS,
} from "shared/comom.enum";
import { addDays, endOfDay, format, startOfDay } from "date-fns";
import { useAppDispatch } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";

export const initialPagination = {
  page: PaginationDefault.PAGE,
  pageSize: PaginationDefault.PAGE_SIZE,
};
export type Filters = {
  search: string;
  status: ReservationStatus | undefined;
  startDate: string;
  endDate: string;
};

function ReservationContainer() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [reservations, setReservations] = useState({
    data: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState(initialPagination);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: undefined,
    startDate: format(startOfDay(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfDay(addDays(new Date(), 7)), 'yyyy-MM-dd')
  });
  const [idCancelled, setIdCancelled] = useState<string | number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [reload, setReload] = useState(false);

  const getReservations = async ({
    limit,
    skip,
    search,
    status,
    startDate,
    endDate
  }: {
    limit: number;
    skip: number;
    search: string;
    status?: ReservationStatus;
    startDate: string;
    endDate: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetchReservations({ limit, skip, search, status, startDate, endDate });
      setReservations({
        data: response.content.map((item: any, index: number) => {
          return {
            id: item.id,
            no: (pagination.page - 1) * pagination.pageSize + index + 1,
            bookingDate: format(
              new Date(item.farmSchedule.startAt),
              "yyyy/MM/dd"
            ),
            user: Boolean(item.user) ? item.user.name : "-",
            activityName: () => (
              <div>
                <div className="text-blue-500 font-bold">
                  {item.farmInfo.name}
                </div>
                <div className="font-bold">{item.farmActivity.name}</div>
              </div>
            ),
            status: () => (
              <div>
                {(function () {
                  switch (item.reservationStatus) {
                    case ReservationStatus.BOOKING:
                      return (
                        <div className="text-success-default">
                          {t("pages.reservation.bookingStatus")}
                        </div>
                      );
                    case ReservationStatus.CANCELLED:
                      return (
                        <div className="text-error-default">
                          {t("pages.reservation.cancelStatus")}
                        </div>
                      );
                    case ReservationStatus.COMPLETED:
                      return (
                        <div className="text-black-default">
                          {t("pages.reservation.completeStatus")}
                        </div>
                      );
                    default:
                      return <>-</>;
                  }
                })()}
              </div>
            ),
            cancel: () => {
              return item.reservationStatus === ReservationStatus.BOOKING ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdCancelled(item.id);
                    setIsOpenModal(true);
                  }}
                  className="cursor-pointer underline font-bold"
                >
                  Cancel
                </div>
              ) : (
                <>-</>
              );
            },
          };
        }),
        total: response.total,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestCancelReservation = async (id: string | number) => {
    try {
      const response = await cancelReservationById(id);
      if (response.status === HttpStatus.OK) {
        await getReservations({
          limit: pagination.pageSize,
          skip: (pagination.page - 1) * pagination.pageSize,
          search: filters.search,
          status: filters.status,
          startDate: filters.startDate,
          endDate: filters.endDate
        });
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReservations({
      limit: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      search: filters.search,
      status: filters.status,
      startDate: filters.startDate,
      endDate: filters.endDate
    });
  }, [pagination.page, pagination.pageSize, filters.status, filters.startDate, filters.endDate, reload]);

  return (
    <>
      <h1 className="text-2xl font-bold">{t("pages.reservation.title")}</h1>
      <div className="mt-8">
        <Controller
          handleSearchString={() => {
            setPagination(initialPagination);
            setReload(!reload);
          }}
          filters={filters}
          setFilters={setFilters}
          setPagination={setPagination}
        />
      </div>
      <div className="mt-4">
        <TablePaginations
          count={reservations.total}
          rowsPerPage={pagination.pageSize}
          page={pagination.page}
          handleChangePage={(newPage) => {
            setPagination((prev) => ({ ...prev, page: newPage }));
          }}
        >
          <ReservationView isLoading={isLoading} data={reservations.data} />
        </TablePaginations>
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleAccepted={() => {
          if (idCancelled) {
            requestCancelReservation(idCancelled);
            setIsOpenModal(false);
          }
        }}
        handleClose={() => {
          setIsOpenModal(false);
          setIdCancelled(null);
        }}
        title={t("pages.reservation.cancelReservationTitle")}
      />
    </>
  );
}

export default ReservationContainer;
