import { Players } from "../Players/Players";
import { useDeck } from "../useDeck";

export const Deck = () => {
  const {
    isFetching: isFetchingDeck,
    data: deck,
    error: errorDeck,
  } = useDeck();

  if (isFetchingDeck) {
    return <p>Loading new Deck...</p>;
  }

  if (errorDeck) {
    return <p>{errorDeck.message}</p>;
  }

  return (
    <>
      <h1>Card Game</h1>
      <Players id={deck?.deck_id} />
    </>
  );
};
