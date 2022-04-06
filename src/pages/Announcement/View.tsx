import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import DOMPurify from "dompurify";

import TableCustomizer from "pages/common/Table";
import ButtonCustomizer from "pages/common/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { gettotalRowCurrent } from "utilities/paginations";
import { announcementUrl } from "routes";
import { format } from "date-fns/esm";
import { HttpStatus, Pagination, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { deleteAnnouncement } from "services/announcement";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { useAppDispatch } from "utilities/useHook";

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
    keyLabel: "pages.farmManagement.sendDate",
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
  type: "create" | "delete" | null;
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
  history: any,
  Modals: { [key: string]: ModalContentType },
  pagination: Pagination,
  handleOpenModal: (modal: ModalContentType, id: any) => void
) => {
  return data.map((item, index) => ({
    ...item,
    no: (pagination.page - 1) * pagination.pageSize + index + 1,
    creationDate: format(new Date(item.createdAt), "yyyy/MM/dd"),
    content: () => (
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
      />
    ),
    delete: () => (
      <DeleteIcon
        onClick={() => {
          handleOpenModal(Modals.delete, item.id);
        }}
        className="cursor-pointer active:transform active:scale-75"
      />
    ),
    edit: () => (
      <EditIcon
        onClick={() => {
          history.push(`${announcementUrl}/${item.id}`);
        }}
        className="cursor-pointer active:transform active:scale-75"
      />
    ),
  }));
};

function AnnouncementView({
  isLoading,
  announcements,
  pagination,
  handleRefresh,
}: {
  isLoading: boolean;
  announcements: { data: any[]; total: number };
  pagination: Pagination;
  handleRefresh: () => void;
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const Modals: { [key: string]: ModalContentType } = {
    create: {
      type: "create",
      title: t("pages.announcement.createModalTitle"),
      leftBtn: t("common.create"),
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
  const dispatch = useAppDispatch();

  const handleOpenModal = (modal: ModalContentType, id: any) => {
    setModalContent(modal);
    setIdSelected(id);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIdSelected(null);
  };

  const deletingAnnouncement = async (_id: string) => {
    try {
      const response = await deleteAnnouncement({ id: _id });
      if (response.status === HttpStatus.OK) {
        handleRefresh();
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
      handleCloseModal();
    }
  };

  const handleAccepted = () => {
    switch (modalContent.type) {
      case "create":
        history.push(`${announcementUrl}/create`);
        break;
      case "delete":
        if (idSelected) deletingAnnouncement(idSelected);
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
        loading={isLoading}
        totalRow={gettotalRowCurrent(100, 1, 10)}
        data={convertData(
          announcements.data,
          history,
          Modals,
          pagination,
          handleOpenModal
        )}
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
