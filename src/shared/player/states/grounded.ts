import { Player } from "..";
import { CheckJump } from "../moves/jump";
import { CheckSkid } from "../moves/skid";
import { CheckSpindash } from "../moves/spindash";
import { IntertiaState, PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

/**
 * @class
 * @augments StateBase
 */
export class StateGrounded extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        return CheckJump(Player) || CheckSpindash(Player) || CheckSkid(Player)
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