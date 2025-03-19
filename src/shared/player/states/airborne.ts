import { Player } from "..";
import { CheckHomingAttack } from "../moves/homingattack";
import { PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

/**
 * @class
 * @augments StateBase
 */
export class StateAirborne extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        return CheckHomingAttack(Player)
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