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

const ConfirmModal = ({
  open,
  handleAccepted,
  handleClose,
  title,
}: {
  open: boolean;
  handleClose: () => void;
  handleAccepted: () => void;
  title: string;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyles }}>
        <h2 className="text-center">{title}</h2>
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

export default ConfirmModal;
