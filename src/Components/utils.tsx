import axios from "axios";
import { DATA_URL } from "./constants";
import { Player } from "./interfaces";

export default class ApiService {
  static async getPlayers(): Promise<Array<Player>> {
    const response = await axios.get(DATA_URL);
    return response.data.players;
  }
}
