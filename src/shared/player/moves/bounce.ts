import { Player } from "..";

/**
 * Function ran in `State.CheckInput`
 * @param Player 
 * @returns Move successful
 */
export function CheckBounce(Player:Player) {
    if (Player.Flags.BallEnabled && Player.Input.Button.Bounce.Pressed) {
        Player.Flags.IsBounce = true
        Player.Animation.Current = "Roll"
        Player.Speed = Player.Speed.mul(new Vector3(.75, 0, 1)).sub(new Vector3(Player.Flags.Bounces === 0 && 5 || 7))

        return true
    }
}