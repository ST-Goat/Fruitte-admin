import { useTranslation } from "react-i18next";

import TablePaginations from "pages/common/Paginations";
import TableCustomizer from "pages/common/Table";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import { Pagination } from "shared/comom.enum";

const headers = [
  {
    id: "Date-col",
    keyLabel: "pages.userManagement.date",
    keyData: "date",
    styledHead: {
      style: { minWidth: "100px" },
    },
  },
  {
    id: "Information-col",
    keyLabel: "pages.userManagement.farmInformation",
    keyData: "farmInformation",
    styledHead: {
      style: { minWidth: "300px", maxWidth: "350px" },
    },
    styledBodyCol: {
      style: { minWidth: "300px", maxWidth: "350px" },
    },
  },
  {
    id: "Price-col",
    keyLabel: "pages.userManagement.price",
    keyData: "price",
    styledHead: {
      style: { minWidth: "100px" },
    },
  },
];

export type AdminTableProps = {
  data: { data: Array<any>; total: number };
  isLoading: boolean;
  pagination: Pagination;
  setPagination: React.Dispatch<Pagination>;
  handleCancleReservation: (id: any) => void;
};

const convertDataToView = (
  reservationData: Array<any>,
  translate: (text: string) => string,
  handleCancel: (id: string | number) => void
) => {
  return reservationData.map((item, i) => ({
    ...item,
    date: () => (
      <div>
        <Text className="font-bold text-base">19:00</Text>
        <Text className="font-bold text-base">2021/10/10</Text>
        <Text className="mt-4 font-bold text-base">예약일: 10/09/2021 </Text>
      </div>
    ),
    farmInformation: () => (
      <div>
        <Text className="text-left font-bold text-base">농장명</Text>
        <Text className="text-left font-bold text-base">체험명</Text>
        <Text className="mt-6 text-left text-base pr-32">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod commodi
          velit eum voluptatem non saepe totam. Excepturi, molestiae! Molestias
          alia
        </Text>
      </div>
    ),
    price: () => (
      <div>
        <Text className="mb-4 font-bold text-base">10.000 원</Text>
        <ButtonCustomizer
          color="red"
          variant="primary"
          onClick={() => {
            handleCancel(item.id);
          }}
        >
          {translate("pages.userManagement.cancelReservation")}
        </ButtonCustomizer>
      </div>
    ),
  }));
};

function AdminTable({
  data,
  pagination,
  isLoading,
  setPagination,
  handleCancleReservation,
}: AdminTableProps) {
  const { t } = useTranslation();

  return (
    <TablePaginations
      count={data.total}
      rowsPerPage={pagination.pageSize}
      page={pagination.page}
      handleChangePage={(newPage) => {
        setPagination({ ...pagination, page: newPage });
      }}
    >
      <div className="rounded-md border-2 border-grey-300">
        <TableCustomizer
          headers={headers}
          loading={isLoading}
          totalRow={pagination.pageSize}
          data={convertDataToView(data.data, t, handleCancleReservation)}
        />
      </div>
    </TablePaginations>
  );
}

export default AdminTable;
