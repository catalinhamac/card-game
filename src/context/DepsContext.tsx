import { createContext, ReactNode, useContext } from "react";
import { HttpClient } from "../services/HttpClient";

import { IServiceFactory } from "../services/types";

interface IProps {
  children: ReactNode;
  servicesFactory: (initialClient?: HttpClient) => IServiceFactory;
}

export interface IState {
  servicesFactory: (initialClient?: HttpClient) => IServiceFactory;
}

const DepsContext = createContext<IState | null>(null);

export const useDeps = () => {
  return useContext(DepsContext);
};

export const DepsProvider = ({ children, ...services }: IProps) => (
  <DepsContext.Provider value={services}>{children}</DepsContext.Provider>
);
