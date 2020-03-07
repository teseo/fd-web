import React from "react";
import styled from "styled-components";

interface CounterTextProps {
  inputColor: string
}

const CounterPanelContainer = styled.div`
  background-color: aqua;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;  
  margin: 0 5px 5px 0;
  border-radius: 16px;

`;
const CounterText = styled.p<CounterTextProps>`
  color:${props => props.inputColor};
`;

const counterScore = (score: number) => {
  let counterScore = [];

  for (let i = 1; i <= 10; i++) {

    counterScore.push(
      <CounterText key={i} inputColor={i <= score ? "black" : "grey"}>{i}</CounterText>
    )
  }
  return counterScore;
};

type CounterProps = {
  score: number;
};

export default function CounterPanel (props: CounterProps) {
  const {score} = props;
  return (
    <CounterPanelContainer>
      { counterScore(score) }
    </CounterPanelContainer>
  )
}
