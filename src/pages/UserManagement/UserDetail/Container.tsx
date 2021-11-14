import { useState } from "react";
import UserDetailView from "./View";
import ConfirmModal from "./ConfirmModal";

function UserDetailContainer() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCancleReservation = (id: any) => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <div>
      <UserDetailView handleCancleReservation={handleCancleReservation} />
      <ConfirmModal open={isOpenModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default UserDetailContainer;
