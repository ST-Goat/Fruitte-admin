import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./i18n";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/tailwind.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { ConnectedRouter } from "connected-react-router";

import { store } from "./redux/store";
import i18n from "./i18n";
import history from "utilities/history";

ReactDOM.render(
  <Suspense fallback="loading">
    <BrowserRouter>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ConnectedRouter>
      </Provider>
    </BrowserRouter>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
