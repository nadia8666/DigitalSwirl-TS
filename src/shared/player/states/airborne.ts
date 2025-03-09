import { Player } from "..";
import { StateBase } from "./base";

export class StateAirborne extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput() {
    }

    protected AfterUpdateHook(Player:Player) {
        //Player.Position = Player.Position.add(new Vector3(0, .1, 0))
        Player.Speed = new Vector3(15, -.5, 0)
    }
}