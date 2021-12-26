import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import LayoutProvider from "./layouts/LayoutProvider";
import ProtectedRoute from "./pages/auth/components/ProtectedRoute";
import Login from "./pages/auth/Login";
import SnackbarProvider from "layouts/Snackbar";

import { menuItems, MenuItemProps } from "shared/menu.item";
import { useAppDispatch } from "utilities/useHook";
import { loginUrl } from "./routes";
import CONFIGS from "shared/configs";
import { enqueueSnackbar } from "redux/slices/snackbar";

const generateRoutes = (menu: MenuItemProps[] | undefined) => {
  if (!menu) return;
  return menu.map((item) => (
    <React.Fragment key={item.key}>
      <ProtectedRoute {...item} path={item.to} component={item.component} />
      {Boolean(item.items) && generateRoutes(item.items)}
      {Boolean(item.subPath) && generateRoutes(item.subPath)}
    </React.Fragment>
  ));
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initialToast = sessionStorage.getItem(CONFIGS.TOAST);
    if (initialToast) {
      const toast = JSON.parse(initialToast);
      dispatch(enqueueSnackbar(toast));
      sessionStorage.removeItem(CONFIGS.TOAST);
    }
  }, []);
  return (
    <div className="flex flex-col">
      <SnackbarProvider>
        <Switch>
          <Route path={loginUrl} component={Login} />
          <LayoutProvider>{generateRoutes(menuItems)}</LayoutProvider>
        </Switch>
      </SnackbarProvider>
    </div>
  );
};

export default App;
