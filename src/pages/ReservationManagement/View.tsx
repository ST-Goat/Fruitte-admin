import { useHistory } from "react-router-dom";

import TableCustomizer from "pages/common/Table";

import { gettotalRowCurrent } from "utilities";
import { bookingDetailUrl } from "routes";

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
  },
  {
    id: "Booking-date-col",
    keyLabel: "pages.reservation.bookingDate",
    keyData: "bookingDate",
  },
  {
    id: "User-col",
    keyLabel: "pages.reservation.user",
    keyData: "user",
  },
  {
    id: "Activity-name-col",
    keyLabel: "pages.reservation.activityName",
    keyData: "activityName",
  },
  {
    id: "Status-col",
    keyLabel: "common.status",
    keyData: "status",
  },
  {
    id: "Cancel-action-col",
    keyLabel: "common.cancel",
    keyData: "cancel",
  },
];

const fakeData = [
  {
    id: 123123,
    no: 1,
    bookingDate: "1/12/2021",
    user: "junghaein123",
    activityName: () => (
      <div>
        <p className="text-blue-300">Happy Farm</p>
        <p>Plant trees</p>
      </div>
    ),
    status: "Booked",
    view: () => (
      <span className="underline active:transform active:scale-95 cursor-pointer inline-block">
        View Details
      </span>
    ),
    cancel: () => (
      <span className="underline active:transform active:scale-95 cursor-pointer inline-block">
        Cancel
      </span>
    ),
  },
];

function ReservationView({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: any[];
}) {
  const history = useHistory();

  return (
    <div>
      <TableCustomizer
        headers={headers}
        loading={isLoading}
        hover
        totalRow={gettotalRowCurrent(100, 1, 10)}
        handleClickRow={(row) => {
          history.push(`${bookingDetailUrl}/${row.id}`);
        }}
        data={data}
      />
    </div>
  );
}

export default ReservationView;
