"use client";
import React from "react";
import SearchBrands from "./SearchBrands";
import ReduxProvider from "@/components/redux/ReduxProvider";

const SearchComponent = () => {
  return (
    <ReduxProvider>
      <SearchBrands />
    </ReduxProvider>
  );
};

export default SearchComponent;
