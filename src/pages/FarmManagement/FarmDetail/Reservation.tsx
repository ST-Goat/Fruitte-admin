import React from "react";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import { useHistory } from "react-router-dom";

import { farmReservationUrl } from "routes";

const ReservationItem = () => {
  const history = useHistory();

  const handleEdit = () => {
    history.push(`${farmReservationUrl}/test-id`);
  };
  const handleDelete = () => {
    console.log("handleDelete");
  };
  return (
    <div
      style={{ minHeight: "96px" }}
      className="flex p-9 border-b-2 border-grey-100 hover:bg-grey-100"
    >
      <div className="px-8">
        <Text className="font-bold text-center">
          19:00 <br /> 2021/10/10
        </Text>
        <Text className="text-center">예약일 : 10/09/2021 </Text>
      </div>
      <div className="flex-grow">
        체험명 <br />
        시간 <br />
        참여팀 <br />
        옵션정보
      </div>
      <div className="flex flex-col justify-evenly">
        <ButtonCustomizer onClick={handleEdit}>수정</ButtonCustomizer>
        <ButtonCustomizer color="secondary" onClick={handleDelete}>
          예약취소
        </ButtonCustomizer>
      </div>
    </div>
  );
};

function Reservation() {
  return (
    <div>
      <div className="bg-secondary1-default h-16 rounded-t-lg pl-4 pt-4 text-lg font-bold text-white-default">
        RESERVATION LIST
      </div>
      <div>
        {[1, 2, 3].map((item) => (
          <ReservationItem key={item} />
        ))}
      </div>
    </div>
  );
}

export default Reservation;
