import { Player } from "..";
import { CheckJump } from "../moves/jump";
import { IntertiaState, PhysicsHandler } from "../physics/physics";
import { StateBase } from "./base";

export class StateRoll extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        if (!Player.Input.Button.Roll.Pressed) {
            Player.State.Current = Player.State.Get("Grounded")
        }
    }

    protected AfterUpdateHook(Player:Player) {
        PhysicsHandler.ApplyGravity(Player) 
        PhysicsHandler.Turn(Player, Player.Input.GetTurn(Player), undefined)

        if (Player.Flags.Grounded) {
            Player.Animation.Current = "Roll"
        } else {
            Player.State.Current = Player.State.Get("Airborne")
        }
    }
}