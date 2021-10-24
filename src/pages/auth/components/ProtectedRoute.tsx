import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps, useLocation } from "react-router";
import { RootState } from "../../../features/store";
import { loginUrl } from "../../../routes";

const ProtectedRoute: React.FC<RouteProps> = (props) =>{
  // get location
  const currentLocation = useLocation();
  // get auth status from state
  const authStatus = useSelector((state:RootState) =>{
    return "state";
  })
  if( authStatus === 'Authenticated'){
    return <Route {...props} />
  }else {
    return (
      <Redirect to = {{pathname: loginUrl, state: { from: currentLocation}}} />
    )
  }
}
export default ProtectedRoute;