import { useHistory } from "react-router-dom";

import TableCustomizer from "pages/common/Table";

import { gettotalRowCurrent } from "utilities";
import { inquiryDetailUrl } from "routes";
import { format } from "date-fns/esm";

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
  },
  {
    id: "Send-date-col",
    keyLabel: "pages.inquiry.sendDate",
    keyData: "sendDate",
  },
  {
    id: "Sender-col",
    keyLabel: "pages.inquiry.sender",
    keyData: "sender",
  },
  {
    id: "Email-col",
    keyLabel: "common.email",
    keyData: "email",
  },
  {
    id: "Content-col",
    keyLabel: "common.content",
    keyData: "content",
  },
];

const InquiryView = ({
  inquiries,
  loading,
  page,
  pageSize,
}: {
  inquiries: { data: any[]; total: number };
  loading: boolean;
  page: number;
  pageSize: number;
}) => {
  const history = useHistory();

  return (
    <div>
      <TableCustomizer
        headers={headers}
        loading={loading}
        hover
        totalRow={inquiries.total}
        handleClickRow={(row) => {
          history.push(`${inquiryDetailUrl}/${row.id}`);
        }}
        data={inquiries.data.map((item, i) => ({
          no: (page - 1) * pageSize + i + 1,
          sendDate: format(new Date(item.createdAt), "yyyy/MM/dd"),
          ...item,
        }))}
      />
    </div>
  );
};

export default InquiryView;
