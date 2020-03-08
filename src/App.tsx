import React from "react";
import Game from "./Components/Game";
import { createGlobalStyle } from "styled-components";

const Style = createGlobalStyle`
  p {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }
  body, html {
    height: 100%;
    background-color: #152a47;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;
const App: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Style />
      <Game />
    </React.Fragment>
  );
};

export default App;
