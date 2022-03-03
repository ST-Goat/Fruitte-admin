import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import classNames from "classnames";

import ButtonCustomizer from "pages/common/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookingInformation from "./Information";
import ConfirmModal from "pages/common/ConfirmModal";

import { HttpStatus, Size, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { reservationManagementUrl } from "routes";
import {
  getReservationDetail,
  cancelReservationById,
} from "services/reservation";
import { useAppDispatch } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";

function BookingDetail() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReservationDetail = async (reservationId: string) => {
    setIsLoading(true);
    try {
      const response = await getReservationDetail(reservationId);
      setDetail(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservationDetail(id);
  }, [id]);

  return (
    <div>
      <div>
        <ButtonCustomizer
          variant="other"
          color="other"
          size={Size.CUSTOM}
          className={classNames(
            "flex items-center px-0",
            "active:transform active:scale-95",
            "font-bold"
          )}
          onClick={() => {
            history.push(reservationManagementUrl);
          }}
        >
          <ArrowBackIosIcon fontSize="small" />
          {t("common.goBack")}
        </ButtonCustomizer>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">
          {t("pages.reservation.title")}
        </h1>
        {isLoading ? (
          <>...Loading</>
        ) : (
          <BookingInformation
            handleCancel={() => {
              setIsOpenModal(true);
            }}
            detail={detail}
          />
        )}
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false);
        }}
        handleAccepted={async () => {
          try {
            const response = await cancelReservationById(id);
            if (response.status === HttpStatus.OK) {
              await fetchReservationDetail(id);
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
          setIsOpenModal(false);
        }}
        title={t("pages.reservation.cancelReservationTitle")}
      />
    </div>
  );
}

export default BookingDetail;
