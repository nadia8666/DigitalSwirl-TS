import { Player } from "..";
import { CheckJump } from "../moves/jump";
import { IntertiaState, PhysicsHandler } from "../physics/physics";
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
        //PhysicsHandler.Turn(Player, Player.Input.GetTurn(Player), undefined)
        PhysicsHandler.AccelerateGrounded(Player)

        if (Player.Flags.Grounded) {
            Player.Animation.Current = Player.Speed.X > 0 && "Run" || "Idle"
        } else {
            Player.Animation.Current = "Fall"
            Player.State.Current = Player.State.Get("Airborne")
        }
    }
}