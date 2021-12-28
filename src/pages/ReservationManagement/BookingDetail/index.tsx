import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import ButtonCustomizer from "pages/common/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookingInformation from "./Information";
import ConfirmModal from "./ConfirmModal";

import { Size } from "shared/comom.enum";
import { reservationManagementUrl } from "routes";

function BookingDetail() {
  const { t } = useTranslation();
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
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
        <BookingInformation
          handleCancel={() => {
            setIsOpenModal(true);
          }}
          handleViewBill={() => {}}
        />
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false);
        }}
        handleAccepted={() => {
          //do something
          setIsOpenModal(false);
        }}
      />
    </div>
  );
}

export default BookingDetail;
