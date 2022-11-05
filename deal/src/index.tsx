import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/css/tailwind.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store/root";

const getLibrary = (provider: ExternalProvider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router basename={""}>
          <App />
        </Router>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
