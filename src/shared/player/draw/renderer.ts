import { Player } from "..";

/**
 * Player renderer
 * @class
 */
export class Renderer {
    private Player:Player

    constructor(Player:Player) {
        this.Player = Player
    }

    /**
     * Draw player, should only execute at the end of each `RenderStepped`
     * @returns {undefined}
     */
    public Draw(): undefined {
        const Root = this.Player.Character.PrimaryPart
        if (!Root || !Root.IsA("BasePart")) { return }

        let Position = this.Player.Position
        Position = Position.add(this.Player.Angle.UpVector.mul((Root.Size.Y/2) + (this.Player.Character.FindFirstChildOfClass("Humanoid")?.HipHeight || 0)))

        this.Player.Character.PivotTo(this.Player.Angle.add(Position))
    }
}