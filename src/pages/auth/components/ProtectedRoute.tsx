import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps, useLocation } from "react-router";
import { RootState } from "redux/store";
import { loginUrl } from "routes";
import CONFIGS from "shared/configs";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  // get location
  const currentLocation = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem(CONFIGS.HEADER_PAYLOAD_KEY));
  // get auth status from state
  const authStatus = useSelector((state: RootState) => {
    return "Authenticated";
  });
  if (!isLoggedIn || !Boolean(authStatus === "Authenticated")) {
    return (
      <Redirect to={{ pathname: loginUrl, state: { from: currentLocation } }} />
    );
  }
  return <Route {...props} />;
};
export default ProtectedRoute;
