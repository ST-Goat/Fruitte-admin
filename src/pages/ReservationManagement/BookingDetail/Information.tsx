/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import ButtonCustomizer from "pages/common/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { format, addMinutes } from "date-fns";
import { ReservationStatus } from "services/reservation";

const modalStyles = {
  position: "absolute" as "absolute",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 336,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Bill = ({
  data,
  activityName,
  duration,
  startAt,
}: {
  data: any;
  activityName: string;
  duration: number;
  startAt: string;
}) => {
  return (
    <ul>
      <h3 className="text-xl font-bold">
        {format(new Date(data?.createdAt), "yyyy/MM/dd")}
      </h3>
      <h4 className="text-md font-bold">Information</h4>
      <li className="flex items-center py-4 justify-between border-b border-grey-default">
        <div className="text-grey-300">Status</div>
        <div className="font-medium">{data?.billStatus}</div>
      </li>
      <li className="flex items-center py-4 justify-between border-b border-grey-default">
        <div className="text-grey-300">Activity</div>
        <div className="font-medium">{activityName}</div>
      </li>
      {/* <li className="flex items-center py-4 justify-between border-b border-grey-default">
        <div className="text-grey-300">Additional service</div>
        <div className="font-medium">Service 1</div>
      </li> */}
      <li className="flex items-center py-4 justify-between border-b border-grey-default">
        <div className="text-grey-300">Time</div>
        <div className="font-medium">{`${format(
          new Date(startAt),
          "HH:mm"
        )} - ${format(addMinutes(new Date(startAt), duration), "HH:mm")}`}</div>
      </li>
      <li className="flex items-center py-4 justify-between border-b border-grey-default">
        <div className="text-grey-300">People</div>
        <div className="font-medium">{data?.teamType}</div>
      </li>
      <li className="pt-2 font-bold">Price</li>
      <li className="flex items-center py-4 justify-between">
        <div className="text-grey-300">Total price</div>
        <div className="text-green-700">{data?.totalPrice}</div>
      </li>
    </ul>
  );
};

const BookingInformation = ({
  handleCancel,
  detail,
}: {
  handleCancel: () => void;
  detail: any;
}) => {
  const [viewBill, setViewBill] = useState(false);
  const { t } = useTranslation();

  const handleViewBill = () => {
    setViewBill(true);
  };

  if (!detail) return <>Oopp... Something went wrong!</>;
  const {
    bill,
    user,
    farmActivity,
    farmInfo,
    teamType,
    startAt,
    reservationStatus,
    farmSchedule,
  } = detail;
  return (
    <>
      <div
        className={classNames(
          "p-4 mx-32 my-8",
          "rounded rounded-lg border borde-grey-default",
          "text-center"
        )}
      >
        <h2 className="text-xl font-bold">
          {farmInfo?.name} <br /> {farmActivity?.name} <br />
          {(function () {
            switch (reservationStatus) {
              case ReservationStatus.BOOKING:
                return (
                  <div className="text-center text-success-default">
                    {t("pages.reservation.bookingStatus")}
                  </div>
                );
              case ReservationStatus.CANCELLED:
                return (
                  <div className="text-center text-error-default">
                    {t("pages.reservation.cancelStatus")}
                  </div>
                );
              case ReservationStatus.COMPLETED:
                return (
                  <div className="text-center text-black-default">
                    {t("pages.reservation.completeStatus")}
                  </div>
                );
              default:
                return <>-</>;
            }
          })()}
        </h2>
        <section className="flex justify-end">
          <div style={{ minWidth: 200 }} className="mr-8">
            <b>User:</b>
            <p>{user?.name ?? "-"}</p>
          </div>
          <div style={{ minWidth: 200 }}>
            <b>Booking date:</b>
            <p>
              {Boolean(startAt) ? format(new Date(startAt), "yyyy/MM/dd") : "-"}
            </p>
          </div>
        </section>
        <section className="mt-8 flex">
          <div className="mr-4">
            <img
              src={farmActivity.mainPictureUrl}
              style={{ width: 520, height: 400 }}
              alt="farm-picture"
            />
          </div>
          <div
            className={classNames(
              "mr-8 flex items-center",
              "font-bold text-center"
            )}
          ></div>
          <ul>
            <li className="font-bold text-left">
              Farm Location: {farmInfo?.address}
            </li>
            <li className="font-bold text-left">{`${t(
              "pages.reservation.phoneNumber"
            )}: ${farmInfo?.phone}`}</li>
            <li className="font-bold text-left">{`${t(
              "pages.reservation.staff"
            )}: ${farmInfo?.email}`}</li>
            <li className="font-bold text-left">{`${t(
              "pages.reservation.price"
            )}: ${bill?.totalPrice}`}</li>
            <li className="font-bold text-left">{`${t(
              "pages.reservation.type"
            )}: ${teamType}`}</li>
            <li className="font-bold text-left">{`${t(
              "pages.reservation.additonalService"
            )}: ${Object.keys(farmActivity?.servicePrice).map(
              (key) => `${key}: ${farmActivity?.servicePrice[key]} `
            )}`}</li>
          </ul>
        </section>
        <div className="mt-36 mb-16 flex justify-center">
          <ButtonCustomizer
            style={{ minWidth: 200 }}
            color="secondary"
            className="mr-8"
            disabled={reservationStatus !== ReservationStatus.BOOKING}
            onClick={handleCancel}
          >
            {t("pages.reservation.cancelReservation")}
          </ButtonCustomizer>
          <ButtonCustomizer
            disabled={!bill}
            style={{ minWidth: 200 }}
            onClick={handleViewBill}
          >
            {t("pages.reservation.viewBill")}
          </ButtonCustomizer>
        </div>
      </div>
      <Modal
        open={viewBill}
        onClose={() => {
          setViewBill(false);
        }}
      >
        <Box sx={{ ...modalStyles }}>
          <Bill
            data={bill}
            activityName={farmActivity?.name}
            duration={farmActivity?.duration}
            startAt={farmSchedule?.startAt}
          />
        </Box>
      </Modal>
    </>
  );
};

export default BookingInformation;
