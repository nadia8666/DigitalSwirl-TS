import { Player } from "..";

/**
 * Function ran in `State.CheckInput`
 * @param Player 
 * @returns Move successful
 */
export function CheckSpindash(Player:Player) {
    if (Player.Input.Button.Spindash.Pressed) {
        Player.State.Current = Player.State.Get("Spindash")
        Player.Flags.SpindashSpeed = math.max(Player.Speed.X, 2)
        Player.EnterBall()

        return true
    }
}