import { useQuery } from "react-query";

import { IState, useDeps } from "../context/DepsContext";
import { IdrawCard } from "../services/types";

export const useDrawCard = (id: string) => {
  const { servicesFactory } = useDeps() as IState;
  const { lookupDrawCard } = servicesFactory();

  return useQuery<IdrawCard, Error>(
    ["queryDrawCard"],
    () => lookupDrawCard(id),
    { enabled: false }
  );
};
