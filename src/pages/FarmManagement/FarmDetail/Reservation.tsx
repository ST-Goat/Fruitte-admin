import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import ConfirmModal from "pages/common/ConfirmModal";

import {
  fetchReservations,
  cancelReservationById,
  ReservationStatus,
} from "services/reservation";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useAppDispatch } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";
import classNames from "classnames";

const ReservationItem = ({
  data,
  handleCancel,
}: {
  data: any;
  handleCancel: () => void;
}) => {
  const { farmSchedule, farmInfo, farmActivity } = data;

  const totalParticipants =
    (farmSchedule?.oneMemberCapacity ?? 0) +
    (farmSchedule?.twoMembersCapacity ?? 0) +
    (farmSchedule?.threeMembersCapacity ?? 0) +
    (farmSchedule?.fourMembersCapacity ?? 0);
  return (
    <div
      style={{ minHeight: "96px" }}
      className="flex p-9 border-b-2 border-grey-100 hover:bg-grey-100"
    >
      <div className="px-8">
        <Text className="font-bold text-center">
          {format(new Date(farmSchedule.startAt), "HH:mm")} <br />
          {format(new Date(farmSchedule.startAt), "yyyy/MM/dd")}
        </Text>
        <Text className="text-center">
          예약일 : {format(new Date(farmSchedule.createdAt), "yyyy/MM/dd")}{" "}
        </Text>
        <Text
          className={classNames(
            "font-bold text-center",
            (function () {
              switch (data.reservationStatus) {
                case ReservationStatus.BOOKING:
                  return "text-black-default";
                case ReservationStatus.COMPLETED:
                  return "text-success-default";
                case ReservationStatus.CANCELLED:
                  return "text-error-default";
                default:
                  return "";
              }
            })()
          )}
        >
          {data.reservationStatus}
        </Text>
      </div>
      <div className="flex-grow">
        {farmInfo.name} <br />
        {farmInfo.phone} <br />
        {farmActivity.duration}분<br />
        {totalParticipants} <br />
        {Object.keys(farmActivity.servicePrice).map(
          (key) => `${key}: ${farmActivity.servicePrice[key]}; `
        )}
      </div>
      <div className="flex flex-col justify-evenly">
        {/* <ButtonCustomizer onClick={handleEdit}>수정</ButtonCustomizer> */}
        {data.reservationStatus === ReservationStatus.BOOKING && (
          <ButtonCustomizer color="secondary" onClick={handleCancel}>
            예약취소
          </ButtonCustomizer>
        )}
      </div>
    </div>
  );
};

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [idCancel, setIdCancel] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id: farmId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const getReservations = async ({ farmId }: { farmId: string | number }) => {
    setIsLoading(true);
    try {
      const response = await fetchReservations({ farmId });
      setReservations(response.content);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestCancelReservation = async (id: string) => {
    try {
      const response = await cancelReservationById(id);
      if (response.status === HttpStatus.OK) {
        await getReservations({ farmId: farmId });
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
    getReservations({ farmId: farmId });
  }, []);

  return (
    <>
      <div className="bg-secondary1-default h-16 rounded-t-lg pl-4 pt-4 text-lg font-bold text-white-default">
        RESERVATION LIST
      </div>
      <div>
        {isLoading ? (
          <>{t("common.loading")}</>
        ) : (
          reservations.map((item: any) => (
            <ReservationItem
              key={item.id}
              data={item}
              handleCancel={() => {
                setIdCancel(item.id);
                setIsOpenModal(true);
              }}
            />
          ))
        )}
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleAccepted={() => {
          if (idCancel) {
            requestCancelReservation(idCancel);
            setIsOpenModal(false);
          }
        }}
        handleClose={() => {
          setIsOpenModal(false);
          setIdCancel(null);
        }}
        title={t("pages.reservation.cancelReservationTitle")}
      />
    </>
  );
}

export default Reservation;
