import { StateAirborne } from "./airborne";
import { StateGrounded } from "./grounded";
import { StateBase } from "./base";
import { StateSpindash } from "./spindash";
import { StateRoll } from "./roll";
import { StateNone } from "./none";
import { StateSkid } from "./skid";

export type PlayerState = StateBase

/**
 * List of all states for `StateMachine`
 * @class
 */
export class StateList {
    // Physical states
    private Base = new StateBase
    public None = new StateNone
    public Airborne = new StateAirborne
    public Grounded = new StateGrounded
    
    // Move states
    public Spindash = new StateSpindash
    public Roll = new StateRoll
    public Skid = new StateSkid
}