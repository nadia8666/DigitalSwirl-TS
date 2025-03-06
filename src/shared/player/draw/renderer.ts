import { Player } from "..";

export class Renderer {
    private Player:Player

    constructor(Player:Player) {
        this.Player = Player
    }

    public Draw() {
        this.Player.Character.PivotTo(this.Player.Angle.add(this.Player.Position))
    }
}