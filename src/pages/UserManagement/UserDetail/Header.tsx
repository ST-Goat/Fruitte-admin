import { useTranslation } from "react-i18next";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";

import BreadCrumb, { BreadItem } from "pages/common/BreadCrumb";
import SearchField from "../components/SearchField";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Text from "pages/common/components/Text";

import { userManagementUrl } from "routes";
import ButtonCustomizer from "pages/common/Button";

function UserDetailHeader() {
  const { t } = useTranslation();
  let { id }: { id: string } = useParams();
  const breadCrumbs: BreadItem[] = [
    { keyLabel: "pages.userManagement.title", href: userManagementUrl },
    {
      keyLabel: "pages.userManagement.userDetails",
      href: `${userManagementUrl}/${id}`,
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
                sx={{ width: 92, height: 92 }}
                alt="#user"
                src="https://i.pravatar.cc/300"
              />
              <div className="ml-3">
                <Text className="font-bold text-xl">홍길동</Text>
                <Text className="font-bold text-xl">abc@gmail.com</Text>
                <Text
                  className={cn(
                    "w-max px-4 py-1",
                    "font-bold bg-grey-400 text-center text-sm",
                    false ? "text-red-700" : "text-primary-default"
                  )}
                >
                  일반
                </Text>
              </div>
            </div>
            <div className="mt-8 font-bold text-xl">예약 목록</div>
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
              <SearchField
                name="search"
                onChange={(e: React.ChangeEvent<any>) => {}}
                placeholder={t("")}
                style={{ minWidth: "480px" }}
              />
              <div className="ml-4">
                <ButtonCustomizer
                  variant="primary"
                  className="text-white font-bold"
                  onClick={() => {
                    console.log("test");
                  }}
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
