import AdminTable from "./AdminTable";
import UserDetailHeader from "./Header";

function UserDetailView({
  handleCancleReservation,
}: {
  handleCancleReservation: (id: any) => void;
}) {
  return (
    <div>
      <UserDetailHeader />
      <div className="mt-6">
        <AdminTable handleCancleReservation={handleCancleReservation} />
      </div>
    </div>
  );
}

export default UserDetailView;
