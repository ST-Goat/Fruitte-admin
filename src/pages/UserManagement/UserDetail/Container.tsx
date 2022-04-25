import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDetailView from "./View";
// import ConfirmModal from "./ConfirmModal";
import ConfirmReservationModal from "pages/common/ConfirmModal";

import { fetchUserDetails } from "services/userManagement";
import type { User } from "services/userManagement";
import { fetchReservations, cancelReservationById } from "services/reservation";
import {
  HttpStatus,
  Pagination,
  PaginationDefault,
  SNACKBAR_VARIANTS,
} from "shared/comom.enum";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { useAppDispatch } from "utilities";

const initialPagination = {
  page: PaginationDefault.PAGE,
  pageSize: PaginationDefault.PAGE_SIZE,
};

function UserDetailContainer() {
  const { id: userId } = useParams<{ id: string }>();
  const [isOpenModal, setIsOpenModal] = useState({
    reservation: false,
    userRequest: false,
  });
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState({
    data: [],
    total: 0,
  });
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [idReserCancel, setIdReserCancel] = useState<string | number | null>(
    null
  );
  const [searchStr, setSearchStr] = useState("");
  const [reload, setReload] = useState(false);

  const handleCancleReservation = (_id: any) => {
    setIsOpenModal((prev) => ({ ...prev, reservation: true }));
    setIdReserCancel(_id);
  };

  const handleCloseModal = (newState: any) => {
    setIsOpenModal(newState);
  };

  const getUserDetail = async (_userId: string) => {
    try {
      const response = await fetchUserDetails(_userId);
      if (response) setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getReservationByUser = async (
    _userId: string,
    _page: number,
    _pageSize: number,
    _search: string
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchReservations({
        userId: _userId,
        limit: _pageSize,
        skip: (_page - 1) * _pageSize,
        search: _search,
      });
      setReservations({
        data: response.content,
        total: response.total,
      });

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const dispatch = useAppDispatch();
  const requestCancleReservation = async (_id: string | number) => {
    try {
      const response = await cancelReservationById(_id);
      if (response.status === HttpStatus.OK) {
        await getReservationByUser(
          userId,
          pagination.page,
          pagination.pageSize,
          searchStr
        );
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIdReserCancel(null);
    }
  };

  useEffect(() => {
    getUserDetail(userId);
  }, [userId]);

  useEffect(() => {
    getReservationByUser(
      userId,
      pagination.page,
      pagination.pageSize,
      searchStr
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, pagination, reload]);

  const { t } = useTranslation();
  return (
    <div>
      <UserDetailView
        data={user}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        reservations={reservations}
        handleSearch={() => {
          setPagination(initialPagination);
          setReload(!reload);
        }}
        onChangeSearch={(text: string) => {
          setSearchStr(text);
        }}
        handleCancleReservation={handleCancleReservation}
      />
      {/* <ConfirmModal
        open={isOpenModal.userRequest}
        handleClose={() =>
          handleCloseModal({ ...isOpenModal, userRequest: false })
        }
      /> */}
      <ConfirmReservationModal
        open={isOpenModal.reservation}
        handleClose={() =>
          handleCloseModal({ ...isOpenModal, reservation: false })
        }
        handleAccepted={() => {
          if (idReserCancel) requestCancleReservation(idReserCancel);
          handleCloseModal({ ...isOpenModal, reservation: false });
        }}
        title={t("pages.reservation.cancelReservationTitle")}
      />
    </div>
  );
}

export default UserDetailContainer;
