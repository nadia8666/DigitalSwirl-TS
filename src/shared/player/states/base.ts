import { Player } from "..";
import { RunCollision } from "../physics/collision";

// State base type
export class StateBase {
    constructor() {}

    public CheckMoves(Player:Player) {
        Player.Input.Update()
        
        // Default input checking code

        // Per state code
        this.CheckInput(Player)
    }

    public Tick(Player:Player) {
        // Pre update
        if (this.BeforeUpdateHook(Player) !== undefined) { return }

        // Tick global code in every state
        RunCollision(Player)

        // Post update
        this.AfterUpdateHook(Player)
    }

    protected CheckInput(Player:Player) {
    }

    protected BeforeUpdateHook(Player:Player) {
    }

    protected AfterUpdateHook(Player:Player) {
    }
}