import { HttpClient } from "./HttpClient";
import { IServiceFactory } from "./types";

export const servicesFactory = (
  initialClient?: HttpClient
): IServiceFactory => {
  const client = initialClient || new HttpClient();

  return {
    async lookupDeck() {
      return client.fetchDeck();
    },

    async lookupDrawCard(id: string) {
      return await client.drawCard(id);
    },

    async lookupAddToPile(deckId: string, pileName: string, cardsCode: string) {
      return await client.addToPile(deckId, pileName, cardsCode);
    },

    async lookupReshuffleCards(deckId: string) {
      return await client.reshuffleCards(deckId);
    },

    async lookupListingCardsInPiles(deckId: string, pileName) {
      return await client.listingCardsInPiles(deckId, pileName);
    },
  };
};
