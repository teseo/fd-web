import React, { useState, useEffect } from "react";
import CounterPanel from "../CounterPanel";
import { PENDING_GUESS, SUCCESSFUL_GUESS, FAILED_GUESS, MAX_SCORE } from "../constants";
import ApiService from "../utils";
import { Player, StateType } from "../interfaces";
import PlayerCard from "../PlayerCard";
import {
  BottomContainer,
  BottomText,
  ButtonText,
  ContinueButtonContainer,
  GameContainer,
  GlobalHeader,
  HeaderContainer,
  HeaderText,
  LoadingText,
  PlayersCardContainer,
  RestartButtonContainer,
  TopLogoImage,
  TopLogoLink,
  TryAgainImage,
  WinnerImage,
} from "./StyledComponents";

const Game: React.FC = () => {
  const initialState = {
    score: 0,
    showResult: false,
    queryPerformed: false,
    gameOver: false,
    players: [],
    playersRaw: [],
    guessRight: PENDING_GUESS,
  };

  const [state, setState] = useState<StateType>(initialState);
  const handlePlayerClick = (
    playersToPlay: Array<Player>,
    playerOne: Player,
    playerTwo: Player,
    isWinner: boolean,
  ): void => {
    if (state.guessRight === PENDING_GUESS) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      setState({
        ...state,
        showResult: true,
        guessRight: isWinner ? SUCCESSFUL_GUESS : FAILED_GUESS,
      });
    }
  };
  const handleContinueClick = (playersToPlay: Array<Player>): void => {
    const score = state.guessRight === SUCCESSFUL_GUESS ? state.score + 1 : state.score;
    setState({
      ...state,
      score: score,
      gameOver: score === MAX_SCORE,
      showResult: false,
      players: playersToPlay,
      guessRight: PENDING_GUESS,
    });
  };
  const handleRestartGameClick = (): void => {
    setState({
      ...state,
      score: 0,
      showResult: false,
      queryPerformed: true,
      gameOver: false,
      players: state.playersRaw,
      guessRight: PENDING_GUESS,
    });
  };
  useEffect(() => {
    // Basic implementation to handle race conditions
    // When component might unmount before API call finishes
    let isStopped = false;
    if (!isStopped) {
      const loadPlayers = async (): Promise<void> => {
        try {
          const players = await ApiService.getPlayers();
          if (!isStopped && players) {
            setState({
              ...state,
              queryPerformed: true,
              players: players,
              playersRaw: players,
            });
          }
        } catch (error) {
          console.error(error);
        }
      };
      loadPlayers();
    }
    return () => {
      isStopped = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playersToPlay = state.players.slice();
  const score = state.score;
  const playerOne = playersToPlay.shift();
  const playerTwo = playersToPlay.shift();
  return (
    <GameContainer>
      <GlobalHeader>
        <TopLogoLink href="/" target="_self">
          <TopLogoImage />
        </TopLogoLink>
      </GlobalHeader>
      <HeaderContainer>
        <HeaderText>Select the player with the higher FanDuel Points Per Game (FPPG). </HeaderText>
      </HeaderContainer>
      <CounterPanel score={state.score} />
      <PlayersCardContainer>
        {state.players.length === 0 &&
          (state.queryPerformed ? (
            <LoadingText>Error Loading Players</LoadingText>
          ) : (
            <LoadingText>Loading Players...</LoadingText>
          ))}
        {score < MAX_SCORE && playerOne && playerTwo && (
          <PlayerCard
            firstName={playerOne.first_name}
            lastName={playerOne.last_name}
            imageSource={{ uri: playerOne.images.default.url }}
            ffpg={playerOne.fppg}
            showResult={state.showResult}
            handlePlayerClick={(): void =>
              handlePlayerClick(playersToPlay, playerOne, playerTwo, playerOne.fppg > playerTwo.fppg)
            }
          />
        )}
        {score < MAX_SCORE && playerOne && playerTwo && (
          <PlayerCard
            firstName={playerTwo.first_name}
            lastName={playerTwo.last_name}
            imageSource={{ uri: playerTwo.images.default.url }}
            ffpg={playerTwo.fppg}
            showResult={state.showResult}
            handlePlayerClick={(): void =>
              handlePlayerClick(playersToPlay, playerOne, playerTwo, playerTwo.fppg > playerOne.fppg)
            }
          />
        )}
        {!playerOne || (!playerTwo && <TryAgainImage />)}
        {score === MAX_SCORE && <WinnerImage />}
      </PlayersCardContainer>
      {state.guessRight !== PENDING_GUESS ? (
        <BottomContainer>
          <React.Fragment>
            <BottomText>{state.guessRight === SUCCESSFUL_GUESS ? "Well done! " : "You missed this one!"}</BottomText>
            <ContinueButtonContainer onClick={(): void => handleContinueClick(playersToPlay)}>
              <ButtonText>Continue</ButtonText>
            </ContinueButtonContainer>
          </React.Fragment>
        </BottomContainer>
      ) : (
        <React.Fragment>
          {!state.gameOver && (
            <BottomContainer>
              <BottomText>{"Click on a player to guess"}</BottomText>
            </BottomContainer>
          )}
        </React.Fragment>
      )}
      {(state.gameOver || state.players.length === 1) && (
        <RestartButtonContainer>
          <ContinueButtonContainer onClick={(): void => handleRestartGameClick()}>
            <ButtonText>Restart Game</ButtonText>
          </ContinueButtonContainer>
        </RestartButtonContainer>
      )}
    </GameContainer>
  );
};
export default Game;
