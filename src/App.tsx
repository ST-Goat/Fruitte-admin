
import React from 'react';
import { Route, Switch } from 'react-router';
import './App.scss';
import ProtectedRoute from './pages/auth/components/ProtectedRoute';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import { homepageUrl, loginUrl } from './routes';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Switch>
        <Route path={loginUrl} component= {Login} />
        <ProtectedRoute path = {homepageUrl} component = {Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
