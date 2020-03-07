import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CounterPanel from "../CounterPanel";
import { PENDING_GUESS, LOGO_URL, SUCCESSFUL_GUESS, FAILED_GUESS, MAX_SCORE } from "../constants";
import ApiService from "../utils";
import { Player, StateType } from "../interfaces";
import PlayerCard from "../PlayerCard";
import WinnerImageSrc from "../../assets/winner.jpg";
import TryAgainSrc from "../../assets/tryagain.jpg";
const GameContainer = styled.div`
  padding: 10px 30px;
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
const WinnerImage = styled.img.attrs({
  src: WinnerImageSrc
})`
height: 192px;
`;
const TryAgainImage = styled.img.attrs({
  src: TryAgainSrc
})`
height: 192px;
`;
const TopLogoLink = styled.a``;
const HeaderContainer = styled.div`
  align-items: center;
  background: radial-gradient(ellipse, #0facfd 16%, #1493ff 100%);
  color: #ffff;
  justify-content: center;  
  margin: 0 5px 5px 0;
  padding: 5px;
  border-radius: 16px;
`;
const HeaderText = styled.span`
  margin: 0 5px 0 5px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomContainer = styled.div`
  display: flex;
  height: 25px;
  background: radial-gradient(ellipse, #0facfd 16%, #1493ff 100%);
  justify-content: center;
  align-items: center;
  margin: 0 5px 5px 0;
  border-radius: 16px;
  padding: 5px;
`;
const RestartButtonContainer = styled.div`
display: flex;
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
  margin-left: 5px;
`;
const BottomText = styled.p`
color: #ffff;
`;
const ButtonText = styled.p`
color: #1493ff;
background: #fff;
`;
const PlayersCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 5px;
  border-radius: 12px;
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
  const handlePlayerClick = (
      playersToPlay: Array<Player>,
      playerOne: Player,
      playerTwo: Player,
      isWinner: Boolean
  ): void => {
      if (state.guessRight === PENDING_GUESS) {
      // @ts-ignore
        setState({
        ...state,
        showResult: true,
        guessRight: isWinner ? SUCCESSFUL_GUESS : FAILED_GUESS
      });
    }
  };
  const handleContinueClick = (playersToPlay: Array<Player>) => {
    let score = state.guessRight === SUCCESSFUL_GUESS ? state.score + 1 : state.score;
    setState({
      ...state,
      score: score,
      gameOver: score === MAX_SCORE,
      showResult: false,
      players: playersToPlay,
      guessRight: PENDING_GUESS
    });
  };
  const handleRestartGameClick = () => {
    setState(initialState);
  };
  useEffect(() => { loadPlayers() });
  let playersToPlay = state.players.slice();
  const score = state.score;
  const playerOne = playersToPlay.shift();
  const playerTwo = playersToPlay.shift();
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
      <CounterPanel score={state.score}/>
      <PlayersCardContainer>

        {score < MAX_SCORE && playerOne && playerTwo && <PlayerCard
            firstName={playerOne.first_name}
            lastName={playerOne.last_name}
            imageSource={{uri: playerOne.images.default.url}}
            ffpg={playerOne.fppg}
            showResult={state.showResult}
            handlePlayerClick={() => handlePlayerClick(playersToPlay, playerOne, playerTwo, playerOne.fppg > playerTwo.fppg)}
        />}
        {score < MAX_SCORE && playerOne && playerTwo && <PlayerCard
            firstName={playerTwo.first_name}
            lastName={playerTwo.last_name}
            imageSource={{uri: playerTwo.images.default.url}}
            ffpg={playerTwo.fppg}
            showResult={state.showResult}
            handlePlayerClick={() => handlePlayerClick(playersToPlay, playerOne, playerTwo, playerTwo.fppg > playerOne.fppg)}

        />}
        {/* eslint-disable-next-line no-mixed-operators */}
        {!playerOne || !playerTwo && <TryAgainImage /> }
        {score === MAX_SCORE && <WinnerImage /> }
      </PlayersCardContainer>
        {state.guessRight !== PENDING_GUESS ?
          <BottomContainer>
            <React.Fragment>
            <BottomText>{state.guessRight === SUCCESSFUL_GUESS ? "Well done! " : "You missed this one!"}</BottomText>
            <ContinueButtonContainer onClick={() => handleContinueClick(playersToPlay)}>
                <ButtonText>Continue</ButtonText>
            </ContinueButtonContainer>
          </React.Fragment>
          </BottomContainer>
          :
          < React.Fragment>
            {!state.gameOver &&
            <BottomContainer>
                <BottomText>{"Click on a player to guess"}</BottomText>
            </BottomContainer> }
          </React.Fragment>
        }
      {state.gameOver
      &&
      <RestartButtonContainer>
          <ContinueButtonContainer onClick={() => handleRestartGameClick()}>
              <ButtonText>Restart Game</ButtonText>
          </ContinueButtonContainer>
      </RestartButtonContainer>
      }
    </GameContainer>
  );
};
export default Game;
