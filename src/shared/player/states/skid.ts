import { Player } from "..";
import { CheckStopSkid } from "../moves/skid";
import { PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

export class StateSkid extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        return CheckStopSkid(Player)
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.ApplyGravity(Player)
        PhysicsHandler.Skid(Player)
    }
}