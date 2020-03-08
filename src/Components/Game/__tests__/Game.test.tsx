import React from "react";
import { render, cleanup, act, wait, waitForElement, fireEvent } from "@testing-library/react";
import axios from "axios";
import Game from "./../../Game";
import allPlayers from "./Data/allPlayers.json";
import tenPlayers from "./Data/tenPlayers.json";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  axios.get = jest.fn(() => Promise.resolve({ data: { players: allPlayers } }));
});
afterEach(cleanup);
describe("Game", () => {
  it("displays text “Loading Players...” while fetching players", () => {
    const { getByText } = render(<Game />);

    getByText("Loading Players...");
  });
  it("removes text “Loading Players...” after fetching players", async () => {
    act(async () => {
      const { getByText } = render(<Game />);
      await wait(() => expect(getByText("Loading Players...")).not.toBeInTheDocument());
    });
  });
  it("displays error in the api call", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    axios.get = jest.fn(() => Promise.resolve({ data: { players: [] } }));
    const { getByText } = render(<Game />);
    await wait(() => expect(getByText("Error Loading Players")).toBeTruthy());
  });
  it("displays the players are received from the api call", async () => {
    await act(async () => {
      const { getAllByText } = render(<Game />);
      await waitForElement(() => getAllByText("Name: Stephen Curry"));
      expect(getAllByText("Name: Stephen Curry")).toBeTruthy();
      expect(getAllByText("Name: Draymond Green")).toBeTruthy();
    });
  });
  it("displays you selected the player with greater fppg after clicking", async () => {
    await act(async () => {
      const { getAllByText, getByText, queryByText } = render(<Game />);
      await waitForElement(() => getAllByText("Name: Stephen Curry"));
      //Round 1
      fireEvent.click(getByText("Name: Stephen Curry"));
      expect(getByText("FFPG: 47.94303797")).toBeTruthy();
      expect(getByText("FFPG: 38.96049383")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      expect(queryByText("You missed this one!")).not.toBeInTheDocument();
      fireEvent.click(getByText("Continue"));
      //Round 2
      expect(queryByText("Well done!")).not.toBeInTheDocument();
      expect(getByText("Name: Hassan Whiteside")).toBeTruthy();
    });
  });
  it("displays you selected the player with lesser fppg after clicking", async () => {
    await act(async () => {
      const { getAllByText, getByText, queryByText } = render(<Game />);
      await waitForElement(() => getAllByText("Name: Draymond Green"));
      //Round 1
      const playerRoundOne = getByText("Name: Draymond Green");
      fireEvent.click(playerRoundOne);
      expect(getByText("FFPG: 47.94303797")).toBeTruthy();
      expect(getByText("FFPG: 38.96049383")).toBeTruthy();
      expect(getByText("You missed this one!")).toBeTruthy();
      expect(queryByText("Well done!")).not.toBeInTheDocument();
      fireEvent.click(getByText("Continue"));
      //Round 2
      expect(queryByText("Well done!")).not.toBeInTheDocument();
      expect(getByText("Name: Hassan Whiteside")).toBeTruthy();
    });
  });
  it("Simulate a whole game where player wins", async () => {
    await act(async () => {
      const { getAllByText, getByText, getByAltText } = render(<Game />);
      await waitForElement(() => getAllByText("Name: Stephen Curry"));
      //Round 1
      fireEvent.click(getByText("Name: Stephen Curry"));
      expect(getByText("FFPG: 47.94303797")).toBeTruthy();
      expect(getByText("FFPG: 38.96049383")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 2
      fireEvent.click(getByText("Name: Damian Lillard"));
      expect(getByText("FFPG: 39.37866667")).toBeTruthy();
      expect(getByText("FFPG: 35.75342466")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 3
      fireEvent.click(getByText("Name: Kyle Lowry"));
      expect(getByText("FFPG: 30.84000000")).toBeTruthy();
      expect(getByText("FFPG: 38.59740260")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 4
      fireEvent.click(getByText("Name: DeMar DeRozan"));
      expect(getByText("FFPG: 31.43783784")).toBeTruthy();
      expect(getByText("FFPG: 35.26025641")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 5
      await waitForElement(() => getAllByText("Name: Chris Bosh"));
      fireEvent.click(getByText("Name: Chris Bosh"));
      expect(getByText("FFPG: 31.65375000")).toBeTruthy();
      expect(getByText("FFPG: 32.67924528")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 6
      fireEvent.click(getByText("Name: Goran Dragic"));
      expect(getByText("FFPG: 24.02162162")).toBeTruthy();
      expect(getByText("FFPG: 27.35972222")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 7
      fireEvent.click(getByText("Name: Jonas Valanciunas"));
      expect(getByText("FFPG: 24.31219512")).toBeTruthy();
      expect(getByText("FFPG: 26.87333333")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 8
      fireEvent.click(getByText("Name: Al-Farouq Aminu"));
      expect(getByText("FFPG: 21.64390244")).toBeTruthy();
      expect(getByText("FFPG: 13.33974359")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 9
      fireEvent.click(getByText("Name: Joe Johnson"));
      expect(getByText("FFPG: 22.10370370")).toBeTruthy();
      expect(getByText("FFPG: 14.56794872")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 10
      fireEvent.click(getByText("Name: DeMarre Carroll"));
      expect(getByText("FFPG: 20.27714286")).toBeTruthy();
      expect(getByText("FFPG: 20.95769231")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));
      expect(getByAltText("You won")).toBeTruthy();
      fireEvent.click(getByText("Restart Game"));

      //Round 1
      expect(getByText("Name: Stephen Curry")).toBeTruthy();
    });
  });
  it("Simulate a whole game where player lose", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    axios.get = jest.fn(() => Promise.resolve({ data: { players: tenPlayers } }));
    await act(async () => {
      const { getAllByText, getByText, getByAltText } = render(<Game />);
      await waitForElement(() => getAllByText("Name: Stephen Curry"));
      //Round 1
      fireEvent.click(getByText("Name: Draymond Green"));
      expect(getByText("FFPG: 47.94303797")).toBeTruthy();
      expect(getByText("FFPG: 38.96049383")).toBeTruthy();
      expect(getByText("You missed this one!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 2
      fireEvent.click(getByText("Name: Damian Lillard"));
      expect(getByText("FFPG: 39.37866667")).toBeTruthy();
      expect(getByText("FFPG: 35.75342466")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 3
      fireEvent.click(getByText("Name: Kyle Lowry"));
      expect(getByText("FFPG: 30.84000000")).toBeTruthy();
      expect(getByText("FFPG: 38.59740260")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      //Round 4
      fireEvent.click(getByText("Name: DeMar DeRozan"));
      expect(getByText("FFPG: 31.43783784")).toBeTruthy();
      expect(getByText("FFPG: 35.26025641")).toBeTruthy();
      expect(getByText("Well done!")).toBeTruthy();
      fireEvent.click(getByText("Continue"));

      expect(getByAltText("Try again")).toBeTruthy();
      fireEvent.click(getByText("Restart Game"));

      //Round 1
      expect(getByText("Name: Stephen Curry")).toBeTruthy();
    });
  });
});
