import { Link } from "react-router-dom";
import LocaleTrans from "../LocaleTrans";

import Avatar from "@mui/material/Avatar";

import "./index.scss";

function NavBar() {
  return (
    <div id="navbar" className="w-full px-8 py-3 flex bg-secondary2-default">
      <div className="navbar__left flex-grow">
        <div className="w-24 cursor-pointer">
          <Link to="/">
            <img src="/Logo.png" alt="main_logo" />
          </Link>
        </div>
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
