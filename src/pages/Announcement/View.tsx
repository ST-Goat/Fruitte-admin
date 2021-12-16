import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

import TableCustomizer from "pages/common/Table";
import ButtonCustomizer from "pages/common/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { gettotalRowCurrent } from "utilities/paginations";
import { announcementUrl } from "routes";

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
    styledHead: {
      width: "50px",
    },
  },
  {
    id: "Title-col",
    keyLabel: "common.title",
    keyData: "title",
  },
  {
    id: "Content-col",
    keyLabel: "common.content",
    keyData: "content",
  },
  {
    id: "CreationDate-col",
    keyLabel: "pages.announcement.title",
    keyData: "creationDate",
  },
  {
    id: "Delete-col",
    keyLabel: "common.delete",
    keyData: "delete",
    styledHead: {
      width: "80px",
    },
  },
  {
    id: "Edit-col",
    keyLabel: "common.edit",
    keyData: "edit",
    styledHead: {
      width: "80px",
    },
  },
];

const modalStyles = {
  position: "absolute" as "absolute",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type ModalContentType = {
  type: "create" | "edit" | "delete" | null;
  title: string;
  leftBtn: string;
  rightBtn: string;
};

const ConfirmModal = ({
  open,
  handleAccepted,
  handleClose,
  content,
}: {
  open: boolean;
  handleClose: () => void;
  handleAccepted: () => void;
  content: ModalContentType;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyles, width: 400 }}>
        <h2 className="text-center">{content.title}</h2>
        <div className="mt-4 flex justify-center items-center">
          <ButtonCustomizer
            className="mr-4 px-8 w-1/3"
            onClick={handleAccepted}
          >
            {content.leftBtn}
          </ButtonCustomizer>
          <ButtonCustomizer
            color="secondary"
            className="px-8 w-1/3"
            onClick={handleClose}
          >
            {content.rightBtn}
          </ButtonCustomizer>
        </div>
      </Box>
    </Modal>
  );
};

const convertData = (
  data: any[],
  Modals: { [key: string]: ModalContentType },
  handleOpenModal: (modal: ModalContentType, id: any) => void
) => {
  const fakeData = [
    {
      id: "fake-id-1",
      no: 1,
      title: "test-title",
      content: "test-content",
      creationDate: new Date().toLocaleDateString(),
      delete: () => (
        <DeleteIcon
          onClick={() => {
            handleOpenModal(Modals.delete, "fake-id-1");
          }}
          className="cursor-pointer active:transform active:scale-75"
        />
      ),
      edit: () => (
        <EditIcon
          onClick={() => {
            handleOpenModal(Modals.edit, "fake-id-1");
          }}
          className="cursor-pointer active:transform active:scale-75"
        />
      ),
    },
  ];
  return fakeData;
};

function AnnouncementView() {
  const { t } = useTranslation();
  const history = useHistory();
  const Modals: { [key: string]: ModalContentType } = {
    create: {
      type: "create",
      title: t("pages.announcement.createModalTitle"),
      leftBtn: t("common.create"),
      rightBtn: t("common.cancel"),
    },
    edit: {
      type: "edit",
      title: t("pages.announcement.editModalTitle"),
      leftBtn: t("common.edit"),
      rightBtn: t("common.cancel"),
    },
    delete: {
      type: "delete",
      title: t("pages.announcement.deleteModalTitle"),
      leftBtn: t("common.delete"),
      rightBtn: t("common.cancel"),
    },
  };
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>({
    type: null,
    title: "",
    leftBtn: "",
    rightBtn: "",
  });
  const [idSelected, setIdSelected] = useState(null);
  const [announcementList, setAnnouncementList] = useState([]);

  const handleOpenModal = (modal: ModalContentType, id: any) => {
    setModalContent(modal);
    setIdSelected(id);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIdSelected(null);
  };

  const handleAccepted = () => {
    switch (modalContent.type) {
      case "create":
        history.push(`${announcementUrl}/create`);
        break;
      case "edit":
        history.push(`${announcementUrl}/${idSelected}`);
        break;
      case "delete":
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-2xl">{t("pages.announcement.title")}</h1>
        <Link to={`${announcementUrl}/create`}>
          <ButtonCustomizer>
            + {t("pages.announcement.createAnnouncement")}
          </ButtonCustomizer>
        </Link>
      </div>
      <TableCustomizer
        headers={headers}
        hover={false}
        loading={false}
        totalRow={gettotalRowCurrent(100, 1, 10)}
        data={convertData(announcementList, Modals, handleOpenModal)}
        handleClickRow={(row) => {
          // history.push(`${location.pathname}/${row.id}`);
        }}
      />
      <ConfirmModal
        open={isOpenModal}
        handleAccepted={handleAccepted}
        handleClose={handleCloseModal}
        content={modalContent}
      />
    </div>
  );
}

export default AnnouncementView;
