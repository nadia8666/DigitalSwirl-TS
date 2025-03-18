import { StateAirborne } from "./airborne";
import { StateGrounded } from "./grounded";
import { StateBase } from "./base";
import { StateSpindash } from "./spindash";
import { StateRoll } from "./roll";

export type PlayerState = StateBase

export class StateList {
    // Physical states
    private Base = new StateBase
    public Airborne = new StateAirborne
    public Grounded = new StateGrounded

    // Move states
    public Spindash = new StateSpindash
    public Roll = new StateRoll
}