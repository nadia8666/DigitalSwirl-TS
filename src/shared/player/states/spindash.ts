import { Player } from "..";
import { CheckJump } from "../moves/jump";
import { IntertiaState, PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

export class StateSpindash extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        if (Player.Input.Button.Spindash.Activated) {
            if (Player.Flags.SpindashSpeed < 10) {
                Player.Flags.SpindashSpeed += .4
            }
        } else {
            Player.State.Current = Player.State.Get("Roll")
        }
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.ApplyGravity(Player) 
        PhysicsHandler.Turn(Player, Player.Input.GetTurn(Player), undefined)
        //PhysicsHandler.AccelerateGrounded(Player)

        if (Player.Flags.Grounded) {
            Player.Animation.Current = "Spindash"
        } else {
            Player.Animation.Current = "Roll"
            Player.State.Current = Player.State.Get("Airborne")
        }
    }
}