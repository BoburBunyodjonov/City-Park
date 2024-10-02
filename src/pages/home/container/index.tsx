import React from "react";
import { HomeContextProvider } from "../services/homeContext";
import Home from "./Home";

const index = () => {
  return (
    <HomeContextProvider>
      <Home />
    </HomeContextProvider>
  );
};

export default index;
