import { Player } from "..";
import { CheckJump } from "../moves/jump";
import { IntertiaState, PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

/**
 * @class
 * @augments StateBase
 */
export class StateRoll extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        if (Player.Input.Button.Roll.Pressed || Player.Speed.X < Player.Physics.RollGetup) {
            // TODO: ceil clip
            Player.State.Current = Player.State.Get("Grounded")
            Player.ExitBall()

            return true
        }

        return CheckJump(Player)
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.RollInertia(Player)
        PhysicsHandler.Turn(Player, Player.Input.GetTurn(Player), undefined)

        if (Player.Flags.Grounded) {
            Player.Animation.Current = "Roll"
        } else {
            Player.State.Current = Player.State.Get("Airborne")
        }
    }
}