import { useState } from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import BreadCrumb, { BreadItem } from "pages/common/BreadCrumb";
import SearchBox from "pages/common/SearchBox";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";
import ConfirmModal from "pages/common/ConfirmModal";
import PasswordModal from "./PasswordModal";

import { deleteUserWithId } from "services/userManagement";

import { userManagementUrl } from "routes";
import type { User } from "services/userManagement";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "utilities/useHook";
import { enqueueSnackbar } from "redux/slices/snackbar";

function UserDetailHeader({
  data,
  onChangeSearch,
  handleSearch,
}: {
  data: User;
  handleSearch: () => void;
  onChangeSearch: (text: string) => void;
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const breadCrumbs: BreadItem[] = [
    { keyLabel: "pages.userManagement.title", href: userManagementUrl },
    {
      keyLabel: "pages.userManagement.userDetails",
      href: `${userManagementUrl}/${data.id}`,
    },
  ];
  const [isOpenModal, setIsOpenModal] = useState({
    changePassword: false,
    deletedUser: false,
  });

  const handleDeleteUser = async (_id: string | number) => {
    try {
      const response = await deleteUserWithId(_id);
      if (response.status === HttpStatus.OK) {
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
        history.push(userManagementUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BreadCrumb data={breadCrumbs} />
      <div className="mt-6 border-b border-grey-400 pb-2">
        <Grid container>
          <Grid item xs={4}>
            <div className="flex">
              <Avatar
                sx={{ width: 92, height: 92, fontSize: "3rem" }}
                alt={
                  data?.avatarUrl
                    ? "A"
                    : data.name
                    ? data.name.charAt(0).toUpperCase()
                    : data?.email
                    ? data.email.charAt(0).toUpperCase()
                    : ""
                }
                src={data?.avatarUrl ?? "/blank_image_grey.svg"}
              />
              <div className="ml-3">
                <Text className="font-bold text-xl">{data?.name}</Text>
                <Text className="font-bold text-xl">{data?.email}</Text>
                <Text
                  className={cn(
                    "w-max px-4 py-1 mt-2",
                    "font-bold bg-grey-400 text-center text-sm",
                    data?.isActive ? "text-primary-default" : "text-red-700",
                    "bg-grey-100"
                  )}
                >
                  {data?.isActive
                    ? t("pages.userManagement.active")
                    : t("pages.userManagement.inActive")}
                </Text>
              </div>
            </div>
            <div className="mt-8 font-bold text-xl">
              {t("pages.userManagement.reservationList")}
            </div>
          </Grid>
          <Grid
            container
            item
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            xs={8}
          >
            <div className="w-full flex justify-end">
              <p
                className="ml-8 hover:underline text-xl hover:font-bold cursor-pointer"
                onClick={() => {
                  setIsOpenModal((prev) => ({ ...prev, deletedUser: true }));
                }}
              >
                {t("pages.userManagement.deleteMember")}
              </p>
              <p
                className="ml-8 hover:underline text-xl hover:font-bold cursor-pointer"
                onClick={() =>
                  setIsOpenModal((prev) => ({ ...prev, changePassword: true }))
                }
              >
                {t("pages.userManagement.resetPassword")}
              </p>
              <p className="ml-8 hover:underline text-xl hover:font-bold cursor-pointer">
                {t("pages.userManagement.farmAuthorization")}
              </p>
            </div>
            <div className="w-full flex justify-end mb-4">
              <SearchBox
                name="search"
                onChange={(e: React.ChangeEvent<any>) => {
                  onChangeSearch(e.target.value);
                }}
                placeholder={t("")}
                style={{ minWidth: "480px" }}
              />
              <div className="ml-4">
                <ButtonCustomizer
                  variant="primary"
                  className="text-white font-bold"
                  onClick={handleSearch}
                >
                  {t("common.search")}
                </ButtonCustomizer>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <ConfirmModal
        open={isOpenModal.deletedUser}
        handleAccepted={() => {
          setIsOpenModal((prev) => ({ ...prev, deletedUser: false }));
          handleDeleteUser(data.id);
        }}
        handleClose={() => {
          setIsOpenModal((prev) => ({ ...prev, deletedUser: false }));
        }}
        title={t("pages.userManagement.deleteModalTitle")}
      />

      <PasswordModal
        userId={data?.id}
        open={isOpenModal.changePassword}
        handleClose={() =>
          setIsOpenModal((prev) => ({ ...prev, changePassword: false }))
        }
      />
    </>
  );
}

export default UserDetailHeader;
