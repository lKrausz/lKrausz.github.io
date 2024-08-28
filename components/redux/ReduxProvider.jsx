import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // Путь к файлу store.js

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
