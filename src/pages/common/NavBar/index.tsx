import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LocaleTrans from "../LocaleTrans";
import "./index.scss";

export const LogoHeader = () => (
  <div className="w-24 cursor-pointer">
    <Link to="/">
      <img src="/Logo.png" alt="main_logo" />
    </Link>
  </div>
);

function NavBar({
  sideBarExpend,
  handleExpendSideBar,
}: {
  sideBarExpend?: boolean;
  handleExpendSideBar?: () => void;
}) {
  return (
    <div id="navbar" className="w-full pl-5 pr-8 py-3 flex bg-primary-default">
      <div className="navbar__left flex items-center flex-grow">
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
        {!sideBarExpend && <LogoHeader />}
      </div>
      <div className="flex items-center navbar__right">
        <div className="navbar__locale-trans">
          <LocaleTrans />
        </div>
        <div className="cursor-pointer ml-4">
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt="#user"
            src="https://i.pravatar.cc/300"
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
