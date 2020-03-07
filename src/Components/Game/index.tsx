import React from "react";

import styled from "styled-components";
interface CounterTextProps {
  inputColor: string
}
const GameContainer = styled.div`
  padding: 20px;
  background-color: #152a47;
  flex-direction: column;
 
`;
const CounterPanelContainer = styled.div`
  background-color: aqua;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

`;
const CounterText = styled.p<CounterTextProps>`
  color:${props => props.inputColor};
`;
const GlobalHeader = styled.div`
  padding-bottom: 19px;
  text-align: center;
`;
const TopLogoImage = styled.img.attrs({
  src: 'https://s3.amazonaws.com/cdn.fanduel.com/images/2019/Homepage/Home/fd-shield-logo.svg'
})`
height: 66px;
`
const TopLogoLink = styled.a``;
const HeaderContainer = styled.div`
  align-items: center;
  margin: 0 5px 5px 0;
  padding: 5px;
  background: radial-gradient(ellipse, #0facfd 16%, #1493ff 100%);
  color: #ffff;
  height: 100px;
  justify-content: center;  
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
  margin-bottom: 30px;
`;

const RestartButtonContainer = styled.div`
  flex-direction: column;
  background-color: #1493ff;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
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

export default class Game extends React.Component<{}, {}> {

  render() {
    let counterScore = [];

    for (let i = 1; i <= 10; i++) {

      counterScore.push(
        // @ts-ignore
        <CounterText key={i} inputColor={"black"}>{i}</CounterText>
      )
    }
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
        <CounterPanelContainer>
          {counterScore}
        </CounterPanelContainer>
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

  }
}
