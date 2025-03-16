import { Player } from "..";
import { IntertiaState, PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

export class StateAirborne extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput() {
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.ApplyGravity(Player) 
        //PhysicsHandler.Turn(Player, Player.Input.GetTurn(Player), undefined)
        PhysicsHandler.AccelerateAirborne(Player)
        PhysicsHandler.AlignToGravity(Player)

        if (Player.Flags.Grounded) {
            Player.State.Current = Player.State.Get("Grounded")
            Player.Land()
        }
    }
}