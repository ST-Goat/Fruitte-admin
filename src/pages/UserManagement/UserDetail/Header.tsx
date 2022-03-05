import { useTranslation } from "react-i18next";
import cn from "classnames";
import { Link } from "react-router-dom";

import BreadCrumb, { BreadItem } from "pages/common/BreadCrumb";
import SearchBox from "pages/common/SearchBox";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Text from "pages/common/components/Text";

import { userManagementUrl } from "routes";
import ButtonCustomizer from "pages/common/Button";
import type { User } from "services/userManagement";

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
  const breadCrumbs: BreadItem[] = [
    { keyLabel: "pages.userManagement.title", href: userManagementUrl },
    {
      keyLabel: "pages.userManagement.userDetails",
      href: `${userManagementUrl}/${data.id}`,
    },
  ];
  return (
    <div>
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
              <Link className="ml-8 underline text-xl hover:opacity-80" to="#">
                {t("pages.userManagement.deleteMember")}
              </Link>
              <Link className="ml-8 underline text-xl hover:opacity-80" to="#">
                {t("pages.userManagement.resetPassword")}
              </Link>
              <Link className="ml-8 underline text-xl hover:opacity-80" to="#">
                {t("pages.userManagement.farmAuthorization")}
              </Link>
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
    </div>
  );
}

export default UserDetailHeader;
