import { Player } from "..";
import { PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

export class StateGrounded extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        if (Player.Input.Button.Jump.Pressed) {
            Player.State.Current = Player.State.Get("Airborne")
            Player.Speed = Player.Speed.add(new Vector3(0, 5, 0))

            print("Jump")
        }
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