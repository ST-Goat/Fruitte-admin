import UserManagementView from "./View";

function UserManagementContainer() {
  return (
    <div>
      <UserManagementView
        count={100}
        rowsPerPage={10}
        page={0}
        handleChangePage={(newPage: number) => {}}
        handleFilter={(data: any) => {}}
      />
    </div>
  );
}

export default UserManagementContainer;
