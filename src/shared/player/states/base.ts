import { Player } from "..";

// State base type
export class StateBase {
    constructor() {
       
    }

    public CheckMoves(Player:Player) {
        // Default input checking code

        // Per state code
        this.CheckInput(Player)
    }

    public Tick(Player:Player) {
        // Pre update
        if (this.BeforeUpdateHook(Player) !== undefined) { return }

        // Tick global code in every state

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