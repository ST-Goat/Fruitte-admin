import { useHistory } from "react-router-dom";

import TableCustomizer from "pages/common/Table";

import { gettotalRowCurrent } from "utilities";
import { inquiryDetailUrl } from "routes";

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
  {
    id: "Action-col",
    keyLabel: "pages.inquiry.action",
    keyData: "action",
    styledHead: {
      minWidth: 150,
    },
  },
];

const fakeData = [
  {
    id: 123123,
    no: 1,
    sendDate: "1/12/2021",
    sender: "Lung Thi Linh",
    email: "lunglinh@gmail.com",
    content:
      "I want to know how to book an activity at the same time as your scheduled event. What's a best practice?",
    action: () => (
      <span className="underline active:transform active:scale-95 cursor-pointer inline-block">
        View Details
      </span>
    ),
  },
];

const InquiryView = () => {
  const history = useHistory();

  return (
    <div>
      <TableCustomizer
        headers={headers}
        loading={false}
        hover
        totalRow={gettotalRowCurrent(100, 1, 10)}
        handleClickRow={(row) => {
          history.push(`${inquiryDetailUrl}/${row.id}`);
        }}
        data={fakeData}
      />
    </div>
  );
};

export default InquiryView;
