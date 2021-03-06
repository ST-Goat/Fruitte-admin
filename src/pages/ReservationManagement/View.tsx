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
