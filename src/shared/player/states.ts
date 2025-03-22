import { StateSkid } from "./component/interface/skid"
import { StateSpindash, StateRoll } from "./component/interface/spindash"
import { StateAirborne } from "./component/state/airborne"
import { StateBase } from "./component/state/base"
import { StateGrounded } from "./component/state/grounded"
import { StateNone } from "./component/state/none"

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