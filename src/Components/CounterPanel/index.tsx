import React from "react";
import { CounterProps } from "../interfaces";
import { CounterPanelContainer, CounterText } from "./StyledComponents";

const counterScore = (score: number) => {
  let counterScore = [];

  for (let i = 1; i <= 10; i++) {

    counterScore.push(
      <CounterText key={i} inputColor={i <= score ? "black" : "grey"}>{i}</CounterText>
    )
  }
  return counterScore;
};

export default function CounterPanel (props: CounterProps) {
  const {score} = props;
  return (
    <CounterPanelContainer>
      { counterScore(score) }
    </CounterPanelContainer>
  )
}
