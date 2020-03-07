import styled from "styled-components";
import { CounterTextProps } from "../../interfaces";

export const CounterPanelContainer = styled.div`
  background-color: aqua;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;  
  margin: 0 5px 5px 0;
  border-radius: 16px;

`;
export const CounterText = styled.p<CounterTextProps>`
  color:${props => props.inputColor};
`;
