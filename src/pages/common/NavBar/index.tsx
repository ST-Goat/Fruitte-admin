import { Link } from "react-router-dom";
import LocaleTrans from "../LocaleTrans";
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
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
