import { Player } from "..";
import { PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

export class StateGrounded extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput() {
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.ApplyGravity(Player)
        
        PhysicsHandler.TurnDefault(Player, Player.Input.GetTurn(Player))
        PhysicsHandler.AccelerateGrounded(Player)
    }
}