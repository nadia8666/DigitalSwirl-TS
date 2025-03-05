import { Player } from "..";
import { StateNone } from "./none";

export class StateAirborne implements StateNone {
    private Player

    constructor(Player:Player) {
        this.Player = Player
    }

    public CheckInput() {


        return undefined
    }

    public Update() {


        return undefined
    }

    public GetPlayer() {
        return this.Player
    }
}