import React from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import LayoutProvider from "./layouts/LayoutProvider";
import ProtectedRoute from "./pages/auth/components/ProtectedRoute";
import Login from "./pages/auth/Login";

import { menuItems } from "shared/menu.item";
import { loginUrl } from "./routes";

const App: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Switch>
        <Route path={loginUrl} component={Login} />
        <LayoutProvider>
          {menuItems.map((item) => (
            <ProtectedRoute
              {...item}
              key={item.key}
              path={item.to}
              component={item.component}
            />
          ))}
        </LayoutProvider>
      </Switch>
    </div>
  );
};

export default App;
