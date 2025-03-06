import { StateAirborne } from "./airborne";
import { StateGrounded } from "./grounded";
import { StateBase } from "./base";

export type PlayerState = StateBase

export class StateList {
    private Base = new StateBase
    public Airborne = new StateAirborne
    public Grounded = new StateGrounded
}