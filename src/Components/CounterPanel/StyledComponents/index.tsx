import styled from "styled-components";
import { CounterTextProps } from "../../interfaces";

export const CounterPanelContainer = styled.div`
  background: radial-gradient(ellipse, #0facfd 16%, #1493ff 100%);
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 16px;
`;
export const CounterText = styled.p<CounterTextProps>`
  color: ${(props): string => props.inputColor};
`;
