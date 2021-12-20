import { useTranslation } from "react-i18next";

import ButtonCustomizer from "pages/common/Button";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

export enum ModalType {
  settle = "settle",
  unsettled = "unsettled",
}

const ConfirmModal = ({
  open,
  handleAccepted,
  handleClose,
  type,
}: {
  open: boolean;
  handleClose: () => void;
  handleAccepted: () => void;
  type: ModalType | null;
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyles }}>
        <h2 className="text-center">
          {type === ModalType.settle
            ? t("pages.settlement.confirmSettled")
            : t("pages.settlement.confirmUnsettled")}
        </h2>
        <div className="mt-4 flex justify-center items-center">
          <ButtonCustomizer
            className="mr-4 px-8 w-1/3"
            onClick={handleAccepted}
          >
            {t("common.process")}
          </ButtonCustomizer>
          <ButtonCustomizer
            color="secondary"
            className="px-8 w-1/3"
            onClick={handleClose}
          >
            {t("common.cancel")}
          </ButtonCustomizer>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
