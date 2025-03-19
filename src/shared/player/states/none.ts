import { Player } from "..";
import { StateBase } from "./base";

export class StateNone extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        
    }

    protected AfterUpdateHook(Player:Player) {
        
    }
}