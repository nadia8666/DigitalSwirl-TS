import { Player } from "..";

export function CheckJump(Player:Player) {
    if (Player.Input.Button.Jump.Pressed) {
        Player.State.Current = Player.State.Get("Airborne")
        Player.Speed = Player.Speed.add(new Vector3(0, Player.Physics.JumpInitalForce, 0))

        Player.Flags.Grounded = false
        Player.Flags.JumpTimer = Player.Physics.JumpTicks
        
        Player.EnterBall()
    }
}