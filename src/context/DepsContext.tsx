import { createContext, ReactNode, useContext, useMemo } from "react";
import { HttpClient } from "../services/HttpClient";

import { IServiceFactory } from "../services/types";

interface IProps {
  children: ReactNode;
  servicesFactory: (initialClient?: HttpClient) => IServiceFactory;
}

export interface IState {
  servicesFactory: (initialClient?: HttpClient) => IServiceFactory;
}

const DepsContext = createContext<IState | undefined>(undefined);

export const DepsProvider = ({ children, ...services }: IProps) => {
  const contextValue = useMemo(() => ({ ...services }), [services]);

  return (
    <DepsContext.Provider value={contextValue}>{children}</DepsContext.Provider>
  );
};

export const useDeps = () => {
  const state = useContext(DepsContext);

  if (state === undefined) {
    throw new Error("useDeps should be used inside the DepsProvider");
  }

  return state;
};
