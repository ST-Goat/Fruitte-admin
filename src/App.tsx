import React from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import LayoutProvider from "./layouts/LayoutProvider";
import ProtectedRoute from "./pages/auth/components/ProtectedRoute";
import Login from "./pages/auth/Login";

import { menuItems, MenuItemProps } from "shared/menu.item";
import { loginUrl } from "./routes";

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
  return (
    <div className="flex flex-col">
      <Switch>
        <Route path={loginUrl} component={Login} />
        <LayoutProvider>{generateRoutes(menuItems)}</LayoutProvider>
      </Switch>
    </div>
  );
};

export default App;
