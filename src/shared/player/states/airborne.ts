import { Player } from "..";
import { CheckBounce } from "../moves/bounce";
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
        return CheckHomingAttack(Player) || CheckBounce(Player)
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.ApplyGravity(Player) 
        //PhysicsHandler.Turn(Player, Player.Input.GetTurn(Player), undefined)
        PhysicsHandler.AccelerateAirborne(Player)
        PhysicsHandler.AlignToGravity(Player)

        if (Player.Flags.Grounded) {
            if (Player.Flags.IsBounce) {
                Player.Flags.JumpTimer = 0
                
                const Speed = 1 + (math.abs(Player.Speed.X)/16)
                Player.Speed = Player.Speed.mul(new Vector3(1, 0, 1)).add(new Vector3(0, Speed * (Player.Flags.Bounces === 0 && 2.825 || 3.575)))

                Player.Flags.Bounces += 1

                Player.Flags.IsBounce = false
            } else {
                Player.State.Current = Player.State.Get("Grounded")
                Player.Land()
            }
        }
    }
}