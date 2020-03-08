import React from "react";
import { CounterProps } from "../interfaces";
import { CounterPanelContainer, CounterText } from "./StyledComponents";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const counterScore = (score: number): Array<any> => {
  const counterScore = [];

  for (let i = 1; i <= 10; i++) {
    counterScore.push(
      <CounterText key={i} inputColor={i <= score ? "black" : "yellow"}>
        {i}
      </CounterText>,
    );
  }
  return counterScore;
};
const CounterPanel: React.FC<CounterProps> = props => {
  const { score } = props;
  return <CounterPanelContainer>{counterScore(score)}</CounterPanelContainer>;
};

export default CounterPanel;
