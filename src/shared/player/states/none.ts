import { Player } from "..";
import { StateBase } from "./base";

/**
 * @class
 * @augments StateBase
 */
export class StateNone extends StateBase {
    constructor() {
        super()
    }

    protected CheckInput(Player:Player) {
        
    }

    protected AfterUpdateHook(Player:Player) {
        
    }
}