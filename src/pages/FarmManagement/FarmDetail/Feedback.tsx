import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TablePaginations from "pages/common/Paginations";
import TableCustomizer from "pages/common/Table";
import Controller from "../components/Controller";
import CheckBoxCustomizer from "pages/common/CheckBox";
import ButtonCustomizer from "pages/common/Button";

import { gettotalRowCurrent } from "utilities";

const feedbackHeaders = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
  },
  {
    id: "Farm-col",
    keyLabel: "pages.farmManagement.farmName",
    keyData: "farmName",
  },
  {
    id: "User-name-col",
    keyLabel: "common.user",
    keyData: "user",
  },
  {
    id: "Date-col",
    keyLabel: "pages.farmManagement.sendDate",
    keyData: "sendDate",
  },
  {
    id: "Content-col",
    keyLabel: "common.content",
    keyData: "content",
  },
  {
    id: "Status-col",
    keyLabel: "common.status",
    keyData: "status",
  },
  {
    id: "checkbox-col",
    keyLabel: "common.select",
    keyData: "read",
  },
];

export type Filters = {
  search: string;
};

const fakeData = [
  {
    id: "fake-1",
    no: 1,
    farmName: "Gardenista",
    user: "hansohee",
    sendDate: "30/11/2021",
    content: () => (
      <div className="flex">
        <p>The visitors had a great experience, however,......</p>
        <Link className="underline" to="#fake-1-detail">
          See more
        </Link>
      </div>
    ),
    status: () => <div className="text-primary-default">Open</div>,
    read: () => <CheckBoxCustomizer defaultChecked />,
  },
  {
    id: "fake-2",
    no: 1,
    farmName: "Gardenista",
    user: "hansohee",
    sendDate: "30/11/2021",
    content: () => (
      <div className="flex">
        <p>The visitors had a great experience, however,......</p>
        <Link className="underline" to="#fake-1-detail">
          See more
        </Link>
      </div>
    ),
    status: () => <div className="text-grey-default">Resolved</div>,
    read: () => <CheckBoxCustomizer />,
  },
];

function Feedback() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
  });
  const { t } = useTranslation();
  return (
    <>
      <Controller filters={filters} onSubmit={() => {}} onChange={() => {}} />
      <div className="mt-6 mb-16">
        <TablePaginations
          count={100}
          rowsPerPage={10}
          page={1}
          handleChangePage={() => {}}
        >
          <div className="rounded-md border-2 border-grey-300">
            <TableCustomizer
              headers={feedbackHeaders}
              hover
              loading={false}
              totalRow={gettotalRowCurrent(100, 0, 10)}
              data={fakeData}
            />
          </div>
        </TablePaginations>
      </div>
      <div className="flex justify-end">
        <ButtonCustomizer color="secondary">Mark as resolved</ButtonCustomizer>
      </div>
    </>
  );
}

export default Feedback;
