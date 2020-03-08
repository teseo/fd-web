import React from "react";
import { render, cleanup, act, wait, waitForElement } from "@testing-library/react";
import axios from "axios";
import Game from "./../../Game";
import tenPlayers from "./Data/tenPlayers.json";

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  axios.get = jest.fn(() => Promise.resolve({ data: { players: tenPlayers } }));
});
afterEach(cleanup);
describe("Game", () => {
  it("displays text “Loading Players...” while fetching players", () => {
    const { getByText } = render(<Game />);

    getByText("Loading Players...");
  });
  it("removes text “Loading Players...” after fetching players", () => {
    act(async () => {
      const { getByText } = render(<Game />);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await wait(() => expect(getByText("Loading Players...")).not.toBeInTheDocument());
    });
  });
  it("displays error in the api call", async () => {
    axios.get = jest.fn(() => Promise.resolve({ data: { players: [] } }));
    const { getByText } = render(<Game />);
    await wait(() => expect(getByText("Error Loading Players")).toBeTruthy());
  });
  it("displays the players received from the api call", async () => {
    await act(async () => {
      const { getAllByText } = render(<Game />);
      await waitForElement(() => getAllByText("Name: Stephen Curry"));
      getAllByText("Name: Stephen Curry");
    });
  });
});
