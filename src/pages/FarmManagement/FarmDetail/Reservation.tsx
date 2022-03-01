import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { fetchReservations, cancelReservationById } from "services/reservation";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useAppDispatch } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";

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
        <ButtonCustomizer color="secondary" onClick={handleCancel}>
          예약취소
        </ButtonCustomizer>
      </div>
    </div>
  );
};

const modalStyles = {
  position: "absolute" as "absolute",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ConfirmModal = ({
  open,
  handleAccepted,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
  handleAccepted: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyles }}>
        <h2 className="text-center">
          {t("pages.reservation.cancelReservationTitle")}
        </h2>
        <div className="mt-4 flex justify-center items-center">
          <ButtonCustomizer
            className="mr-4 px-8 w-1/3"
            onClick={handleAccepted}
          >
            Yes
          </ButtonCustomizer>
          <ButtonCustomizer
            color="secondary"
            className="px-8 w-1/3"
            onClick={handleClose}
          >
            No
          </ButtonCustomizer>
        </div>
      </Box>
    </Modal>
  );
};

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [idCancel, setIdCancel] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { id: farmId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const getReservations = async ({ farmId }: { farmId: string | number }) => {
    try {
      const response = await fetchReservations({ farmId });
      setReservations(response);
    } catch (error) {
      console.log(error);
    }
  };

  const requestCancelReservation = async (id: string) => {
    try {
      const response = await cancelReservationById(id);
      if (response.status === HttpStatus.OK) {
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
  // requestCancelReservation(item.id)
  useEffect(() => {
    getReservations({ farmId: farmId });
  }, []);

  return (
    <>
      <div className="bg-secondary1-default h-16 rounded-t-lg pl-4 pt-4 text-lg font-bold text-white-default">
        RESERVATION LIST
      </div>
      <div>
        {reservations.map((item: any) => (
          <ReservationItem
            key={item.id}
            data={item}
            handleCancel={() => {
              setIdCancel(item.id);
              setIsOpenModal(true);
            }}
          />
        ))}
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
      />
    </>
  );
}

export default Reservation;
