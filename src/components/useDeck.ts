import { useQuery } from "react-query";

import { IState, useDeps } from "../context/DepsContext";
import { IDeck } from "../services/types";

export const useDeck = () => {
  const { servicesFactory } = useDeps() as IState;
  const { lookupDeck } = servicesFactory();

  return useQuery<IDeck, Error>(["queryDeck"], () => lookupDeck(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
