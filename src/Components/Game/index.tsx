import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CounterPanel from "../CounterPanel";
import { PENDING_GUESS, LOGO_URL } from "../constants";
import ApiService from "../utils";
import { StateType } from "../interfaces";

const GameContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 1441px;
  background-color: #152a47;
  flex-direction: column;
 
`;
const GlobalHeader = styled.div`
  padding-bottom: 19px;
  text-align: center;
`;
const TopLogoImage = styled.img.attrs({
  src: LOGO_URL
})`
height: 28px;
`;
const TopLogoLink = styled.a``;
const HeaderContainer = styled.div`
  align-items: center;
  background: radial-gradient(ellipse, #0facfd 16%, #1493ff 100%);
  color: #ffff;
  height: 100px;
  justify-content: center;  
  margin: 0 5px 5px 0;
  padding: 5px;
  border-radius: 16px;
`;
const HeaderText = styled.p`
  margin: 0 5px 0 5px;
  font-size: 18px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomContainer = styled.div`
  flex-direction: column;
  background: radial-gradient(ellipse, #0facfd 16%, #1493ff 100%);
  justify-content: center;
  align-items: center;
  margin: 0 5px 5px 0;
  border-radius: 16px;
  padding: 5px;
`;
const RestartButtonContainer = styled.div`
  flex-direction: column;
  background-color: #1493ff;
  justify-content: center;
  align-items: center;
  margin: 0 5px 5px 0;
  padding: 5px;
  border-radius: 16px;
`;
const ContinueButtonContainer = styled.button`
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  padding: 5px;
  margin-bottom: 5px;
  font-size: medium;
`;
const BottomText = styled.p`
color: #ffff;
margin-bottom: 5px;
`;
const ButtonText = styled.p`
color: #1493ff;
background: #fff;
`;

const Game: React.FC = () =>  {
  const initialState = {
    score: 0,
    showResult: false,
    gameOver: false,
    players: [],
    playersRaw: [],
    guessRight: PENDING_GUESS
  };

  const [state, setState] = useState<StateType>(initialState);
  const loadPlayers = async (): Promise<void> => {
    if (state.playersRaw.length === 0) {
      const players = await ApiService.getPlayers();
      setState({
        ...state,
        players: players,
        playersRaw: players
      });
    }
  };

  useEffect(() => { loadPlayers() });
  return (
    <GameContainer>
      <GlobalHeader>
        <TopLogoLink href="/" target="_self" >
          <TopLogoImage />
        </TopLogoLink>
      </GlobalHeader>
      <HeaderContainer>
        <HeaderText>Select the player with the higher FanDuel Points Per Game (FPPG). </HeaderText>
      </HeaderContainer>
      <CounterPanel score={2}/>
      <BottomContainer>
        <BottomText>{"Well done! "}</BottomText>
        <ContinueButtonContainer onClick={() => {}}>
          <ButtonText>Continue</ButtonText>
        </ContinueButtonContainer>
      </BottomContainer>
      <RestartButtonContainer>
        <ContinueButtonContainer onClick={() => {}}>
          <ButtonText>Restart Game</ButtonText>
        </ContinueButtonContainer>
      </RestartButtonContainer>
    </GameContainer>
  );
};
export default Game;
