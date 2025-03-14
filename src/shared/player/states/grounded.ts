import { Player } from "..";
import { CheckJump } from "../moves/jump";
import { PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

export class StateGrounded extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        return CheckJump(Player)
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.ApplyGravity(Player) 
        PhysicsHandler.TurnDefault(Player, Player.Input.GetTurn(Player))
        PhysicsHandler.AccelerateGrounded(Player)

        if (!Player.Flags.Grounded) {
            Player.State.Current = Player.State.Get("Airborne")
        }
    }
}