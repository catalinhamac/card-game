import { useEffect, useState } from "react";
import styled from "styled-components";

import { IState, useDeps } from "../../context/DepsContext";
import { ICard, IdrawCard, IPilesListing } from "../../services/types";
import { Player } from "../Player/Player";
import { useDrawCard } from "../useDrawCard";

interface IProps {
  id?: string;
}

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Players = ({ id }: IProps) => {
  const { data: drawCard, refetch } = useDrawCard(id as string);
  const [statusText, setStatusText] = useState("");
  const { servicesFactory } = useDeps() as IState;
  const { lookupAddToPile, lookupReshuffleCards, lookupListingCardsInPiles } =
    servicesFactory();
  const [piles, setPiles] = useState({ pile1: {}, pile2: {} } as IPilesListing);

  const { cards, remaining } = (drawCard as IdrawCard) || {};
  const [drawnCards, setDrawnCards] = useState<ICard[]>([]);
  const drawnCardsMaxLength = drawnCards.length === 2;
  const player1Value = drawnCards[0] && drawnCards[0].value;
  const player2Value = drawnCards[1] && drawnCards[1].value;
  const cardsAreEqual = !!(drawnCards.length && player1Value === player2Value);
  const noRemaining = remaining !== undefined && remaining === 0;
  const pile1Count = piles.pile1.remaining;
  const pile2Count = piles.pile2.remaining;

  useEffect(() => {
    if (cardsAreEqual) {
      setStatusText("Equal. Please Reshuffle Cards.");
    } else {
      setStatusText("");
    }
  }, [cardsAreEqual]);

  useEffect(() => {
    const getPiles = async () => {
      if (!noRemaining) return;
      try {
        const result = await lookupListingCardsInPiles(id as string, "pile1");
        setPiles(result.piles);
      } catch (e) {
        console.log("e", e);
      }
    };

    getPiles();
  }, [remaining]);

  useEffect(() => {
    cards && setDrawnCards((prevState: ICard[]) => [...prevState, ...cards]);
  }, [cards]);

  const handleDrawCard = () => {
    setStatusText("");
    refetch();
  };

  const handleCompareCards = () => {
    compare();
    setDrawnCards([]);
  };

  const compare = () => {
    const cardsCode = `${drawnCards[0].code},${drawnCards[1].code}`;

    if (player1Value > player2Value) {
      setStatusText(
        "Cards are going to player 1. To continue please, draw a Card."
      );
      lookupAddToPile(id as string, "pile1", cardsCode);
    } else {
      setStatusText(
        "Cards are going to player 2. To continue please, draw a Card."
      );

      lookupAddToPile(id as string, "pile2", cardsCode);
    }
  };

  const handleReshuffle = () => {
    if (player1Value === player2Value) {
      lookupReshuffleCards(id as string);
      return setDrawnCards([]);
    }
  };

  const getWinner = () => {
    if (pile1Count > pile2Count) {
      return <p>Player 1 won!</p>;
    }

    return <p>Player 2 won!</p>;
  };

  if (!!noRemaining) {
    return getWinner();
  }

  return (
    <>
      <button onClick={handleDrawCard} disabled={drawnCardsMaxLength}>
        Draw Card
      </button>
      <button
        onClick={handleCompareCards}
        disabled={!drawnCardsMaxLength || cardsAreEqual}
      >
        Compare Cards
      </button>
      <button onClick={handleReshuffle} disabled={!cardsAreEqual}>
        Please Reshuffle
      </button>
      <h4>{statusText}</h4>
      <Ul>
        {drawnCards.map((card, index) => (
          <Player card={card} key={index} index={index} />
        ))}
      </Ul>
    </>
  );
};
