import { Player } from "..";

export class Renderer {
    private Player:Player

    constructor(Player:Player) {
        this.Player = Player
    }

    public Draw() {
        const Root = this.Player.Character.PrimaryPart
        if (!Root || !Root.IsA("BasePart")) { return }

        let Position = this.Player.Position
        Position = Position.add(new Vector3(0, this.Player.Character.FindFirstChildOfClass("Humanoid")?.HipHeight, 0))
        Position = Position.add(new Vector3(0, Root.Size.Y/2))

        this.Player.Character.PivotTo(this.Player.Angle.add(Position))
    }
}