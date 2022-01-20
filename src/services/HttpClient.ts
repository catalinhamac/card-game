export const commonEndpoint = "http://deckofcardsapi.com/api";

export class HttpClient {
  async fetchDeck() {
    const resp = await fetch(
      `${commonEndpoint}/deck/new/shuffle/?deck_count=1`
    );
    return resp.json();
  }

  async drawCard(deckId: string) {
    const resp = await fetch(`${commonEndpoint}/deck/${deckId}/draw/?count=1`);
    return resp.json();
  }

  async addToPile(deckId: string, pileName: string, cardsCode: string) {
    const resp = await fetch(
      `${commonEndpoint}/deck/${deckId}/pile/${pileName}/add/?cards=${cardsCode}`
    );
    return resp.json();
  }

  async reshuffleCards(deckId: string) {
    const resp = await fetch(
      `${commonEndpoint}/deck/${deckId}/shuffle/?remaining=true`
    );
    return resp.json();
  }

  async listingCardsInPiles(deckId: string, pileName: string) {
    const resp = await fetch(
      `${commonEndpoint}/deck/${deckId}/pile/${pileName}/list/`
    );
    return resp.json();
  }
}
