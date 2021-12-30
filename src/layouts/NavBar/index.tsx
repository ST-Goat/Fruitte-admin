import { useLocation, Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LocaleTrans from "pages/common/LocaleTrans";
import AccountMenu from "./AccountMenu";

import { loginUrl } from "routes";

import "./index.scss";

export const LogoHeader = () => (
  <div className="w-24 cursor-pointer">
    <Link to="/">
      <img src="/Logo.svg" alt="main_logo" />
    </Link>
  </div>
);

function NavBar({
  sideBarExpend,
  handleExpendSideBar,
  disableExpand = false,
}: {
  sideBarExpend?: boolean;
  handleExpendSideBar?: () => void;
  disableExpand?: boolean;
}) {
  const location = useLocation();

  return (
    <div id="navbar" className="w-full pl-5 pr-8 py-2 flex bg-primary-default">
      <div className="navbar__left flex items-center flex-grow">
        {!disableExpand && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleExpendSideBar}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(sideBarExpend && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {!sideBarExpend && <LogoHeader />}
      </div>
      <div className="flex items-center navbar__right">
        <div className="navbar__locale-trans">
          <LocaleTrans />
        </div>
        {Boolean(location.pathname !== loginUrl) && (
          <div className="cursor-pointer ml-4">
            <AccountMenu />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
