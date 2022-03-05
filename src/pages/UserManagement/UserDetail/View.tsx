import AdminTable from "./AdminTable";
import UserDetailHeader from "./Header";

import type { User } from "services/userManagement";
import type { Pagination } from "shared/comom.enum";

function UserDetailView({
  data,
  isLoading,
  reservations,
  pagination,
  setPagination,
  handleCancleReservation,
  handleSearch,
  onChangeSearch,
}: {
  data: User | null;
  isLoading: boolean;
  reservations: { data: Array<any>; total: number };
  handleCancleReservation: (id: any) => void;
  pagination: Pagination;
  setPagination: React.Dispatch<Pagination>;
  handleSearch: () => void;
  onChangeSearch: (text: string) => void;
}) {
  return (
    <div>
      {data && (
        <UserDetailHeader
          data={data}
          handleSearch={handleSearch}
          onChangeSearch={onChangeSearch}
        />
      )}
      <div className="mt-6">
        <AdminTable
          data={reservations}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          handleCancleReservation={handleCancleReservation}
        />
      </div>
    </div>
  );
}

export default UserDetailView;
