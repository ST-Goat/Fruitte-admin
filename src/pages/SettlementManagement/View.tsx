import TableCustomizer from "pages/common/Table";

import { gettotalRowCurrent } from "utilities";

const headers = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
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
    keyLabel: "pages.settlement.AccountNumber",
    keyData: "accountNumber",
  },
  {
    id: "Price-col",
    keyLabel: "pages.settlement.price",
    keyData: "price",
  },
  {
    id: "Settlement-cycle-col",
    keyLabel: "pages.settlement.settlementCycle",
    keyData: "settlementCycle",
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

const fakeData = [
  {
    id: 123123,
    no: 1,
    farmName: "농장명",
    name: "홍길동",
    accountHolder: "홍길동",
    bankName: "농협",
    accountNumber: "010-1234-1234",
    price: "10,000원",
    settlementCycle: "2주",
    state: "정산 가능",
    settlementDay: "2021/01/01",
  },
];

function SettlementManagementView() {
  return (
    <div>
      <TableCustomizer
        headers={headers}
        loading={false}
        totalRow={gettotalRowCurrent(100, 1, 10)}
        data={fakeData}
      />
    </div>
  );
}

export default SettlementManagementView;
