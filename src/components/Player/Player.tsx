import styled from "styled-components";

import { ICard } from "../../services/types";

interface IProps {
  card: ICard;
  index: number;
}

const Li = styled.li`
  margin: 0 3rem;
`;

export const Player = ({ card, index }: IProps) => {
  const { image } = card;

  return (
    <Li>
      <p>{`Player ${index + 1}`}</p>
      <img src={image} alt="player" />
    </Li>
  );
};
