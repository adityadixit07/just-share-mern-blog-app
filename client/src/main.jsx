import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Store, persistor } from "./redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      {/* <App /> */}
      <PersistGate  persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
