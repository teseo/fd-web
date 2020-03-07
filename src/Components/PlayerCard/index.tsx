import React from "react";
import styled from "styled-components";
import { PlayerProps } from "../interfaces";

const PlayerCardContainer = styled.div`
  background-color: forestgreen;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
    margin: 5px 10px 5px 10px;

`;
const PlayerDataContainer = styled.button`
  background-color: paleturquoise;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TextName = styled.p``;
const PlayerImage = styled.img`
  width: 150px;
  height: 150px;
`;

const PlayerCard: React.FC<PlayerProps> =(props) =>  {
    const {firstName, lastName, ffpg, showResult, handlePlayerClick, imageSource } = props;
    const name = firstName + ' ' + lastName;
    return (
      <PlayerCardContainer>
        <PlayerDataContainer onClick={handlePlayerClick}>
          <PlayerImage
            src={imageSource.uri}
          />
          <TextName>Name: {name}</TextName>
          {showResult
          && ffpg &&
          <TextName>FFPG: {ffpg.toPrecision(10)}</TextName>
          }
        </PlayerDataContainer>
      </PlayerCardContainer>
    );
};
export default PlayerCard;
