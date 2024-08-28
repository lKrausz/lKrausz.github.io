// LoaderContext.js
import React, { createContext, useContext, Component } from "react";

const LoaderContext = createContext();

export class LoaderProvider extends Component {
  state = {
    isLoading: false,
  };

  setIsLoading = (isLoading) => {
    this.setState({ isLoading });
  };

  render() {
    const { children } = this.props;
    return (
      <LoaderContext.Provider
        value={{ isLoading: this.state.isLoading, setIsLoading: this.setIsLoading }}
      >
        {children}
      </LoaderContext.Provider>
    );
  }
}

export function useLoader() {
  return useContext(LoaderContext);
}
