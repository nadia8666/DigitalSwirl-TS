import { Player } from "shared/player"
import { PhysicsHandler } from "shared/player/physics/physics"
import { CheckJump } from "../interface/jump"
import { CheckSkid } from "../interface/skid"
import { CheckSpindash } from "../interface/spindash"
import { StateBase } from "./base"

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

        if (Player.Ground.Grounded) {
            Player.Animation.Current = Player.Speed.X > 0 && "Run" || "Idle"
        } else {
            Player.Animation.Current = "Fall"
            Player.State.Current = Player.State.Get("Airborne")
        }
    }
}