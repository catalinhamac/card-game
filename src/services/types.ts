export interface IDeck {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
}

export interface ICard {
  image: string;
  value: string;
  suit: string;
  code: string;
}

export interface IdrawCard {
  success: boolean;
  cards: ICard[];
  deck_id: string;
  remaining: number;
}

export interface IDiscard {
  remaining: number;
}

export interface IPiles {
  discard: IDiscard;
}

export interface IAddToPile {
  success: boolean;
  deck_id: string;
  remaining: number;
  piles: IPiles;
}

interface IReshuffle {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface IPileListing {
  remaining: number;
  cards: ICard[];
}

export interface IPilesListing {
  pile1: IPileListing;
  pile2: IPileListing;
}

export interface IListingCardsInPiles {
  success: boolean;
  deck_id: string;
  remaining: string;
  piles: IPilesListing;
}

export interface IServiceFactory {
  lookupDeck: () => Promise<IDeck>;
  lookupDrawCard: (id: string) => Promise<IdrawCard>;
  lookupAddToPile: (
    deckId: string,
    pileName: string,
    cardsCode: string
  ) => Promise<IAddToPile>;
  lookupReshuffleCards: (deckId: string) => Promise<IReshuffle>;
  lookupListingCardsInPiles: (
    deckId: string,
    pileName: string
  ) => Promise<IListingCardsInPiles>;
}
