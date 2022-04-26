import { format } from "date-fns";
import CheckBoxCustomizer from "pages/common/CheckBox";
import TableCustomizer from "pages/common/Table";
import { useState } from "react";
import { PaymentStatus } from "services/settlements";
import { Pagination } from "shared/comom.enum";

import { formatNumber, gettotalRowCurrent } from "utilities";

const headers = [
  {
    id: "Check-box",
    label: "",
    keyData: "checkBox",
    styledHead: {
      width: '50px'
    }
  },
  {
    id: "Farm-col",
    keyLabel: "pages.settlement.farmName",
    keyData: "farmName",
  },
  {
    id: "Name-col",
    keyLabel: "pages.settlement.name",
    keyData: "name",
  },
  {
    id: "Account-holder-col",
    keyLabel: "pages.settlement.accountHolder",
    keyData: "accountHolder",
  },
  {
    id: "Bank-col",
    keyLabel: "pages.settlement.bank",
    keyData: "bankName",
  },
  {
    id: "Account-col",
    keyLabel: "pages.settlement.accountNumber",
    keyData: "accountNumber",
  },
  {
    id: "Price-col",
    keyLabel: "pages.settlement.price",
    keyData: "price",
  },
  {
    id: "State-col",
    keyLabel: "pages.settlement.state",
    keyData: "state",
  },
  {
    id: "Date-col",
    keyLabel: "pages.settlement.settlementDay",
    keyData: "settlementDay",
  },
];

const convertDataToView = (data: any[], page: number, pageSize: number, listIdSelected: Array<number | string>, callbackCheckBox: (id: string | number) => void) => {

  return data.map((item, i) => ({
    ...item,
    checkBox: () => <CheckBoxCustomizer
      checked={listIdSelected.includes(item.id)}
      onClick={(event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        callbackCheckBox(item.id)
      }}
    />,
    name: item.bookedUser.name,
    accountNumber: item.bankAccountNumber,
    price: `${formatNumber(item.farmerReceive)}원`,
    state: item.billStatus === PaymentStatus.SETTLED ? "정산 가능" : "결제불가",
    settlementDay: format(new Date(item.settlementDay), "yyyy/MM/dd")
  }))
}

function SettlementManagementView({
  loading,
  data,
  total,
  pagination,
  listIdSelected,
  callbackCheckBox
}: {
  loading: boolean,
  data: any[];
  total: number;
  pagination: Pagination,
  callbackCheckBox: (id: string | number) => void;
  listIdSelected: Array<string | number>
}) {
  return (
    <div>
      <TableCustomizer
        headers={headers}
        loading={loading}
        totalRow={gettotalRowCurrent(total, pagination.page, pagination.pageSize)}
        data={convertDataToView(data, pagination.page, pagination.pageSize, listIdSelected, callbackCheckBox)}
      />
    </div>
  );
}

export default SettlementManagementView;
