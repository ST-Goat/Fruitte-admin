import React from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import LayoutProvider from "./layouts/LayoutProvider";
import ProtectedRoute from "./pages/auth/components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Main from "./pages/main/Main";

import { homepageUrl, loginUrl } from "./routes";

const App: React.FC = () => {
  return (
    <div className="flex flex-col">
      <LayoutProvider>
        <Switch>
          <Route path={loginUrl} component={Login} />
          <ProtectedRoute path={homepageUrl} component={Main} />
        </Switch>
      </LayoutProvider>
    </div>
  );
};

export default App;
