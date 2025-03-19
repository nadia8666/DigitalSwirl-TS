import { Player } from "..";

/**
 * Function ran in `State.CheckInput`
 * @param Player 
 * @returns Move successful
 */
export function CheckSkid(Player:Player) {
    const _ = Player.Input.Get(Player)
    const HasControl = _[0], Turn = _[1]

    const Skid = HasControl && (math.abs(Turn) > math.rad(135)) || false

    if (Skid) {
        Player.Animation.Current = "Skid"
        Player.State.Current = Player.State.Get("Skid")
    }

    return Skid
}

/**
 * Function ran in `State.CheckInput`
 * @param Player 
 * @returns Move successful
 */
export function CheckStopSkid(Player:Player) {
    if (Player.Speed.X <= .01) {
        Player.Speed = Player.Speed.mul(new Vector3(0, 1, 1))
        Player.State.Current = Player.State.Get("Grounded")
        
        return true
    } else {
        const _ = Player.Input.Get(Player)
        const HasControl = _[0], Turn = _[1]
        const StopSkid = HasControl && (math.abs(Turn) <= math.rad(135)) || false

        if (StopSkid) {
            Player.State.Current = Player.State.Get("Grounded")
        }

        return StopSkid
    }
}