import { Player } from "..";

// State base type
export class StateNone {
    constructor() {
       
    }

    public CheckMoves(Player:Player) {
        // Default input checking code

        // Per state code
        this.CheckInput(Player)
    }

    public Tick(Player:Player) {
        // Tick global code in every state

        // Per state tick
        this.Update(Player)
    }

    protected CheckInput(Player:Player) {


        return undefined
    }

    protected Update(Player:Player) {


        return undefined
    }
}