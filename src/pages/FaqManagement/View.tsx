import TableCustomizer from "pages/common/Table";
import { FaqItem } from "services/faq";
import { Pagination } from "shared/comom.enum";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { gettotalRowCurrent } from "utilities";
import { Faqs } from "./Container";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { faqDetailUrl } from "routes";

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
    styledHead: {
      style: { width: "60px", textAlign: "left" },
    },
    styledBodyCol: {
      style: { width: "60px", textAlign: "left" },
    },
  },
  {
    id: "Question-col",
    keyLabel: "pages.faq.question",
    keyData: "question",
    styledHead: {
      style: { textAlign: "left" },
    },
    styledBodyCol: {
      style: { textAlign: "left" },
    },
  },
  {
    id: "Answer-col",
    keyLabel: "pages.faq.answer",
    keyData: "answer",
    styledHead: {
      style: { textAlign: "left" },
    },
    styledBodyCol: {
      style: { textAlign: "left" },
    },
  },
  {
    id: "Create-date-col",
    keyLabel: "pages.faq.createAt",
    keyData: "createAt",
  },
  {
    id: "Edit-col",
    keyLabel: "pages.faq.edit",
    keyData: "editAction",
    styledHead: {
      style: { width: "80px" },
    },
    styledBodyCol: {
      style: { width: "80px" },
    },
  },
  {
    id: "Delete-col",
    keyLabel: "pages.faq.delete",
    keyData: "deleteAction",
    styledHead: {
      style: { width: "80px" },
    },
    styledBodyCol: {
      style: { width: "80px" },
    },
  },
];

const convertFaqToViews = (
  data: FaqItem[],
  pagination: Pagination,
  actions: {
    handleEdit: (id: number | string) => void;
    handleDelete: (id: number | string) => void;
  }
) => {
  const { page, pageSize } = pagination;
  const { handleEdit, handleDelete } = actions;
  return data.map((item, index) => ({
    id: item.id,
    no: (page - 1) * pageSize + index + 1,
    question: item.question,
    answer: () => <div dangerouslySetInnerHTML={{ __html: item.answer }} />,
    createAt: "#fake",
    editAction: () => (
      <EditIcon
        className="cursor-pointer active:transform active:scale-75"
        onClick={() => {
          handleEdit(item.id);
        }}
      />
    ),
    deleteAction: () => (
      <DeleteIcon
        className="cursor-pointer active:transform active:scale-75"
        onClick={() => {
          handleDelete(item.id);
        }}
      />
    ),
  }));
};

const FaqView = ({
  faqs,
  pagination: { page, pageSize },
}: {
  faqs: Faqs;
  pagination: Pagination;
}) => {
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idSelected, setIdSelected] = useState<string | number | null>(null);

  const handleDeleteQuestion = async () => {
    // await delete idSelected
    setIdSelected(null);
    setIsOpenModal(false);
  };
  return (
    <div>
      <TableCustomizer
        headers={headers}
        loading={false}
        totalRow={gettotalRowCurrent(faqs.total, page, pageSize)}
        data={convertFaqToViews(
          faqs.data,
          { page, pageSize },
          {
            handleEdit: (id) => {
              history.push(`${faqDetailUrl}/${id}`);
            },
            handleDelete: (id) => {
              setIsOpenModal(true);
              setIdSelected(id);
            },
          }
        )}
      />
      <ConfirmModal
        open={isOpenModal}
        handleAccepted={handleDeleteQuestion}
        handleClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

export default FaqView;