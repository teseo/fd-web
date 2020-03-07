
export interface DefaultImageData {
  height: number;
  url: string;
  width: number;
}

export interface Fixture {
  _members: Array<string>;
  _ref: string;
}

export interface News {
  latest: Date;
}

export interface ImageData {
  default: DefaultImageData
}

export interface Player {
  first_name: string;
  fixture: Fixture;
  fppg: number;
  id: string;
  images: ImageData
  injured: boolean;
  injury_details: string;
  injury_status: string;
  last_name: string;
  news: News;
  played: number;
  player_card_url: string;
  position: string;
  removed: boolean;
  salary: number;
  starting_order: any;
  team: Fixture;
}
export interface StateType {
  score: number;
  players: Array<Player>;
  playersRaw: Array<Player>;
  showResult: boolean;
  guessRight: number;
  gameOver: boolean;
}

export interface CounterTextProps {
  inputColor: string
}
