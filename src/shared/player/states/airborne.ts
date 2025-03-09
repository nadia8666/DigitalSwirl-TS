import { Player } from "..";
import { PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

export class StateAirborne extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput() {
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.ApplyGravity(Player) 
        PhysicsHandler.TurnDefault(Player, Player.Input.GetTurn(Player))
        PhysicsHandler.AccelerateGrounded(Player)
        PhysicsHandler.AlignToGravity(Player)

        if (Player.Flags.Grounded) {
            Player.State.Current = Player.State.Get("Grounded")
        }
    }
}